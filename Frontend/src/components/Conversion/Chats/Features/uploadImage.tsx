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
import { useDispatch } from "react-redux";
import { Imagejson } from "@/Store/chatdata/chatSlice";
import { useState, useRef, useEffect } from "react";

import type { AppDispatch } from "@/Store/store";
import {
  UploadFashionImage,
  UploadModelImage,
} from "@/Store/chatdata/chatDataThunk";
interface ImageUpload {
  Title: string;
  Description: string;
  id: string | undefined;
}
export default function ImageUpload({ Title, Description, id }: ImageUpload) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageShow, setImageShow] = useState(true);

  function uploadImage() {
    inputRef.current?.click();
  }

  const dispatch = useDispatch<AppDispatch>();
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      if (Title === "Fashion Image") {
        console.log({ file: f, chatId: id });
        dispatch(UploadFashionImage({ file: f, chatId: id }));
      } else if (Title === "Model Image") {
        console.log({ file: f, chatId: id });
        dispatch(UploadModelImage({ file: f, chatId: id }));
      }
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
      setImageShow(false);
      const ImageData = {
        title: Title,
        file: f,
        url,
      };
      dispatch(Imagejson(ImageData));
    }
  }

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  return (
    <>
      <div className="flex flex-col gap-2">
        {imageShow ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconCloud />
              </EmptyMedia>
              <EmptyTitle>{Title}</EmptyTitle>
              <EmptyDescription>{Description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={uploadImage} variant="outline">
                Upload Image
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <Empty className="border border-dashed p-2">
            <EmptyContent>
              <button
                type="button"
                onClick={uploadImage}
                className="flex w-full items-center justify-center"
              >
                <img
                  src={previewUrl ?? undefined}
                  alt={Title}
                  className="max-h-64 max-w-full object-contain"
                />
              </button>
            </EmptyContent>
          </Empty>
        )}

        <Input
          ref={inputRef}
          id="picture"
          type="file"
          accept="image/jpeg, image/png, .jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
      </div>
    </>
  );
}
