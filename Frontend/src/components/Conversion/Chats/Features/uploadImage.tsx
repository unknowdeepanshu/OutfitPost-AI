import { IconCloud } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Imagejson } from "@/Store/chatdata/chatSlice";
import { useState, useRef, useEffect } from "react";

import type { AppDispatch, RootState } from "@/Store/store";
import {
  UploadFashionImage,
  UploadModelImage,
} from "@/Store/chatdata/chatDataThunk";

interface ImageUploadProps {
  Title: string;
  Description: string;
  id: string | undefined;
}

export default function ImageUpload({
  Title,
  Description,
  id,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const chatjson = useSelector((state: RootState) => state.chatdata);

  const dispatch = useDispatch<AppDispatch>();

  const isFashionImage = Title === "Fashion Image";

  // Get URL from Redux/backend
  const backendImageUrl = isFashionImage
    ? chatjson.FashionImage?.url
    : chatjson.ModelImage?.url;

  // Show backend image when there is no newly selected local file
  useEffect(() => {
    if (!file && backendImageUrl) {
      setPreviewUrl(backendImageUrl);
    }

    if (!file && !backendImageUrl) {
      setPreviewUrl("");
    }
  }, [backendImageUrl, file]);

  function uploadImage() {
    inputRef.current?.click();
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] ?? null;

    if (!selectedFile) return;

    setFile(selectedFile);

    const localUrl = URL.createObjectURL(selectedFile);

    setPreviewUrl(localUrl);

    const imageData = {
      title: Title,
      file: selectedFile,
      url: localUrl,
    };

    // Update Redux immediately
    dispatch(Imagejson(imageData));

    // Upload image
    if (Title === "Fashion Image") {
      dispatch(
        UploadFashionImage({
          file: selectedFile,
          chatId: id,
        }),
      );
    }

    if (Title === "Model Image") {
      dispatch(
        UploadModelImage({
          file: selectedFile,
          chatId: id,
        }),
      );
    }
  }

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const hasImage = Boolean(previewUrl);

  return (
    <div className="flex flex-col gap-2">
      {hasImage ? (
        <Empty className="border border-dashed p-2">
          <EmptyContent>
            <button
              type="button"
              onClick={uploadImage}
              className="flex w-full items-center justify-center"
            >
              <img
                src={previewUrl}
                alt={Title}
                className="max-h-64 max-w-full object-contain"
              />
            </button>
          </EmptyContent>
        </Empty>
      ) : (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconCloud />
            </EmptyMedia>

            <EmptyTitle>{Title}</EmptyTitle>
            <EmptyDescription>{Description}</EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button type="button" onClick={uploadImage} variant="outline">
              Upload Image
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <Input
        ref={inputRef}
        id={`${Title}-${id}`}
        type="file"
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
