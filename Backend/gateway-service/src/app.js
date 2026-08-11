import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import conversationRouter from "./routes/conversation.routes.js";

const app = express();

// -------------------------
// Global middleware
// -------------------------

app.use(
    cors({
        origin: process.env.CORS_Origin,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// -------------------------
// Clerk middleware
// -------------------------

// Must come before routes that need authentication
app.use(clerkMiddleware());

// -------------------------
// Health check
// -------------------------

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

// -------------------------
// API routes
// -------------------------

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/conversations", conversationRouter);

// -------------------------
// Global error handler
// -------------------------

app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});

export { app };