import { Router } from "express";

import type { Request, Response } from "express";
import {
  generateImage,
  Addagent,
} from "../controllers/GeneratedImage.controllers.ts";
const router = Router();
router.route("/background").get((_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});

router.route("/getImage").post(generateImage);

router.route("/addAgent").post(Addagent);
export default router;
