import { instance } from "../axios.ts";
import axios from "axios";
interface CreateTaskResponse {
  status: number;
  data: {
    task_id: string;
  };
}
interface payload {
  src_file_url: string;
  ref_file_url: string;
  garment_category: string;
  change_shoes: boolean;
}

const defaultPayload = {
  garment_category: "auto",
  change_shoes: true,
} as const;

async function GeneratedTaskId(payload: payload) {
  try {
    const clothsMerge = await instance.post<CreateTaskResponse>(
      "/cloth-v3",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return clothsMerge.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          "Failed to generate YouCam task in merge cloths.",
      );
    }

    console.error("Unexpected Error:", error);
    throw new Error("Something went wrong.");
  }
}

type imgaeUrl = {
  url: string;
};
interface GetTaskResponse {
  status: number;
  data: {
    error: null;
    results: imgaeUrl;
    task_status: string;
  };
}

async function GeneratedMergeImage(taskId: string) {
  try {
    const imageId = await instance.get<GetTaskResponse>(`/cloth-v3/${taskId}`);
    return imageId.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(error.response?.data?.message || "Task id error");
    }

    console.error("Unexpected Error:", error);
    throw new Error("Something went wrong.");
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function WaitForMergeCloths(taskId: string) {
  const MAX_RETRIES = 10;

  for (let i = 0; i < MAX_RETRIES; i++) {
    const response = await GeneratedMergeImage(taskId);

    if (response.data.task_status === "success") {
      return response.data.results;
    }

    if (response.data.task_status === "error") {
      throw new Error(response.data.error ?? "Image generation failed.");
    }

    await sleep(2000);
  }

  throw new Error("Image generation timeout.");
}

export default async function getMergeclothsImageurl(payload: payload) {
  const task = await GeneratedTaskId(payload);

  const image = await WaitForMergeCloths(task.data.task_id);

  return image;
}

const data: payload = {
  src_file_url:
    "https://i.pinimg.com/1200x/1d/4f/8d/1d4f8d3ee5b780bacf12eae45b17ba8b.jpg",
  ref_file_url:
    "https://i.pinimg.com/vwebp/736x/30/d3/2b/30d32bba13359ce94812c7fdc08e6b97.webp",
  garment_category: "auto",
  change_shoes: true,
};
// console.log(await getMergeclothsImageurl(data));
