import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Show, SignUpButton } from "@clerk/react";
import { Link } from "react-router";
function Faq() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-center">
        <div className="flex w-full flex-col justify-center">
          <h1 className="my-2 w-full text-center text-4xl">
            Frequently Asked Questions{" "}
          </h1>
          <AccordionDemo />
        </div>
        <div className="mt-40 flex w-full flex-col items-center justify-center">
          <div className="flex w-fit flex-col justify-center gap-3 text-center">
            <p className="text-3xl md:line-clamp-2 md:text-4xl lg:text-4xl">
              <b>
                Make Your &nbsp;
                <span className="text-chart-2">
                  Fashion
                  <br /> Posters
                </span>
                &nbsp;Stand Out
              </b>
            </p>
            <p className="mt-1 line-clamp-2 text-[10px] opacity-80 md:text-[12px] lg:text-[15px]">
              Create professional-looking fashion posters in seconds. Give
              <br></br>
              your products a fresh look and share them with the world.
            </p>
            <div className="mt-2 flex h-fit items-center justify-center gap-2">
              <Button
                className="flex h-6 rounded-none md:h-8 lg:h-10"
                variant="default"
              >
                <Show when="signed-out">
                  <SignUpButton>
                    <span className="text-[10px] md:text-[12px] lg:text-[15px]">
                      Start Creating
                    </span>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link to={"/dashboard"}>Start Creating</Link>
                </Show>
              </Button>
            </div>
          </div>
          <div className="mt-4 w-full flex-1 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}

export default Faq;

type Faq = {
  value: string;
  Question: string;
  Answer: string;
};
function AccordionDemo() {
  const Faq: Faq[] = [
    {
      value: "Work",
      Question: "How does OutfitPost AI work?",
      Answer:
        "Upload your fashion product and model images, choose a category and platform, then our AI creates a professional marketing poster ready for social media.",
    },
    {
      value: "ImageSupported",
      Question: "Which image formats are supported?",
      Answer:
        "OutfitPost AI supports JPG, JPEG, PNG, and WebP image formats for both product and model uploads.",
    },
    {
      value: "ImageEdit",
      Question: "Can I edit the generated posters?",
      Answer:
        "Yes. After generation, you can download your poster or make additional edits before exporting the final version.",
    },
  ];

  return (
    <Accordion defaultValue={["OutfitPostAi"]}>
      {Faq.map((e, index) => (
        <AccordionItem key={index} value={e.value}>
          <AccordionTrigger>{e.Question}</AccordionTrigger>
          <AccordionContent>{e.Answer} </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
