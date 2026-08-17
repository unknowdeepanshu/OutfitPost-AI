import { api } from "./axios";
export const handleDownload = async (imageUrl: string) => {
  try {
    // 1. Download image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to download image");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "outfitpost-image.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    // 2. Increase user's download count
    const image = await api.get("/imageUsage/download");
    console.log(image.data);
  } catch (error) {
    console.error("Download error:", error);
  }
};
export const generatedImage = async () => {
  try {
    // Increase generated count
    const response = await api.get("/imageUsage/generated");

    return response.data;
  } catch (error) {
    console.error("Generated image count error:", error);
    throw error;
  }
};

export const getImageUsage = async () => {
  try {
    const response = await api.get("/imageUsage/getdownloadandgenerated");
    console.log("get downaweh", response.data);
    return response.data;
  } catch (error) {
    console.error("Get image usage error:", error);
    throw error;
  }
};
