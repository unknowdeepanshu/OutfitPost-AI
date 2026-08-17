import { Router } from "express";

import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";

const router = Router();

router.post("/create", createMessage);

router.post("/messageid", getMessages);

export default router;
