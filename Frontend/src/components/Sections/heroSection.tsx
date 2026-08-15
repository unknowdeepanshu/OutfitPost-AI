import { Show, SignUpButton } from "@clerk/react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <>
      <div className="mt-20 flex min-h-screen flex-col">
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
            <div className="mt-2 flex h-fit items-center justify-center gap-2">
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
          <div className="mt-4 w-full flex-1 rounded-2xl"></div>
        </div>
        <div className="flex h-200">
          <Browser />
        </div>
      </div>
    </>
  );
}
function Browser() {
  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-[7px] shadow-[5px_5px_10px_rgba(31,31,31,0.25)]">
      <div className="flex h-10 items-end justify-between bg-[#2c2c3e]">
        <div className="flex h-8 items-center bg-[#2c2c3e] px-4 text-sm text-zinc-300">
          <div className="ml-auto flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] transition hover:scale-110" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] transition hover:scale-110" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f] transition hover:scale-110" />
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-1 flex-col rounded-b-[10px] border-x border-b border-[#2c2c3e]">
        <iframe
          src="https://my.spline.design/untitled-RGF6McIMoiNb9dKtaQ2o14tf-7pv/"
          className="h-full w-full"
          frameBorder={0}
        ></iframe>
      </div>
    </div>
  );
}
