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
  gender: string;
  style: string;
}

async function GeneratedTaskId(payload: payload) {
  try {
    const shoesMerge = await instance.post<CreateTaskResponse>(
      "/shoes",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return shoesMerge.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          "Failed to generate YouCam task in merge shoes.",
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
    const imageId = await instance.get<GetTaskResponse>(`/shoes/${taskId}`);
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

async function WaitForMergeShoes(taskId: string) {
  const MAX_RETRIES = 10;

  for (let i = 0; i < MAX_RETRIES; i++) {
    const response = await GeneratedMergeImage(taskId);
    console;
    if (response.data.task_status === "success") {
      return response.data.results;
    }

    if (response.data.task_status === "failed") {
      throw new Error(response.data.error ?? "Image generation failed.");
    }

    await sleep(2000);
  }

  throw new Error("Image generation timeout.");
}

export async function getMergeShoesImageurl(payload: payload) {
  const task = await GeneratedTaskId(payload);
  const image = await WaitForMergeShoes(task.data.task_id);

  return image;
}

const data: payload = {
  src_file_url:
    "https://i.pinimg.com/vwebp/736x/1e/f1/97/1ef197dc00efd20a2d75c795d50c0c2c.webp",
  ref_file_url:
    "https://i.pinimg.com/736x/50/7c/11/507c11dd5cae613163d93dc9ceb82305.jpg",
  gender: "male",
  style: "random",
};
console.log(await getMergeShoesImageurl(data));
