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
type GetTaskResponse = TaskResultResponse<imgaeUrl>;

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

export default async function getMergeHatImageurl(payload: payload) {
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
    "https://i.pinimg.com/vwebp/1200x/88/7b/8a/887b8a8ad049d7714721733511cac261.webp",
  ref_file_url:
    "https://i.pinimg.com/vwebp/1200x/3b/f5/69/3bf56904293661413144a4b190ff4220.webp",
  gender: "male",
  style: "random",
};
// console.log(await getMergeHatImageurl(data));
