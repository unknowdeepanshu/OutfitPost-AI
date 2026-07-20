import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import type { Request, Response } from "express";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// let ThreadIdStore = ["chat-1"];

app.get("/", (_req: Request, res: Response) => {
  res.json({ ji: "cjec", duck: "doe" });
});
app.get("/test", (_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});
app.get("/api/enhanceImage", (_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});

app.get("/api/backgroundReomove", (_req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});
app.listen(3040, () => {
  console.log("Server is running on http://localhost:3040");
});
