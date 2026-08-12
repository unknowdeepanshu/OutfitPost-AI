import { Router } from "express";

import {
    createMessage,
    getMessages,
    processMessage
} from "../controllers/message.controller.js";

const router = Router({ mergeParams: true });

router.post("/", createMessage);

router.get("/", getMessages);

router.post("/:messageId/process", processMessage);

export default router;