import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const agentInstance = axios.create({
  baseURL: `${process.env.AGENT_SERVER}`,
});
function run() {
  console.log(process.env.AGENT_SERVER);
}
run();
export { agentInstance };
