import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { editImages } from "../controllers/edit.controller.js";

const router = Router();

router.post("/editImage", editImages);

export default router;
