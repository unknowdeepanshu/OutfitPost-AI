import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

const instance = axios.create({
  baseURL: "https://yce-api-01.makeupar.com/s2s/v2.0/task",
  headers: { Authorization: `Bearer ${process.env.YOC_CAM_API}` },
});
function run() {
  console.log(`Bearer ${process.env.YOC_CAM_API}`);
}
run();
export { instance };
