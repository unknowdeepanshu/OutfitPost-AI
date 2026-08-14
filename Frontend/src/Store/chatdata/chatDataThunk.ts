import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
type Image = {
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

type UploadImagePayload = {
  file: File;
  chatId: any;
};

type SubmitTextPayload = {
  data: ChatData;
};

export const UploadFashionImage = createAsyncThunk(
  "chatData/uploadFashionImage",
  async ({ file, chatId }: UploadImagePayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("FashionImage", file);

      formData.append("chatId", chatId);
      const response = await api.post(
        `imageUpload/UploadFashionImage`,
        formData,
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? "Something went wrong");
    }
  },
);

export const UploadModelImage = createAsyncThunk(
  "chatData/UploadModelImage",
  async ({ file, chatId }: UploadImagePayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("ModelImage", file);
      formData.append("chatId", chatId);
      const response = await api.post(`imageUpload/UploadModelImage`, formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? "Something went wrong");
    }
  },
);

export const submitUserTextData = createAsyncThunk(
  "chatData/submitUserTextData",
  async ({ data }: SubmitTextPayload, { rejectWithValue }) => {
    try {
      const payload = {
        SelectedCatgory: data.SelectedCatgory ?? "",
        SelectedPlatform: data.SelectedPlatform ?? "",
        gender: data.gender ?? "",
        Description: data.Description,
        Textinclude: data.Textinclude,
        FashionImageUrl: data.FashionImage.url ?? "",
        ModelImageUrl: data.ModelImage.url ?? "",
      };

      const response = await api.post(
        `imageUpload/userUploadTextData`,
        payload,
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? "Something went wrong");
    }
  },
);
