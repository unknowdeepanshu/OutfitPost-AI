import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { Card } from "../ui/card";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
function Footer() {
  const FooterLink = [
    { FooterText: "Features", url: "#" },
    { FooterText: "How It Works", url: "#" },
    { FooterText: "Templates", url: "#" },
    { FooterText: "Pricing", url: "#" },
    { FooterText: "FAQ", url: "#" },
  ];
  return (
    <>
      <div className="my-20 flex h-screen w-full flex-col">
        <div className="flex h-fit w-full flex-col gap-4 text-3xl md:flex-row md:gap-0">
          <div className="flex-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="/OutfitPost_AI.png"
                  className="h-8"
                  alt="outfitpost"
                />
                <span className="font-sans font-bold">
                  Oufit<span className="text-chart-2">Post Ai</span>
                </span>
              </div>
              <div>
                <p className="text-[1rem]">
                  AI powered fashion poster generator <br />
                  for brands, creators and marketers.
                </p>
              </div>
              <motion.div className="flex gap-3">
                <motion.span
                  whileHover={{
                    scale: [null, 1.1, 1.4],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Card className="items-center justify-center rounded-2xl p-3">
                    <IconBrandInstagram stroke={2} />
                  </Card>
                </motion.span>
                <motion.span
                  whileHover={{
                    scale: [null, 1.1, 1.4],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Card className="items-center justify-center rounded-2xl p-3">
                    <IconBrandFacebook stroke={2} />
                  </Card>
                </motion.span>
                <motion.span
                  whileHover={{
                    scale: [null, 1.1, 1.4],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Card className="items-center justify-center rounded-2xl p-3">
                    <IconBrandLinkedin stroke={2} />
                  </Card>
                </motion.span>
                <motion.span
                  whileHover={{
                    scale: [null, 1.1, 1.4],
                    transition: {
                      duration: 0.5,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Card className="items-center justify-center rounded-2xl p-3">
                    <IconBrandX stroke={2} />
                  </Card>
                </motion.span>
              </motion.div>
            </div>
          </div>
          <div className="h-full flex-1">
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="flex flex-col gap-4">
                <p className="text-[1rem]">Product</p>
                <ul className="flex flex-col justify-center gap-4 text-[1rem] opacity-85">
                  {FooterLink.map((Footer, index) => (
                    <li key={index}>
                      <a href={Footer.url}>{Footer.FooterText}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="flex h-full flex-col gap-4">
                  <div>
                    <p>Subscribe to our newsletter</p>
                  </div>
                  <div>
                    <p className="text-[1rem] opacity-80">
                      Get tips, updates and offers to grow your fashion brand
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      className="rounded-sm"
                      id="fieldgroup-email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <Button className="rounded-sm">
                      <IconArrowNarrowRight stroke={2} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex-1">
          <div className="border-foreground flex h-full items-end justify-center border-t p-4">
            <span>
              Copyright 2026,{" "}
              <span className="font-sans font-bold">OufitPostAi</span>, All
              Right Reserved
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
