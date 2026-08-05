import { Card, CardFooter, CardHeader } from "@/components/ui/card";

function SupportedFashion() {
  const fashion: FashionCatgory[] = [
    {
      FashionUrl:
        "https://i.pinimg.com/1200x/23/aa/a8/23aaa8f418122928bba53aa77191ea25.jpg",
      FashionHeader: "clothes",
    },
    {
      FashionUrl:
        "https://i.pinimg.com/736x/a3/3c/a1/a33ca16abd7b44ef830521a5b1b4df23.jpg",
      FashionHeader: "Bags",
    },
    {
      FashionUrl:
        "https://i.pinimg.com/736x/48/90/2c/48902c6521377a5af74df2cc894f451d.jpg",
      FashionHeader: "Shoes",
    },
    {
      FashionUrl:
        "https://i.pinimg.com/1200x/e3/ce/74/e3ce74f905b579ab6361a14877814b2a.jpg",
      FashionHeader: "Hats",
    },
    {
      FashionUrl:
        "https://i.pinimg.com/736x/34/e8/1f/34e81fe03b762d801faf3f55a244c050.jpg",
      FashionHeader: "Scarves",
    },
  ];
  return (
    <>
      <div className="my-20 flex min-h-screen w-full flex-col">
        <div className="flex w-full flex-col text-center text-3xl">
          <b>Supported Category</b>
        </div>
        <div className="mt-4 grid h-full w-full grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2">
          {fashion.map((e, index) => (
            <FashionCatgory
              key={index}
              FashionUrl={e.FashionUrl}
              FashionHeader={e.FashionHeader}
            />
          ))}
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
      <Card className="h-full gap-0 bg-transparent">
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
