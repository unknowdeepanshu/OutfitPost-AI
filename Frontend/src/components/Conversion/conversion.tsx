import { useState } from "react";
import { Chats } from "./Chats/chat";
import { ImageEdit } from "./ImageEdit/ImageEdit";
import PreviewImage from "./preview/preview";

import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";
function Conversion() {
  const [showImage, setShowImage] = useState(true);
  const iamgdata = useSelector((state: RootState) => state.editImag);
  console.log("Image edit", iamgdata);

  const url: string =
    "https://images.pexels.com/photos/38448887/pexels-photo-38448887.jpeg?_gl=1*3ncvpo*_gcl_au*MTkyODU1ODYzMi4xNzgzODY2Mjgx*_ga*MTYxMTk3ODA2MC4xNzgxOTQ4MDMz*_ga_8JE65Q40S6*czE3ODQzMDQ5MjEkbzI5JGcwJHQxNzg0MzA0OTIxJGo2MCRsMCRoMA..";
  return (
    <>
      {/* <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video h-full w-[stretch] rounded-xl" />
            <div className="bg-muted/50 col-span-2 aspect-video h-full w-[stretch] rounded-xl" />
          </div> */}
      <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
        <div className="flex h-full w-[stretch] rounded-xl">
          {showImage ? (
            <Chats ShowImage={setShowImage} />
          ) : (
            <ImageEdit ShowImage={setShowImage} />
          )}
        </div>
        <PreviewImage ImageUrl={url} />
      </div>
    </>
  );
}

export default Conversion;
