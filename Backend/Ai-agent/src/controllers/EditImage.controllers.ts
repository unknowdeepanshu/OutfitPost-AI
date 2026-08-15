import type { EditImageData } from "./../type/EditImage.ts";
import { asyncHandler } from "../Utilits/asyncHandler.ts";
import type { Request, Response } from "express";
import { selectedEditImageType } from "../youCamApi/ImageEditApi/index.ts";

const EditImage = asyncHandler(async (req: Request, res: Response) => {
  const ImageDatas: EditImageData = req.body;
  if (!ImageDatas.EditType) {
    return res.status(401).json({
      EditType: "not selected",
    });
  }
  const EditedImage = await selectedEditImageType(ImageDatas);
  res.status(200).json({
    ImageDatas,
    EditedImage,
  });
});

export { EditImage };
