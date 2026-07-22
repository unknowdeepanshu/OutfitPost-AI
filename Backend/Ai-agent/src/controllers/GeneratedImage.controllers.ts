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
import { PromptImage } from "../youCamApi/imageGenerationApi/ImageGenerating.ts";

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
    addagent: data.data,
  });
});

const Addagent = asyncHandler(async (req: Request, res: Response) => {
  const { userData, mergeImages }: Mergedata = req.body;
  console.log(`this is userData ${userData} and mergeImage${mergeImages}`);
  const agentdata = await AgentCalled({
    userData: String(userData),
    ImageUrl: mergeImages,
  });
  const agentMessage: agentPrompt = JSON.parse(
    agentdata["messages"].at(-1)?.content,
  );
  // console.log("this is agent:-", agentMessage);
  // console.log("this is agent type of:-", typeof agentMessage);
  const postImage = await PromptImage({
    Image_prompt: agentMessage.ImagePrompt,
    Negative_prompt: agentMessage.NegativePrompt,
    mergeImages: mergeImages,
    size: userData.SelectedPlatform,
  });
  console.log("this is postImage", postImage);
  res.status(200).json({
    message: "ok",
    userData: userData,
    mergeImages: mergeImages,
    PromptImage: postImage,
  });
});
export { generateImage, Addagent };
