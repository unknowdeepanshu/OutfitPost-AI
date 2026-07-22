import dotenv from "dotenv";
import {
  StateSchema,
  MessagesValue,
  type GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

import { fileURLToPath } from "url";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "langchain";
import { ImageTotext, TextToImage, Validation } from "./prompt.ts";

dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

const modelImage = new ChatGroq({
  model: "qwen/qwen3.6-27b",
});
const modelText = new ChatGroq({
  model: "openai/gpt-oss-120b",
});

const State = new StateSchema({
  messages: MessagesValue,
});

// this is for vison model get image data
const vision: GraphNode<typeof State> = async (state) => {
  console.log("Vison runing");
  const user = state.messages[0]?.content[0]?.text;
  const ImageUrl: any = state.messages[0]?.content[1]?.url;
  const messgae = ImageTotext({ userPromt: user, imageUrl: ImageUrl });
  const Response = await modelImage.invoke(messgae);
  return { messages: Response.content };
};
// this is for make post for social media
const director: GraphNode<typeof State> = async (state) => {
  console.log("Director runing");
  const user = state.messages[1]?.content;
  const messgae = TextToImage({ userPromt: String(user) });
  const Response = await modelText.invoke(messgae);
  return { messages: Response.content };
};
// check for the Validation of character like less than 800 character
const valdiationCharacter: GraphNode<typeof State> = async (state) => {
  console.log("Validation checker");
  const user = state.messages[2]?.content;
  const messgae = Validation({ userPromt: String(user) });
  const Response = await modelText.invoke(messgae);
  return { messages: Response.content };
};
// this is
const checkCharacterCount = async (state: any) => {
  // Get text from the last message
  const lastMessage = state.messages.at(-1);
  console.log("this is lastmessage", lastMessage);
  const text = (await JSON.parse(lastMessage?.content)) || "";
  console.log("this is text:-", text);
  const countCharacters = text["ImagePrompt"].trim().length;
  console.log("lenght:-", countCharacters);
  if (countCharacters > 800) {
    return "validationFailNode";
  }
  return "continueNode";
};
const graph = new StateGraph(State)
  .addNode("VisonTotext", vision)
  .addNode("Director", director)
  .addNode("Validation", valdiationCharacter)

  .addEdge(START, "VisonTotext")
  .addEdge("VisonTotext", "Director")
  .addEdge("Director", "Validation")
  .addConditionalEdges("Validation", checkCharacterCount, {
    continueNode: END,
    validationFailNode: "Validation",
  })
  .compile();

interface AgentCalled {
  userData: string;
  ImageUrl: string;
}
async function AgentCalled({ userData, ImageUrl }: AgentCalled) {
  const humanMessage = {
    messages: [
      new HumanMessage({
        content: [
          {
            type: "text",
            text: `${userData}`,
          },
          {
            type: "image",
            url: `${ImageUrl}`,
          },
        ],
      }),
    ],
  };

  const response = await graph.invoke(humanMessage);

  return response;
}
export { AgentCalled };
