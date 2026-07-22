export type Image = {
  url: string;
  AlEnhance: boolean;
  AlBackgroundRemoval: boolean;
};
export interface userData {
  SelectedCatgory: string | null;
  FashionImage: Image;
  ModelImage: Image;
  gender: string;
  Description: string;
  Textinclude: boolean;
  SelectedPlatform: string;
}

export interface GetImageURl {
  url: string;
}
export interface payloadOne {
  src_file_url: string;
  ref_file_url: string;
  gender: string;
  style: string;
}
export interface payloadTwo {
  src_file_url: string;
  ref_file_url: string;
  garment_category: string;
  change_shoes: boolean;
}

export interface Mergedata {
  userData: userData;
  mergeImages: string;
}

export interface agentPrompt {
  ImagePrompt: string;
  NegativePrompt: string;
}
