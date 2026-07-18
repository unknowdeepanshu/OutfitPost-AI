import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// let ThreadIdStore = ["chat-1"];

app.get("/", (req: Request, res: Response) => {
  res.json({ ji: "cjec", duck: "doe" });
});
app.get("/test", (req: Request, res: Response) => {
  res.send("<h1> hi buddy</h1>");
});

app.listen(3040, () => {
  console.log("Server is running on http://localhost:3040");
});
