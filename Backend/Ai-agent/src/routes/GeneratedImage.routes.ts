import { Router } from "express";

import type { Request, Response } from "express";
import {
  generateImage,
  Addagent,
} from "../controllers/GeneratedImage.controllers.ts";
const router = Router();
router.get("/background", (_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});

router.post("/getImage", generateImage);

router.post("/addAgent", Addagent);
export default router;
