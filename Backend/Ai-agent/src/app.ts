import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// let ThreadIdStore = ["chat-1"];

app.get("/api/backgroundReomove", (_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});

//import router
import imageGeneration from "./routes/GeneratedImage.routes.ts";
app.use("/api/v1/Imgae", imageGeneration);
export { app };
