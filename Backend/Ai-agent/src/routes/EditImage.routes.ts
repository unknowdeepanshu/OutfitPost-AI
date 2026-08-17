import { Router } from "express";
import { EditImage } from "../controllers/EditImage.controllers.ts";

const router = Router();

router.post("/EditImage", EditImage);
export default router;
