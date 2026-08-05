import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function Faq() {
  return (
    <>
      <div className="flex min-h-screen w-full justify-center">
        <div className="flex w-full flex-col justify-center">
          <h1 className="my-4 w-full text-center text-4xl">
            Frequently Asked Questions{" "}
          </h1>
          <AccordionDemo />
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
    {
      value: "creditsWork",
      Question: "How do credits work?",
      Answer:
        "Each AI generation uses credits. The number of credits consumed depends on the generation features you use. Your remaining credits are displayed in your dashboard.",
    },
    {
      value: "subscription",
      Question: "Can I cancel my subscription anytime?",
      Answer:
        "Yes. You can cancel your subscription at any time. Your plan remains active until the end of the current billing period, and no further charges will be made afterward.",
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
