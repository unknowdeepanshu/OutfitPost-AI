import { Card, CardFooter, CardHeader } from "@/components/ui/card";

function SupportedFashion() {
  const fashion: FashionCatgory[] = [
    {
      FashionUrl: "clothes.webp",
      FashionHeader: "clothes",
    },
    {
      FashionUrl: "bag.webp",
      FashionHeader: "Bags",
    },
    {
      FashionUrl: "shoues.webp",
      FashionHeader: "Shoes",
    },
    {
      FashionUrl: "Scarves.webp",
      FashionHeader: "Scarves",
    },
    {
      FashionUrl: "Hat.webp",
      FashionHeader: "Hats",
    },
  ];
  return (
    <>
      <div className="my-20 flex min-h-screen w-full flex-col">
        <div className="flex w-full flex-col text-center text-3xl">
          <b>Supported Category</b>
        </div>
        <div className="mt-8 flex h-60 w-full flex-1 justify-center gap-12 md:h-80">
          <div className="flex h-full flex-wrap justify-center gap-3 md:justify-normal">
            {fashion.map((e, index) => (
              <FashionCatgory
                key={index}
                FashionUrl={e.FashionUrl}
                FashionHeader={e.FashionHeader}
              />
            ))}
          </div>
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

function FashionCatgory({ FashionUrl, FashionHeader }: FashionCatgory) {
  return (
    <>
      <Card className="h-56 w-40 gap-0 bg-transparent md:h-80 md:w-60">
        <div className="h-[70%] md:h-[80%]">
          <img src={FashionUrl} className="h-full w-full rounded-t-2xl" />
        </div>
        <CardFooter className="h-full">
          <CardHeader className="flex h-full w-full items-center justify-center text-2xl">
            <span className="my-auto flex h-full items-center justify-center">
              {FashionHeader}
            </span>
          </CardHeader>
        </CardFooter>
      </Card>
    </>
  );
}
