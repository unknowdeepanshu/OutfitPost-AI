import { getAuth } from "@clerk/express";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { ImageEditing } from "../models/image-editing.model.js";
import { Message } from "../models/message.model.js";
import { agentInstance } from "../services/axios.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { downloadAndUploadToCloudinary } from "../utils/downloadAndUpload.js";

const editImages = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { src_file_url, scale, prompt, EditType, ProjectId } = req.body;

  if (!ProjectId) {
    throw new ApiError(400, "ProjectId is required");
  }

  if (!src_file_url) {
    throw new ApiError(400, "src_file_url is required");
  }

  let editingDocument = await ImageEditing.findOne({
    MessageID: ProjectId,
  });

  const agentResponse = await agentInstance.post("/edit/EditImage", {
    src_file_url,
    scale,
    prompt,
    EditType,
  });

  console.log("Agent response:", agentResponse.data);

  const { ImageDatas: returnedImageData, EditedImage } = agentResponse.data;

  if (!EditedImage) {
    throw new ApiError(500, "Edited image was not returned by agent");
  }

  const newUpload = await downloadAndUploadToCloudinary(EditedImage);
  let oldNewImageUrl;
  if (!editingDocument || editingDocument === null) {
    console.log("starte");
    const previousUpload = await downloadAndUploadToCloudinary(src_file_url);

    const messageStore = await Message.findOne({
      MessageID: ProjectId,
    });
    editingDocument = await ImageEditing.create({
      messageId: messageStore._id,
      MessageID: ProjectId,
      editedImages: [
        {
          previousImageUrl: {
            url: previousUpload.secureUrl,
            publicId: previousUpload.publicId,
          },

          NewImageUrl: {
            url: newUpload.secureUrl,
            publicId: newUpload.publicId,
          },
        },
      ],
    });
    console.log("end");
  } else {
    // Save the OLD previous image before replacing it.
    oldNewImageUrl = editingDocument.editedImages?.[0].NewImageUrl;
    const oldPreviousImage = editingDocument.editedImages?.[0].previousImageUrl;

    // Current NewImage becomes PreviousImage
    await ImageEditing.findOneAndUpdate(
      {
        MessageID: ProjectId,
      },
      {
        $set: {
          "editedImages.0.previousImageUrl": {
            url: oldNewImageUrl.url,
            publicId: oldNewImageUrl.publicId,
          },
          "editedImages.0.NewImageUrl": {
            url: newUpload.secureUrl,
            publicId: newUpload.publicId,
          },
        },
      },
      {
        new: true,
      },
    );

    // Delete ONLY the old PreviousImage
    if (oldPreviousImage?.publicId) {
      try {
        await deleteFromCloudinary(oldPreviousImage.publicId);
      } catch (error) {
        console.error("Failed to delete old product image:", error);
      }
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        oldEditedImage: {
          url: oldNewImageUrl?.url,
        },
        EditedImage: {
          url: newUpload?.secureUrl,
        },
      },
      "Image edit successful",
    ),
  );
});

export { editImages };
