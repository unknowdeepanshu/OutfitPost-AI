import type React from "react";
import { Badge } from "../ui/badge";
import {
  IconCloudUpload,
  IconImageGeneration,
  IconDownloadFilled,
  IconSparkles,
} from "@tabler/icons-react";
export function HowItWorked() {
  const cardDeatils: process[] = [
    {
      ImageUrl: IconCloudUpload,
      Heading: "Upload Product",
      Description: "Uplaod model image and fashion product image",
      ProcessnNumber: 1,
    },
    {
      ImageUrl: IconSparkles,
      Heading: "AI Analyzes your product",
      Description: "Our AI understands fabaric, color,style &category",
      ProcessnNumber: 2,
    },
    {
      ImageUrl: IconImageGeneration,
      Heading: "Generate Marketing Poster",
      Description: "AI creates stunning posters optimized for social media",
      ProcessnNumber: 3,
    },
    {
      ImageUrl: IconDownloadFilled,
      Heading: "Download & Share",
      Description: "Download in HD and share anywhere",
      ProcessnNumber: 4,
    },
  ];
  return (
    <>
      <div className="my-2 flex h-screen w-full flex-col">
        <div className="flex w-full justify-center font-mono text-3xl">
          How It Works
        </div>
        <div className="my-6 flex h-full flex-col items-center justify-center gap-2 p-3 md:flex-row">
          {" "}
          {cardDeatils.map((e, index) => (
            <Process
              key={index}
              ImageUrl={e.ImageUrl}
              Heading={e.Heading}
              Description={e.Description}
              ProcessnNumber={e.ProcessnNumber}
            />
          ))}
        </div>
      </div>
    </>
  );
}

type process = {
  ImageUrl: React.ElementType;
  Heading: string;
  Description: string;
  ProcessnNumber: number;
};
function Process({ ImageUrl, Heading, Description, ProcessnNumber }: process) {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <Badge className="absolute -top-1 right-0 z-10">
            {ProcessnNumber}
          </Badge>
          <div className="bg-chart-2 absolute z-2 flex size-10 items-center justify-center rounded-4xl">
            <ImageUrl color="white" />
          </div>
          <div className="border-foreground relative z-1 flex size-20 items-center justify-center rounded-[50%] border opacity-50"></div>
        </div>
        <div className="mt-2 flex h-fit flex-col items-center justify-center text-center">
          <h5>{Heading}</h5>
          <p className="mt-3 text-[13px] opacity-50">{Description} </p>
        </div>
      </div>
    </>
  );
}
