import { Show, SignUpButton } from "@clerk/react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-fit flex-col justify-center text-center">
            <p className="text-3xl md:line-clamp-2 md:text-4xl lg:text-6xl">
              <b>
                Create Stunning
                <br />
                <span className="text-chart-2">Fashion Posters</span>
                &nbsp;with AI
              </b>
            </p>
            <p className="mt-1 line-clamp-2 text-[10px] opacity-80 md:text-[12px] lg:text-[20px]">
              Upload your fashion produt, Customize the style, <br /> and
              generate premium scoial media posters in seconds
            </p>
            <div className="mt-2 flex h-full items-center justify-center gap-2">
              <Button
                className="flex h-6 rounded-none md:h-8 lg:h-10"
                variant="default"
              >
                <Show when="signed-out">
                  <SignUpButton>
                    <span className="text-[10px] md:text-[12px] lg:text-[15px]">
                      Get started
                    </span>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link to={"/dashboard"}>Get started</Link>
                </Show>
              </Button>
              <Button
                className="flex h-6 rounded-none md:h-8 lg:h-10"
                variant="outline"
              >
                <span className="text-[10px] md:text-[12px] lg:text-[15px]">
                  Watch Demo
                </span>
              </Button>
            </div>
          </div>
          <div className="h-full w-full rounded-2xl">
            <Browser />
          </div>
          <iframe
            src="https://my.spline.design/untitled-RGF6McIMoiNb9dKtaQ2o14tf-7pv/"
            frameBorder={0}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </>
  );
}
function Browser() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[7px] bg-neutral-300 shadow-[5px_5px_10px_rgba(31,31,31,0.25)]">
      {/* Tabs */}
      <div className="flex h-10 items-end justify-between pl-5">
        <div className="relative flex h-[34px] w-[100px] items-start justify-between rounded-t-[7px] bg-[#515151] px-2 py-1">
          <span className="text-[10px] text-white">Uiverse</span>

          <button className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white transition hover:bg-[#5d5d5d]">
            ✕
          </button>

          {/* Right Curve */}
          <div className="absolute top-0 right-0 h-6 w-5 translate-x-full overflow-hidden bg-[#515151]">
            <div className="h-full w-full rounded-bl-[7px] bg-[#353535]" />
          </div>

          {/* Left Curve */}
          <div className="absolute top-0 left-0 h-6 w-5 -translate-x-full overflow-hidden bg-[#515151]">
            <div className="h-full w-full rounded-br-[7px] bg-[#353535]" />
          </div>
        </div>

        {/* Window Controls */}
        <div className="flex">
          <button className="mb-[10px] h-[30px] w-[30px] text-white transition hover:bg-[#515151c8]">
            −
          </button>

          <button className="mb-[10px] h-[30px] w-[30px] text-white transition hover:bg-[#515151c8]">
            □
          </button>

          <button className="mb-[10px] h-[30px] w-[30px] text-white transition hover:bg-red-500">
            ✕
          </button>
        </div>
      </div>

      {/* Browser Header */}
      <div className="absolute top-[30px] flex h-10 w-full items-center gap-1 rounded-t-[7px] bg-[#515151] p-[7px]">
        <button className="flex h-[25px] w-[27px] items-center justify-center rounded-full text-white transition hover:bg-[#5d5d5d]">
          ←
        </button>

        <button
          disabled
          className="flex h-[25px] w-[27px] items-center justify-center rounded-full text-white opacity-40"
        >
          →
        </button>

        <div className="relative flex-1">
          <input
            defaultValue="uiverse.io"
            placeholder="Search Google or type URL"
            className="h-[26px] w-full rounded-full border-2 border-transparent bg-[#3b3b3b] px-4 pr-10 text-sm text-white transition outline-none placeholder:text-white hover:bg-[#5d5d5d] focus:border-sky-300 focus:bg-[#3b3b3b]"
          />

          <button className="absolute top-1/2 right-2 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center text-[15px] text-white opacity-70">
            ✰
          </button>
        </div>

        <button className="flex h-[25px] w-[27px] items-center justify-center rounded-full text-white transition hover:bg-[#5d5d5d]">
          ⋮
        </button>
      </div>
    </div>
  );
}
