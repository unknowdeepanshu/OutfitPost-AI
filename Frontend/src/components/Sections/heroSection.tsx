import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full items-center justify-center">
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
              <Show when="signed-out">
                <Button
                  className="flex h-6 rounded-none md:h-8 lg:h-10"
                  variant="default"
                >
                  <SignUpButton>
                    <span className="text-[10px] md:text-[12px] lg:text-[15px]">
                      Get started
                    </span>
                  </SignUpButton>
                </Button>
                <Button
                  className="flex h-6 rounded-none md:h-8 lg:h-10"
                  variant="outline"
                >
                  <span className="text-[10px] md:text-[12px] lg:text-[15px]">
                    Watch Demo
                  </span>
                </Button>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
