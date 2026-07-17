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
import CheckboxBasic from "./checkbox";

interface ImageUpload {
  Title: string;
  Description: string;
}
export default function ImageUpload({ Title, Description }: ImageUpload) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alBackgroundRemoval, setAlBackgroundRemoval] = useState(false);
  const [alEnhance, setAlEnhance] = useState(false);
  const [imageShow, setImageShow] = useState(true);

  function uploadImage() {
    inputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
      setImageShow(false);
      const ImageData = {
        title: Title,
        url,
        AlBackgroundRemoval: alBackgroundRemoval,
        AlEnhance: alEnhance,
      };
      dispatch(Imagejson(ImageData));
    }
  }

  const getEditcheck = (name: string, checked: boolean) => {
    const key = name.replaceAll(" ", "");
    if (key === "AlBackgroundRemoval") setAlBackgroundRemoval(checked);
    if (key === "AlEnhance") setAlEnhance(checked);

    const ImageData = {
      title: Title,
      url: previewUrl ?? "",
      AlBackgroundRemoval:
        key === "AlBackgroundRemoval" ? checked : alBackgroundRemoval,
      AlEnhance: key === "AlEnhance" ? checked : alEnhance,
    };
    dispatch(Imagejson(ImageData));
  };

  const imgaeEdit = [
    { title: "Al Enhance", value: getEditcheck },
    { title: "Al Background Removal", value: getEditcheck },
  ];

  const dispatch = useDispatch();
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
        {imgaeEdit.map((e) => (
          <CheckboxBasic Description={e.title} getValues={e.value} />
        ))}
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
