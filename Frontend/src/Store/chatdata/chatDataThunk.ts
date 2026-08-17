import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type UploadImagePayload = {
  file: File;
  chatId: any;
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

export const CreateMessage = createAsyncThunk(
  "chatdata/createMessage",
  async (
    {
      ProjectId,
      category,
      platform,
      includeText,
      Description,
      gender,
    }: {
      ProjectId: string | undefined;
      category: string | null;
      platform: string | null;
      includeText: boolean;
      Description: string;
      gender: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("message/create", {
        ProjectId,
        category,
        platform,
        includeText,
        Description,
        gender,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create message",
      );
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
  currentPosterImage?: {
    url?: string;
    publicId?: string;
  };
  previousImageUrl?: {
    url?: string;
    publicId?: string;
  };
  NewImageUrl?: {
    url?: string;
    publicId?: string;
  };
  category?: string;
  platform?: string;
  Description?: string;
  includeText?: boolean;
  gender?: string;
}
interface ImageHistory {
  NewImageUrl?: {
    url?: string;
    publicId?: string;
  };
  previousImageUrl?: {
    url?: string;
    publicId?: string;
  };
}
export const GetMessage = createAsyncThunk(
  "chatData/GetMessage",
  async ({ threadId }: GetMessagePayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/message/messageid", {
        ProjectId: threadId,
      });

      const chatData: BackendMessage[] = response.data?.data?.chatData ?? [];
      const ImageHistory: ImageHistory =
        response.data?.data?.ImageHistory ?? {};
      console.log(
        "this csdfugsduyf",
        Object.entries(ImageHistory).length !== 0,
      );
      if (Object.entries(ImageHistory).length === 0) {
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
          currentPosterImage: { url: message.currentPosterImage?.url ?? " " },
          isUploading: false,
        };
        console.log("this si without imageHistory", project);
        return project;
      } else {
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
          NewImageUrl: {
            url: ImageHistory.NewImageUrl?.url ?? "",
          },
          previousImageUrl: {
            url: ImageHistory.previousImageUrl?.url ?? "",
          },
          gender: message.gender ?? null,

          Description: message.Description ?? "",

          Textinclude: message.includeText ?? false,

          SelectedPlatform: message.platform ?? null,
          currentPosterImage: { url: message.currentPosterImage?.url ?? " " },
          isUploading: false,
        };
        console.log("this si without imageHistory", project);
        return project;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? "Failed to fetch message");
    }
  },
);
