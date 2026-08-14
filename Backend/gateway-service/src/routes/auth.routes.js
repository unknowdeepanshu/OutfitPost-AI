import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { UserCreated } from "../controllers/auth.controller.js";
import express from "express";
const router = Router();

router.post(
  "/createduserwebhook",
  express.raw({ type: "application/json" }),
  UserCreated,
);

export default router;
