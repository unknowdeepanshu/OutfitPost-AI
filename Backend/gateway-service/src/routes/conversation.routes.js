import { Router } from "express";

import {
  addConversation,
  deleteMessage,
  listMessage,
} from "../controllers/conversation.controller.js";

import messageRouter from "./message.routes.js";
const router = Router();

router.post("/create", addConversation);
router.post("/delete", deleteMessage);
router.get("/listMessage", listMessage);

export default router;
