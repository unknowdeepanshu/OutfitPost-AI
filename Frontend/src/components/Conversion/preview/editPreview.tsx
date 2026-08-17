import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { SourceImageUrl } from "@/Store/EditImage/EditiImageSlice";
import { useDispatch } from "react-redux";
import { IconDownloadFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { handleDownload } from "@/services/imageUsage";

interface EditPreviewImageProps {
  currentImageUrl: string;
  previousImageUrl: string;
  newImageUrl: string;
}

function EditPreviewImage({
  currentImageUrl,
  previousImageUrl,
  newImageUrl,
}: EditPreviewImageProps) {
  const dispatch = useDispatch();

  const [showNewImage, setShowNewImage] = useState(true);

  const selectedImage = showNewImage ? newImageUrl : previousImageUrl;

  useEffect(() => {
    if (selectedImage) {
      dispatch(SourceImageUrl(selectedImage));
    }
  }, [selectedImage, dispatch]);

  return (
    <div className="bg-muted/50 relative col-span-2 flex aspect-video h-full w-[stretch] items-center justify-center overflow-hidden rounded-xl">
      <div className="relative flex h-full w-full items-center justify-center">
        {currentImageUrl === "" && newImageUrl === "" ? (
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted relative w-full max-w-sm rounded-lg"
          />
        ) : (
          <div className="flex w-[90%] items-center justify-center gap-6">
            {/* Current Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-1/2 flex-col"
            >
              <p className="mb-3 text-sm font-medium">Current Image</p>

              <div className="bg-background overflow-hidden rounded-lg border shadow-sm">
                <img
                  src={currentImageUrl}
                  alt="Current poster"
                  className="h-[30rem] w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Edit Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex w-1/2 flex-col items-center"
            >
              <div className="mb-3 flex w-full items-center justify-between">
                <p className="text-sm font-medium">Edit Image</p>

                <div className="flex">
                  <Button
                    size="sm"
                    variant={showNewImage ? "default" : "ghost"}
                    onClick={() => setShowNewImage(true)}
                    className="h-7 px-3"
                  >
                    New
                  </Button>

                  <Button
                    size="sm"
                    variant={!showNewImage ? "default" : "ghost"}
                    onClick={() => setShowNewImage(false)}
                    disabled={!previousImageUrl}
                    className="h-7 px-3"
                  >
                    Previous
                  </Button>
                </div>
              </div>

              <div className="bg-background relative w-full overflow-hidden rounded-lg border shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={showNewImage ? "Edited poster" : "Previous poster"}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                    className="h-[30rem] w-full object-contain"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <Button
        onClick={() => handleDownload(selectedImage)}
        className="absolute top-4 right-4"
        variant="ghost"
      >
        <IconDownloadFilled />
      </Button>
    </div>
  );
}

export default EditPreviewImage;
