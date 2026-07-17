import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Image = {
  url: string;
  AlEnhance: boolean;
  AlBackgroundRemoval: boolean;
};

type Images = {
  title: string;
  url: string;
  AlEnhance: boolean;
  AlBackgroundRemoval: boolean;
};
interface ChatData {
  SelectedCatgory: string;
  FashionImage: Image;
  ModelImage: Image;
  Description: string;
  Textinclude: boolean;
  SelectedPlatform: string;
}

const initialState: ChatData = {
  SelectedCatgory: " ",
  SelectedPlatform: " ",
  FashionImage: { url: " ", AlBackgroundRemoval: false, AlEnhance: false },
  ModelImage: { url: " ", AlBackgroundRemoval: false, AlEnhance: false },
  Description: " ",
  Textinclude: false,
};

export const ChatDataSlice = createSlice({
  name: "Chat data",
  initialState,
  reducers: {
    Catgory: (state, action: PayloadAction<string>) => {
      state.SelectedCatgory = action.payload;
    },
    Platform: (state, action: PayloadAction<string>) => {
      state.SelectedPlatform = action.payload;
    },
    Imagejson: (state, action: PayloadAction<Images>) => {
      const payload = action.payload;
      const titleKey = payload.title?.replace(/\s/g, "");

      if (!titleKey) return;

      const image = {
        url: payload.url ?? "",
        AlBackgroundRemoval: !!payload.AlBackgroundRemoval,
        AlEnhance: !!payload.AlEnhance,
      };

      if (titleKey === "FashionImage") state.FashionImage = image;
      if (titleKey === "ModelImage") state.ModelImage = image;
    },
    addText: (state, action: PayloadAction<boolean>) => {
      state.Textinclude = action.payload;
    },
    addDescribe: (state, action: PayloadAction<string>) => {
      state.Description = action.payload;
    },
  },
});
export const { addDescribe, Catgory, Platform, Imagejson, addText } =
  ChatDataSlice.actions;
export default ChatDataSlice.reducer;
