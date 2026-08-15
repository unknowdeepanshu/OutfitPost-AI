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
interface GetMessagePayload {
  threadId: string;
}

interface BackendMessage {
  modelImage?: {
    url?: string;
    publicId?: string;
  };

  productImage?: {
    url?: string;
    publicId?: string;
  };

  category?: string;
  platform?: string;
  Description?: string;
  includeText?: boolean;
  gender?: string;
}

export const GetMessage = createAsyncThunk(
  "chatData/GetMessage",
  async ({ threadId }: GetMessagePayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/message/messageid", {
        ProjectId: threadId,
      });

      const chatData: BackendMessage[] = response.data?.data?.chatData ?? [];

      const message = chatData[0];

      // No saved message data yet
      if (!message) {
        return {
          SelectedCatgory: null,
          FashionImage: {
            url: "",
          },
          ModelImage: {
            url: "",
          },
          gender: null,
          Description: "",
          Textinclude: false,
          SelectedPlatform: null,
          isUploading: false,
        };
      }
      const project = {
        SelectedCatgory: message.category ?? null,

        FashionImage: {
          url: message.productImage?.url ?? "",
        },

        ModelImage: {
          url: message.modelImage?.url ?? "",
        },

        gender: message.gender ?? null,

        Description: message.Description ?? "",

        Textinclude: message.includeText ?? false,

        SelectedPlatform: message.platform ?? null,

        isUploading: false,
      };
      console.log("this si proesfdesdf", project);
      return project;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? "Failed to fetch message");
    }
  },
);
