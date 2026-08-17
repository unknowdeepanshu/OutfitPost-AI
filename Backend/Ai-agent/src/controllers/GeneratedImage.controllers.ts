import { asyncHandler } from "../Utilits/asyncHandler.ts";
import type { Request, Response } from "express";
import { mergeImages } from "../youCamApi/FashionApi/index.ts";
import type {
  userData,
  GetImageURl,
  Mergedata,
  agentPrompt,
} from "../type/GeneratedImage.ts";
import { AgentCalled } from "../Langgraph/Agent.ts";
import { AddAgentImage } from "../youCamApi/axios.ts";
import { GetImageYouCamApi } from "../youCamApi/imageGenerationApi/ImageGenerating.ts";

const generateImage = asyncHandler(async (req: Request, res: Response) => {
  const userData: userData = req.body;
  if (!userData.SelectedCatgory?.trim())
    res.status(400).json({
      message: "not catgory",
      userData: userData.SelectedCatgory,
    });
  const imageUrl: GetImageURl = await mergeImages(userData);
  console.log(`this is image url :-`, imageUrl.url);
  const payload: Mergedata = {
    userData: userData,
    mergeImages: imageUrl.url,
  };
  const data = await AddAgentImage.post("/addAgent", payload);
  res.status(200).json({
    message: "ok",
    addAgent: data.data,
  });
});

const Addagent = asyncHandler(async (req: Request, res: Response) => {
  const { userData, mergeImages }: Mergedata = req.body;
  console.log(`this is userData ${userData} and mergeImage${mergeImages}`);
  const agentdata = await AgentCalled({
    userData: JSON.stringify(userData),
    ImageUrl: mergeImages,
  });
  const agentMessage: agentPrompt = JSON.parse(
    agentdata["messages"].at(-1)?.content,
  );
  console.log("this is image prompt", agentMessage);
  const PlatformSize = getImageSize(userData.SelectedPlatform);
  const postImage = await GetImageYouCamApi({
    Image_prompt: agentMessage.ImagePrompt,
    Negative_prompt: agentMessage.NegativePrompt,
    mergeImages: mergeImages,
    size: PlatformSize,
  });
  console.log("this is postImage", postImage);
  res.status(200).json({
    mergeImages: mergeImages,
    PromptImage: postImage.url,
  });
});
export { generateImage, Addagent };
const getImageSize = (platform: string) => {
  switch (platform) {
    case "Instgram Feed":
      return "1328*1328"; // 1:1

    case "Instagram Story":
      return "928*1664"; // 9:16

    case "Facebook Post":
      return "1664*928"; // 16:9

    case "LinkedIn Post":
      return "1664*928"; // 16:9

    case "X (Twitter) Post":
      return "1664*928"; // 16:9

    default:
      return "1664*928";
  }
};
