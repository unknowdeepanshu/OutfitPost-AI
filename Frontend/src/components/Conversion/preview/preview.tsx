import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { SourceImageUrl } from "@/Store/EditImage/EditiImageSlice";
import { useDispatch } from "react-redux";
import { IconDownloadFilled } from "@tabler/icons-react";
interface PreviewImage {
  ImageUrl: string;
}
function PreviewImage({ ImageUrl }: PreviewImage) {
  const dispatch = useDispatch();
  if (ImageUrl || "") dispatch(SourceImageUrl(ImageUrl));
  return (
    <>
      <div className="bg-muted/50 relative col-span-2 flex aspect-video h-full w-[stretch] items-center justify-center rounded-xl">
        <div className="relative">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted relative w-full max-w-sm rounded-lg"
          >
            <img
              src={ImageUrl}
              alt="Photo"

              className="rounded-lg"
            />
          </AspectRatio>
        </div>
        <Button className="absolute top-4 right-4" variant="ghost">
          <IconDownloadFilled />
        </Button>
      </div>
    </>
  );
}

export default PreviewImage;
