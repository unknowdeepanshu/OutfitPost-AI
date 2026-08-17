import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  UploadFashionImage,
  UploadModelImage,
} from "../controllers/Image.controller.js";

const router = Router();

router.post(
  "/UploadFashionImage",
  upload.single("FashionImage"),
  UploadFashionImage,
);

router.post("/UploadModelImage", upload.single("ModelImage"), UploadModelImage);

export default router;
