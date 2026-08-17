import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUsage } from "@/services/imageUsage";
import { useEffect, useState } from "react";

export function SectionCards() {
  const [downloadNumber, setDownloadNumber] = useState(0);
  const [generatedNumber, setGeneratedNumber] = useState(0);

  useEffect(() => {
    const getUsage = async () => {
      try {
        const response = await getImageUsage();

        const { donwloadNumber, generatedNumber } = response.message;
        console.log("donw", donwloadNumber, "gene", generatedNumber);
        setDownloadNumber(donwloadNumber ?? 0);
        setGeneratedNumber(generatedNumber ?? 0);
      } catch (error) {
        console.error("Failed to get image usage:", error);
      }
    };

    getUsage();
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-linear-to- grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Image Downloaded</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {downloadNumber.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Image Generated</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {generatedNumber.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
