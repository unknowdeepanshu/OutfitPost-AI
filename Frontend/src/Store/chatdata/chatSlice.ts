import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetMessage } from "./chatDataThunk";

type Image = {
  url: string;
  file?: File | null;
};

type Images = {
  title: string;
  url: string;
  file?: File | null;
};

interface ChatData {
  SelectedCatgory: string | null;
  FashionImage: Image;
  ModelImage: Image;
  gender: string | null;
  Description: string;
  Textinclude: boolean;
  SelectedPlatform: string | null;
  isUploading: boolean;
}

const initialState: ChatData = {
  SelectedCatgory: " ",
  SelectedPlatform: " ",
  FashionImage: { url: " " },
  ModelImage: { url: " " },
  gender: " ",
  Description: " ",
  Textinclude: false,
  isUploading: false,
};

export const ChatDataSlice = createSlice({
  name: "Chat data",
  initialState,
  reducers: {
    Catgory: (state, action: PayloadAction<string | null>) => {
      state.SelectedCatgory = action.payload;
    },
    Platform: (state, action: PayloadAction<string | null>) => {
      state.SelectedPlatform = action.payload;
    },
    Imagejson: (state, action: PayloadAction<Images>) => {
      const payload = action.payload;
      const titleKey = payload.title?.replace(/\s/g, "");

      if (!titleKey) return;

      const image = {
        url: payload.url ?? "",
        file: payload.file,
        title: payload.title,
      };

      if (titleKey === "FashionImage") state.FashionImage = image;
      if (titleKey === "ModelImage") state.ModelImage = image;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    addText: (state, action: PayloadAction<boolean>) => {
      state.Textinclude = action.payload;
    },
    addDescribe: (state, action: PayloadAction<string>) => {
      state.Description = action.payload;
    },
    addGender: (state, action: PayloadAction<string | null>) => {
      state.gender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMessage.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const {
  addDescribe,
  Catgory,
  Platform,
  addGender,
  Imagejson,
  addText,
  setUploading,
} = ChatDataSlice.actions;
export default ChatDataSlice.reducer;
