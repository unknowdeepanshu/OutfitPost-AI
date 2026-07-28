import { Router } from "express";
import { requireAuth } from "@clerk/express";

import {
    createConversation,
} from "../controllers/conversation.controller.js";

const router = Router();

router.post("/", requireAuth(), createConversation);

export default router;