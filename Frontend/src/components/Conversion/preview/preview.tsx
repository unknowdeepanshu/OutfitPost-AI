import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { SourceImageUrl } from "@/Store/EditImage/EditiImageSlice";
import { useDispatch } from "react-redux";
import { IconDownloadFilled } from "@tabler/icons-react";
import { useEffect } from "react";
import { handleDownload } from "@/services/imageUsage";

interface PreviewImageProps {
  ImageUrl: string;
}

function PreviewImage({ ImageUrl }: PreviewImageProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (ImageUrl || "") {
      dispatch(SourceImageUrl(ImageUrl));
    }
  }, [ImageUrl, dispatch]);

  return (
    <div className="bg-muted/50 relative col-span-2 flex aspect-video h-full w-[stretch] items-center justify-center rounded-xl">
      <div className="relative flex h-full w-full justify-center">
        <div className="flex w-[80%] items-center justify-center rounded-lg">
          {ImageUrl === "" ? (
            <AspectRatio
              ratio={9 / 16}
              className="bg-muted relative w-full max-w-sm rounded-lg"
            />
          ) : (
            <img src={ImageUrl} alt="Photo" className="h-[80%] rounded-lg" />
          )}
        </div>
      </div>

      <Button
        onClick={() => handleDownload(ImageUrl)}
        className="absolute top-4 right-4"
        variant="ghost"
      >
        <IconDownloadFilled />
      </Button>
    </div>
  );
}

export default PreviewImage;
