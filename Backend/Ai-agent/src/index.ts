import { app } from "./app.ts";
import dotenv from "dotenv";
dotenv.config({
  path: "./src/.env",
});
app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
