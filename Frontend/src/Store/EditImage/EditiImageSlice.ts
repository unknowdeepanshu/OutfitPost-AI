import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface EditImageData {
  src_file_url: String;
  isUploading: boolean;
}
const initialState: EditImageData = {
  src_file_url: "",
  isUploading: false,
};
export const editImageSlice = createSlice({
  name: "Edit image data",
  initialState,
  reducers: {
    SourceImageUrl: (state, action: PayloadAction<string>) => {
      state.src_file_url = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
  },
});

export const { SourceImageUrl, setUploading } = editImageSlice.actions;
export default editImageSlice.reducer;
