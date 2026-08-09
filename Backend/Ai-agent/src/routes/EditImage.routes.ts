import { Router } from "express";
import { EditImage } from "../controllers/EditImage.controllers.ts";

const router = Router();

router.route("/EditImage").post(EditImage);
export default router;
