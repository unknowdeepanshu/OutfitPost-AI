import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface EditImageData {
  src_file_url: String;
  scale: Number;
  msk_file_url: String;
  prompt: String;
}
const initialState: EditImageData = {
  src_file_url: "",
  scale: 0,
  msk_file_url: "",
  prompt: "",
};
export const editImageSlice = createSlice({
  name: "Edit image data",
  initialState,
  reducers: {
    SourceImageUrl: (state, action: PayloadAction<string>) => {
      state.src_file_url = action.payload;
    },
    ScaleNumbers: (state, action: PayloadAction<Number>) => {
      state.scale = action.payload;
    },
  },
});

export const { ScaleNumbers, SourceImageUrl } = editImageSlice.actions;
export default editImageSlice.reducer;
