import { Chats } from "./Chats/chat";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function Conversion() {
  return (
    <>
      <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-3">
        <div className="flex h-full w-[stretch] rounded-xl">
          <Chats />
        </div>
        <div className="bg-muted/50 col-span-2 flex aspect-video h-full w-[stretch] items-center justify-center rounded-xl">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted w-full max-w-sm rounded-lg"
          >
            <img
              src="https://images.pexels.com/photos/38448887/pexels-photo-38448887.jpeg?_gl=1*3ncvpo*_gcl_au*MTkyODU1ODYzMi4xNzgzODY2Mjgx*_ga*MTYxMTk3ODA2MC4xNzgxOTQ4MDMz*_ga_8JE65Q40S6*czE3ODQzMDQ5MjEkbzI5JGcwJHQxNzg0MzA0OTIxJGo2MCRsMCRoMA.."
              alt="Photo"

              className="rounded-lg"
            />
          </AspectRatio>
        </div>
      </div>
    </>
  );
}

export default Conversion;
