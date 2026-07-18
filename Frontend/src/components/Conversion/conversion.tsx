import { useState } from "react";
import { Chats } from "./Chats/chat";
import { ImageEdit } from "./ImageEdit/ImageEdit";
import PreviewImage from "./preview/preview";
function Conversion() {
  const [showImage, setShowImage] = useState(true);
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
        <PreviewImage />
      </div>
    </>
  );
}

export default Conversion;
