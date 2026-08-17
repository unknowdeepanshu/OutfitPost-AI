import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/Store/store";

import { api } from "@/services/axios";
import { setUploading } from "@/Store/EditImage/EditiImageSlice";
import { toast } from "sonner";
import { useState } from "react";

import {
  addNewImageUrl,
  addpreviousImageUrl,
} from "@/Store/chatdata/chatSlice";
import { generatedImage } from "@/services/imageUsage";
type ItemLabel = {
  label: string;
  value: number;
};

interface ScaleNumberProps {
  items: ItemLabel[];
}

const scaleOptions: ItemLabel[] = [
  {
    label: "1x",
    value: 1,
  },
  {
    label: "2x",
    value: 2,
  },
  {
    label: "4x",
    value: 4,
  },
];

function AIPhotoEnhance() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h4 className="text-sm font-medium">Scale Number</h4>

      <ScaleNumber items={scaleOptions} />
    </div>
  );
}

function ScaleNumber({ items }: ScaleNumberProps) {
  const [scale, setScale] = useState<number | null>(null);

  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { src_file_url, isUploading } = useSelector(
    (state: RootState) => state.editImag,
  );

  const submit = async () => {
    if (!scale) {
      toast.error("Select a scale");
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
        scale,
        EditType: "enhance",
      });

      console.log("AI Enhance:", response.data);
      const { oldEditedImage, EditedImage } = response.data?.data;

      dispatch(addpreviousImageUrl({ url: oldEditedImage?.url || "" }));

      dispatch(addNewImageUrl({ url: EditedImage?.url || "" }));
      const usage = await generatedImage();

      console.log(usage);
      toast.success("Image enhanced successfully");
    } catch (error) {
      console.error("AI enhance error:", error);
      toast.error("Failed to enhance image");
    } finally {
      dispatch(setUploading(false));
    }
  };

  return (
    <>
      <Select
        value={scale?.toString() ?? ""}
        onValueChange={(value) => {
          setScale(Number(value));
        }}
        disabled={isUploading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select scale" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Scale Number</SelectLabel>

            {items.map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={submit} disabled={isUploading || !scale}>
        {isUploading ? "Enhancing..." : "Apply"}
      </Button>
    </>
  );
}

export default AIPhotoEnhance;
