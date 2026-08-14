import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { syncCurrentUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/sync", syncCurrentUser);

export default router;
