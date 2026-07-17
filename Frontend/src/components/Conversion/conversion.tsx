import { Chats } from "./Chats/chat";

function Conversion() {
  return (
    <>
      <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
        <div className="flex h-full w-[stretch] rounded-xl">
          <Chats />
        </div>
        <div className="bg-muted/50 col-span-2 aspect-video h-full w-[stretch] rounded-xl" />
      </div>
    </>
  );
}

export default Conversion;
