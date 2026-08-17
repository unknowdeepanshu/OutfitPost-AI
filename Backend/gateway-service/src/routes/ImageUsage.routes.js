import { Router } from "express";
import {
  Download,
  Generated,
  GetDownloadAndGenerated,
} from "../controllers/ImageUsage.controller.js";

const router = Router();

router.get("/download", Download);
router.get("/generated", Generated);
router.get("/getdownloadandgenerated", GetDownloadAndGenerated);

// router.post("/generated", getMessages);

export default router;
