import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

const instance = axios.create({
  baseURL: `${process.env.YOU_CAM_URL}`,
  headers: { Authorization: `Bearer ${process.env.YOU_CAM_API}` },
});
const AddAgentImage = axios.create({
  baseURL: `${process.env.ADD_AGENT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

function run() {
  console.log(`Bearer ${process.env.YOU_CAM_API}`);
}
run();
export { instance, AddAgentImage };
