import getMergeBagImageurl from "./AIBag.ts";
import getMergeclothsImageurl from "./AIClothes.ts";
import getMergeHatImageurl from "./AIHat.ts";
import getMergescarfImageurl from "./AIScarf.ts";
import getMergeShoesImageurl from "./AIShoes.ts";
export {
  getMergescarfImageurl,
  getMergeclothsImageurl,
  getMergeShoesImageurl,
  getMergeHatImageurl,
  getMergeBagImageurl,
};
// import type  and function
import type {
  userData,
  payloadOne,
  payloadTwo,
} from "../../type/GeneratedImage.ts";
export async function mergeImages(data: userData) {
  const catgory = data.SelectedCatgory?.toLocaleLowerCase();
  const payload: payloadOne = {
    src_file_url: data.ModelImage.url,
    ref_file_url: data.FashionImage.url,
    gender: data.gender,
    style: "random",
  };
  const ClothsPayload: payloadTwo = {
    src_file_url: data.ModelImage.url,
    ref_file_url: data.FashionImage.url,
    garment_category: "auto",
    change_shoes: true,
  };
  switch (catgory) {
    case "shoes":
      return getMergeShoesImageurl(payload);
    case "hat":
      return getMergeHatImageurl(payload);
    case "scarf":
      return getMergescarfImageurl(payload);
    case "clothes":
      return getMergeclothsImageurl(ClothsPayload);
    case "bag":
      const { style, ...bagPayload } = payload;
      return getMergeBagImageurl(bagPayload);
    default:
      throw new Error("Invalid category");
  }
}
