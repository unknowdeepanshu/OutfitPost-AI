import { instance } from "../axios.ts";
import axios from "axios";

import {
  waitForTaskResult,
  type TaskResultResponse,
} from "../../Utilits/waitforImage.ts";
interface payload {
  src_file_url: String;
}
interface CreateTaskResponse {
  status: number;
  data: {
    task_id: string;
  };
}
async function GeneratedTaskId(payload: payload) {
  try {
    const BagMerge = await instance.post<CreateTaskResponse>("/sod", payload, {
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
    const imageId = await instance.get<GetTaskResponse>(`/sod/${taskId}`);
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
export default async function AlPhotoBackgroundRemoval(payload: payload) {
  const task = await GeneratedTaskId(payload);

  const image = await waitForTaskResult<imgaeUrl>(
    task.data.task_id,
    GeneratedMergeImage,
    {
      failureStatuses: ["error"],
    },
  );
  return image.url;
}
