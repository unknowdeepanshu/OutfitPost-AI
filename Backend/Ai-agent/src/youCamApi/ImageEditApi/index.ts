import type { EditImageData } from "./../../type/EditImage.ts";
import AIPhotoBackgroundChange from "./AIPhotoBackgroundChange.ts";
import AIPhotoEnhance from "./AIPhotoEnhance .ts";
import AlPhotoBackgroundRemoval from "./AlPhotoBackgroundRemoval.ts";

export async function selectedEditImageType(getData: EditImageData) {
  const { ImageData, EditType } = getData;
  switch (EditType.toLocaleLowerCase()) {
    case "enhance":
      const { msk_file_url, prompt, ...getEnhance } = ImageData;
      return AIPhotoEnhance({
        ...getEnhance,
        scale: Number(getEnhance.scale),
      });
    case "bgremove":
      const { src_file_url: bgRemoveSrcUrl } = ImageData;
      return AlPhotoBackgroundRemoval({ src_file_url: bgRemoveSrcUrl });
    case "bgchange":
      const { src_file_url: bgChangeSrcUrl, prompt: bgChangePrompt } = ImageData;
      return AIPhotoBackgroundChange({ src_file_url: bgChangeSrcUrl, prompt: bgChangePrompt });
    default:
      throw new Error("Invalid EditType");
  }
}
