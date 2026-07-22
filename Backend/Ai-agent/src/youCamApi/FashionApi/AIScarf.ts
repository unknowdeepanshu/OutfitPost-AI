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
    const scarfMerge = await instance.post<CreateTaskResponse>(
      "/scarf",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return scarfMerge.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          "Failed to generate YouCam task in merge scarf.",
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
    const imageId = await instance.get<GetTaskResponse>(`/scarf/${taskId}`);
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

async function WaitForMergescarf(taskId: string) {
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

export default async function getMergescarfImageurl(payload: payload) {
  const task = await GeneratedTaskId(payload);

  const image = await WaitForMergescarf(task.data.task_id);

  return image;
}

const data: payload = {
  src_file_url:
    "https://i.pinimg.com/vwebp/736x/76/78/ab/7678ab8dc49274c166c1daf12dc8035b.webp",
  ref_file_url:
    "https://i.pinimg.com/vwebp/1200x/2e/57/fe/2e57fe215fbb25d9f89271a5dc9bdf85.webp",
  gender: "female",
  style: "random",
};
// console.log(await getMergescarfImageurl(data));
