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

const vision: GraphNode<typeof State> = async (state) => {
  console.log("Vison runing");
  const user = state.messages[0]?.content[0]?.text;
  const ImageUrl: any = state.messages[0]?.content[1]?.url;
  const messgae = ImageTotext({ userPromt: user, imageUrl: ImageUrl });
  const Response = await modelImage.invoke(messgae);
  return { messages: Response.content };
};

const director: GraphNode<typeof State> = async (state) => {
  console.log("Director runing");
  const user = state.messages[1]?.content;
  const messgae = TextToImage({ userPromt: user });
  const Response = await modelText.invoke(messgae);
  return { messages: Response.content };
};
const valdiationWords: GraphNode<typeof State> = async (state) => {
  console.log("Validation checker");
  const user = state.messages[2]?.content;
  const messgae = Validation({ userPromt: user });
  const Response = await modelText.invoke(messgae);
  return { messages: Response.content };
};
const checkWordCount = async (state: any) => {
  // Get text from the last message
  const lastMessage = state.messages.at(-1);
  const text = (await JSON.parse(lastMessage?.content)) || "";
  const countCharacters = text["Image prompt"].trim().length;
  console.log("lenght:-", countCharacters);
  if (countCharacters > 800) {
    return "validationFailNode";
  }
  return "continueNode";
};
const graph = new StateGraph(State)
  .addNode("VisonTotext", vision)
  .addNode("Director", director)
  .addNode("Validation", valdiationWords)

  .addEdge(START, "VisonTotext")
  .addEdge("VisonTotext", "Director")
  .addEdge("Director", "Validation")
  .addConditionalEdges("Validation", checkWordCount, {
    continueNode: END,
    validationFailNode: "Validation",
  })
  .compile();
const humanMessage = {
  messages: [
    new HumanMessage({
      content: [
        {
          type: "text",
          text: `{
  SelectedCatgory: "cloths";
  SelectedPlatform: " Instagram Story (9:16)";
  FashionImage: { url: " ", AlBackgroundRemoval: false, AlEnhance: false },
  ModelImage: { url: " ", AlBackgroundRemoval: false, AlEnhance: false },
  Description: " ",
  Textinclude: false,
};
`,
        },
        {
          type: "image",
          url: `https://images.pexels.com/photos/38642209/pexels-photo-38642209.jpeg?_gl=1*1nrpvti*_gcl_au*MTkyODU1ODYzMi4xNzgzODY2Mjgx*_ga*MTYxMTk3ODA2MC4xNzgxOTQ4MDMz*_ga_8JE65Q40S6*czE3ODQ0Nzg3NjIkbzM0JGcxJHQxNzg0NDc5MDgzJGozOCRsMCRoMA..`,
        },
      ],
    }),
  ],
};

const response = await graph.invoke(humanMessage);

console.log(response);
