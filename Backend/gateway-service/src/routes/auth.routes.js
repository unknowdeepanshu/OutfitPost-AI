import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { UserCreated, DeleteUser } from "../controllers/auth.controller.js";
import express from "express";
const router = Router();

router.post(
  "/createduserwebhook",
  express.raw({ type: "application/json" }),
  UserCreated,
);
router.get("/deletedUser", DeleteUser);

export default router;
