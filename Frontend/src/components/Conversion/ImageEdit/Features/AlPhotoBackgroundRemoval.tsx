import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store/store";
import { useParams } from "react-router";
import { api } from "@/services/axios";
import { setUploading } from "@/Store/EditImage/EditiImageSlice";
import { toast } from "sonner";
import {
  addNewImageUrl,
  addpreviousImageUrl,
} from "@/Store/chatdata/chatSlice";

import { generatedImage } from "@/services/imageUsage";
function AIPhotoBackgroundRemoval() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { src_file_url, isUploading } = useSelector(
    (state: RootState) => state.editImag,
  );
  console.log("src_file_url", src_file_url);
  const submit = async () => {
    if (!src_file_url) {
      toast.error("Image not found");
      return;
    }

    try {
      dispatch(setUploading(true));

      const response = await api.post("/edit/editImage", {
        src_file_url,
        ProjectId: threadId,
        EditType: "bgremove",
      });

      console.log("Background removal:", response.data);
      const { oldEditedImage, EditedImage } = response.data?.data;

      dispatch(addpreviousImageUrl({ url: oldEditedImage?.url || "" }));

      dispatch(addNewImageUrl({ url: EditedImage?.url || "" }));
      const usage = await generatedImage();

      console.log(usage);
      toast.success("Background removed successfully");
    } catch (error) {
      console.error("Background removal error:", error);
      toast.error("Failed to remove background");
    } finally {
      dispatch(setUploading(false));
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <Button onClick={submit} disabled={isUploading}>
        {isUploading ? "Removing..." : "Apply"}
      </Button>
    </div>
  );
}

export default AIPhotoBackgroundRemoval;
