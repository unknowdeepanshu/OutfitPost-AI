import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/Store/store";
import { api } from "@/services/axios";
import { setUploading } from "@/Store/EditImage/EditiImageSlice";
import { toast } from "sonner";

import { generatedImage } from "@/services/imageUsage";
import {
  addNewImageUrl,
  addpreviousImageUrl,
} from "@/Store/chatdata/chatSlice";
function AIPhotoBackgroundChange() {
  const [prompt, setPrompt] = useState("");

  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { src_file_url, isUploading } = useSelector(
    (state: RootState) => state.editImag,
  );

  const submit = async () => {
    if (!prompt.trim()) {
      toast.error("Describe the background");
      return;
    }

    if (!src_file_url) {
      toast.error("Image not found");
      return;
    }

    try {
      dispatch(setUploading(true));

      const response = await api.post("/edit/editImage", {
        src_file_url,
        ProjectId: threadId,
        prompt: prompt.trim(),
        EditType: "bgchange",
      });

      console.log("Background change:", response.data);

      const { oldEditedImage, EditedImage } = response.data?.data;

      dispatch(addpreviousImageUrl({ url: oldEditedImage?.url || "" }));

      dispatch(addNewImageUrl({ url: EditedImage?.url || "" }));
      const usage = await generatedImage();

      console.log(usage);
      toast.success("Background changed successfully");

      setPrompt("");
    } catch (error) {
      console.error("Background change error:", error);
      toast.error("Failed to change background");
    } finally {
      dispatch(setUploading(false));
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <Textarea
        value={prompt}
        placeholder="Describe the new background"
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isUploading}
      />

      <Button onClick={submit} disabled={isUploading}>
        {isUploading ? "Changing..." : "Apply"}
      </Button>
    </div>
  );
}

export default AIPhotoBackgroundChange;
