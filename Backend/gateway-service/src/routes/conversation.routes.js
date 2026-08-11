import { Router } from "express";

import {
    createConversation,
    getConversations,
    getConversationById,
    deleteConversation,
    updateConversation
} from "../controllers/conversation.controller.js";

import messageRouter from "./message.routes.js";
const router = Router();

router.post("/", createConversation );
router.get("/", getConversations );
router.get("/:conversationId", getConversationById );
router.delete("/:conversationId", deleteConversation );
router.put("/:conversationId", updateConversation );
router.use("/:conversationId/messages", messageRouter);

export default router;