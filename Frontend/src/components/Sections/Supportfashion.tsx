import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

function SupportedFashion() {
  const fashion: FashionCatgory[] = [
    {
      FashionUrl: "/clothes.webp",
      FashionHeader: "clothes",
    },
    {
      FashionUrl: "/bag.webp",
      FashionHeader: "Bags",
    },
    {
      FashionUrl: "/shoues.webp",
      FashionHeader: "Shoes",
    },
    {
      FashionUrl: "/Scarves.webp",
      FashionHeader: "Scarves",
    },
    {
      FashionUrl: "/Hat.webp",
      FashionHeader: "Hats",
    },
  ];
  return (
    <>
      <div className="my-20 flex h-screen w-full">
        <div className="mt-8 flex flex-col gap-2">
          <b className="text-3xl">Supported Category</b>
          <p>
            Explore a variety of fashion categories designed to bring your
            <br />
            products to life. Create eye-catching visuals for clothes, bags,
            <br />
            shoes, scarves, and hats, and showcase your collection with a fresh,
            <br />
            creative look.
          </p>
        </div>
        <div className="mt-8 flex w-full flex-1 justify-center px-4">
          <Carousel items={fashion} />
        </div>
      </div>
    </>
  );
}

export default SupportedFashion;

type FashionCatgory = {
  FashionUrl: string;
  FashionHeader: string;
};

function FashionCatgory({ FashionUrl }: FashionCatgory) {
  return (
    <>
      <Card className="h-56 w-full gap-0 bg-transparent md:h-80">
        <div className="h-[70%] md:h-[80%]">
          <img src={FashionUrl} className="h-full w-full rounded-t-2xl" />
        </div>
      </Card>
    </>
  );
}

function Carousel({ items }: { items: FashionCatgory[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full max-w-150">
      <div className="mb-4 flex items-center justify-between gap-1">
        <Button onClick={goPrevious} variant="ghost">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <div className="text-foreground text-center text-sm font-medium tracking-[0.3em] uppercase">
            {items[activeIndex].FashionHeader}
          </div>

          <div className="w-full">
            <div className="overflow-hidden rounded-[2rem] border p-3 md:p-5">
              <motion.div
                key={activeIndex}
                className="touch-pan-y"
                initial={{ opacity: 0, x: 80, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) {
                    goNext();
                  }
                  if (info.offset.x > 60) {
                    goPrevious();
                  }
                }}
              >
                <FashionCatgory
                  FashionUrl={items[activeIndex].FashionUrl}
                  FashionHeader={items[activeIndex].FashionHeader}
                />
              </motion.div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {items.map((item, index) => (
                <button
                  type="button"
                  key={item.FashionHeader}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-foreground w-8"
                      : "bg-foreground w-2.5"
                  }`}
                  aria-label={`Go to ${item.FashionHeader}`}
                />
              ))}
            </div>
          </div>
        </div>
        <Button onClick={goNext} variant="ghost">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
