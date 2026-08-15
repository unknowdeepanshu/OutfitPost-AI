import { instance } from "../axios.ts";
import axios from "axios";
import {
  waitForTaskResult,
  type TaskResultResponse,
} from "../../Utilits/waitforImage.ts";
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
type GetTaskResponse = TaskResultResponse<imgaeUrl>;

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

export default async function getMergeShoesImageurl(payload: payload) {
  const task = await GeneratedTaskId(payload);
  const image = await waitForTaskResult<imgaeUrl>(
    task.data.task_id,
    GeneratedMergeImage,
    {
      delayMs: 4000,
      failureStatuses: ["error"],
    },
  );

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
// console.log(await getMergeShoesImageurl(data));
