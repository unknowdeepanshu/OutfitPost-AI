import { verifyWebhook } from "@clerk/express/webhooks";
import { clerkClient, getAuth } from "@clerk/express";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// all models
import { User } from "../models/user.model.js";
import { ImageEditing } from "../models/image-editing.model.js";
import { Message } from "../models/message.model.js";
import { ImageUsage } from "../models/ImageUsage.model.js";
import { Conversation } from "../models/conversation.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import "dotenv/config";
const UserCreated = asyncHandler(async (req, res) => {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);
    const userData = evt.data;
    res.send("Webhook received");
    const newUser = await User.create({
      clerkUserId: userData.id,
      email: userData.email_addresses[0].email_address,
      name: `${userData.first_name ?? ""} ${userData.last_name ?? ""}`,
      avatar: userData.profile_image_url,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Error verifying webhook");
  }
});
const DeleteUser = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const conversations = await Conversation.find({
    userId: user._id,
  });

  const messageIDs = conversations.flatMap((conversation) =>
    conversation.messages.map((message) => message.messageId),
  );

  console.log("Message IDs:", messageIDs);

  const messages = await Message.find({
    MessageID: {
      $in: messageIDs,
    },
  });

  console.log("Messages found:", messages.length);

  const imageEditings = await ImageEditing.find({
    MessageID: {
      $in: messageIDs,
    },
  });

  console.log("ImageEditing documents:", imageEditings.length);

  const publicIds = new Set();

  // Message images
  for (const message of messages) {
    for (const data of message.Data || []) {
      if (data.modelImage?.publicId) {
        publicIds.add(data.modelImage.publicId);
      }

      if (data.productImage?.publicId) {
        publicIds.add(data.productImage.publicId);
      }

      if (data.currentPosterImage?.publicId) {
        publicIds.add(data.currentPosterImage.publicId);
      }
    }
  }

  // Editing images
  for (const editing of imageEditings) {
    for (const edit of editing.editedImages || []) {
      if (edit.previousImageUrl?.publicId) {
        publicIds.add(edit.previousImageUrl.publicId);
      }

      if (edit.NewImageUrl?.publicId) {
        publicIds.add(edit.NewImageUrl.publicId);
      }
    }
  }

  console.log("Cloudinary images:", publicIds.size);

  for (const publicId of publicIds) {
    try {
      await deleteFromCloudinary(publicId);

      console.log("Deleted Cloudinary image:", publicId);
    } catch (error) {
      console.error("Failed to delete Cloudinary image:", publicId, error);
    }
  }

  if (messageIDs.length > 0) {
    await ImageEditing.deleteMany({
      MessageID: {
        $in: messageIDs,
      },
    });

    await Message.deleteMany({
      MessageID: {
        $in: messageIDs,
      },
    });
  }

  await Conversation.deleteMany({
    userId: user._id,
  });

  await ImageUsage.deleteOne({
    userId,
  });

  await User.deleteOne({
    _id: user._id,
  });

  try {
    await clerkClient.users.deleteUser(userId);

    console.log("Clerk user deleted:", userId);
  } catch (error) {
    console.error("Failed to delete Clerk user:", error);

    throw new ApiError(500, "Failed to delete Clerk account");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "User and all associated data deleted successfully",
      ),
    );
});
export { UserCreated, DeleteUser };
