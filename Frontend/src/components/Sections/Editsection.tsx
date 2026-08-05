import { Card, CardDescription, CardHeader } from "@/components/ui/card";

function ImageEditSection() {
  const ImageEdit: imageEditSection[] = [
    {
      ImageEditHeader: "AI Object Removal",
      ImageEditUrl: "clothes.webp",
      ImageEditPara:
        "Remove unwanted objects with precision from your photos while preserving intricate details. ",
    },
    {
      ImageEditHeader: "Al Photo Enhance",
      ImageEditUrl: "bag.webp",
      ImageEditPara:
        "Sharpen, upscale, denoise, and fix colors to transform low-resolution images into high-quality masterpieces",
    },
    {
      ImageEditHeader: "AI Image Extender",
      ImageEditUrl: "shoues.webp",
      ImageEditPara:
        "Expand your photos with our AI Image Extender. Seamlessly broaden visuals for all ratios",
    },
    {
      ImageEditHeader: "Al Photo Background Removal",
      ImageEditUrl: "Hat.webp",
      ImageEditPara:
        "Remove background from photo with impeccable accuracy, ensuring the high quality of images.",
    },
    {
      ImageEditHeader: "AI Photo Background Change",
      ImageEditUrl: "Scarves.webp",
      ImageEditPara:
        "Swap backgrounds with a single click, then use text prompts to control or generate a new setting. This is ideal for industries requiring rapid product image updates, such as e-commerce and digital content creation.",
    },
    {
      ImageEditHeader: "AI Replace",
      ImageEditUrl: "Scarves.webp",
      ImageEditPara:
        "Effortlessly remove unwanted objects from your photos and replace them with text or new elements using AI Replace. ",
    },
  ];
  return (
    <>
      <div className="my-20 flex min-h-screen w-full flex-col">
        <div className="flex w-full flex-col text-center text-3xl">
          <b>Image Editing with AI</b>
        </div>
        <div className="mt-8 flex w-full flex-1 gap-2 md:h-80">
          <div className="flex h-full flex-wrap justify-center gap-3 md:justify-normal">
            {ImageEdit.map((e, index) => (
              <ImageEditCatgory
                key={index}
                ImageEditUrl={e.ImageEditUrl}
                ImageEditPara={e.ImageEditPara}
                ImageEditHeader={e.ImageEditHeader}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageEditSection;

type imageEditSection = {
  ImageEditUrl: string;
  ImageEditPara: string;
  ImageEditHeader: string;
};

function ImageEditCatgory({
  ImageEditUrl,
  ImageEditPara,
  ImageEditHeader,
}: imageEditSection) {
  return (
    <>
      <Card className="h-56 w-40 gap-0 bg-transparent md:h-80 md:w-60">
        <div className="h-[70%] md:h-[80%]">
          <img src={ImageEditUrl} className="h-40 w-full rounded-t-2xl" />
        </div>
        <div className="border-chart-4 border-t p-4">
          <CardHeader>
            <span className="font-bold">{ImageEditHeader}</span>
          </CardHeader>
          <CardDescription className="h-full p-2">
            <span className="my-auto flex h-full">{ImageEditPara}</span>
          </CardDescription>
        </div>
      </Card>
    </>
  );
}
