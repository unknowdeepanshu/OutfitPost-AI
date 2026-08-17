import dotenv from "dotenv";
import connectDatabase from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed !!!", error);
    process.exit(1);
  });
