import { useEffect, useState } from "react";
import { Chats } from "./Chats/chat";
import { ImageEdit } from "./ImageEdit/ImageEdit";
import PreviewImage from "./preview/preview";

import { useParams } from "react-router";
import { GetMessage } from "@/Store/chatdata/chatDataThunk";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import EditPreviewImage from "./preview/editPreview";

function Conversion() {
  const [showImage, setShowImageEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams();

  const chatjson = useSelector((state: RootState) => state.chatdata);
  // const iamgdata = useSelector((state: RootState) => state.editImag);

  // First: get message from backend
  useEffect(() => {
    if (!threadId) return;

    const loadMessage = async () => {
      try {
        setIsLoading(true);

        await dispatch(
          GetMessage({
            threadId,
          }),
        ).unwrap();
      } catch (error) {
        console.error("Failed to load message:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessage();
  }, [dispatch, threadId]);

  // Second: this runs when Redux chat data is loaded/changed
  useEffect(() => {
    if (isLoading) return;

    console.log("Loaded chat JSON:", chatjson);

    if (!chatjson) return;
  }, [chatjson, isLoading]);

  // console.log("Image edit:", iamgdata);

  const already: string = "";

  if (isLoading) {
    return (
      <div className="h-full w-full items-center justify-center">
        <p>Loading chat...</p>
      </div>
    );
  }
  return (
    <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
      <div className="flex h-full w-[stretch] rounded-xl">
        {showImage ? (
          <Chats ShowImage={setShowImageEdit} chatjson={chatjson} />
        ) : (
          <ImageEdit ShowImage={setShowImageEdit} />
        )}
      </div>
      {showImage ? (
        <PreviewImage ImageUrl={chatjson.currentPosterImage?.url ?? already} />
      ) : (
        <EditPreviewImage
          currentImageUrl={chatjson.currentPosterImage?.url ?? already}
          previousImageUrl={chatjson.previousImageUrl?.url ?? already}
          newImageUrl={chatjson.NewImageUrl?.url ?? already}
        />
      )}
    </div>
  );
}

export default Conversion;
