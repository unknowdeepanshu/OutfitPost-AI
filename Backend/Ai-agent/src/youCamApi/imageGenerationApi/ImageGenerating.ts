import { instance } from "../axios.ts";
import axios from "axios";

// get taskId of image
interface payload {
  src_file_urls: string[];
  model: string;
  prompt: string;
  negative_prompt: string;
  size: string;
  prompt_extend: boolean;
}
interface Post {
  status: number;
  data: {
    task_id: string;
  };
}

async function GeneratedTaskId(payload: payload) {
  try {
    const imageId = await instance.post<Post>(
      "/image-to-image/youcam",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return imageId.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("YouCam API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message || "Failed to generate YouCam task.",
      );
    }

    console.error("Unexpected Error:", error);
    throw new Error("Something went wrong.");
  }
}
// Get image Url
type imgaeUrl = {
  url: string;
};
interface get {
  status: number;
  data: {
    error: null;
    results: imgaeUrl;
    task_status: string;
  };
}

async function GeneratedImage(taskId: string) {
  try {
    const imageId = await instance.get<get>(`/image-to-image/youcam/${taskId}`);
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
//sample data
const dataa: payload = {
  src_file_urls: [
    "https://i.pinimg.com/1200x/53/76/03/5376039bc4b71e7fd58b03fdfff77b01.jpg",
  ],
  model: "youcam-image-v2",
  prompt:
    "Create an Instagram Story poster with the uploaded product as the hero, centered on a dark mahogany wall with subtle gold leaf trim. Light the scene with soft warm light from a crystal chandelier, highlighting rich textures. Place a plush burgundy velvet drape on one side, a polished marble pedestal beneath, and a slender gold vase with white orchid blossoms. Include a faint Persian rug pattern and a gradient background from deep teal to ivory. Use shallow depth of field to keep product sharp, background softly blurred. Mood: sophisticated, timeless, elegant. Colors: black, gold, burgundy, ivory, teal. Capture with high‑resolution 85mm portrait lens, eye‑level view, slight upward tilt, hairstyle, and expression unchanged, and ensure the action is natural and smooth.",
  negative_prompt:
    "low resolution, pixelated, watermark, no text, logos, cartoon, anime, unrealistic proportions, harsh lighting, overexposed, underexposed, grain, noise, blur, distortion, clipping, vignette, background clutter, modern office, street, neon, futuristic, cheap plastic, mismatched colors, oversaturation, unrealistic shadows, reflections, altering product colors, changing model pose, extra accessories, busy composition",
  size: "720*1280",
  prompt_extend: true,
};

export { GeneratedImage, GeneratedTaskId };
