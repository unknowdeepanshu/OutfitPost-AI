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
    const HatMerge = await instance.post<CreateTaskResponse>("/hat", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return HatMerge.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          "Failed to generate YouCam task in merge Hat.",
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
    const imageId = await instance.get<GetTaskResponse>(`/hat/${taskId}`);
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

async function WaitForMergeHat(taskId: string) {
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

export default async function getMergeHatImageurl(payload: payload) {
  const task = await GeneratedTaskId(payload);

  const image = await WaitForMergeHat(task.data.task_id);

  return image;
}

const data: payload = {
  src_file_url:
    "https://i.pinimg.com/vwebp/1200x/88/7b/8a/887b8a8ad049d7714721733511cac261.webp",
  ref_file_url:
    "https://i.pinimg.com/vwebp/1200x/3b/f5/69/3bf56904293661413144a4b190ff4220.webp",
  gender: "male",
  style: "random",
};
// console.log(await getMergeHatImageurl(data));
