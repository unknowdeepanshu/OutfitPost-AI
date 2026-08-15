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
}
async function GeneratedTaskId(payload: payload) {
  try {
    const BagMerge = await instance.post<CreateTaskResponse>("/bag", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return BagMerge.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          "Failed to generate YouCam task in merge Bag.",
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
    const imageId = await instance.get<GetTaskResponse>(`/bag/${taskId}`);
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

export default async function getMergeBagImageurl(payload: payload) {
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
    "https://i.pinimg.com/vwebp/736x/76/78/ab/7678ab8dc49274c166c1daf12dc8035b.webp",
  ref_file_url:
    "https://i.pinimg.com/736x/df/ba/9a/dfba9ae77c1a4ed80df7daf1330481ff.jpg",
  gender: "female",
};
// console.log(await getMergeBagImageurl(data));
