import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", ImageGenerated: 222, ImageDownload: 150 },
  { date: "2024-04-02", ImageGenerated: 97, ImageDownload: 180 },
  { date: "2024-04-03", ImageGenerated: 167, ImageDownload: 120 },
  { date: "2024-04-04", ImageGenerated: 242, ImageDownload: 260 },
  { date: "2024-04-05", ImageGenerated: 373, ImageDownload: 290 },
  { date: "2024-04-06", ImageGenerated: 301, ImageDownload: 340 },
  { date: "2024-04-07", ImageGenerated: 245, ImageDownload: 180 },
  { date: "2024-04-08", ImageGenerated: 409, ImageDownload: 320 },
  { date: "2024-04-09", ImageGenerated: 59, ImageDownload: 110 },
  { date: "2024-04-10", ImageGenerated: 261, ImageDownload: 190 },
  { date: "2024-04-11", ImageGenerated: 327, ImageDownload: 350 },
  { date: "2024-04-12", ImageGenerated: 292, ImageDownload: 210 },
  { date: "2024-04-13", ImageGenerated: 342, ImageDownload: 380 },
  { date: "2024-04-14", ImageGenerated: 137, ImageDownload: 220 },
  { date: "2024-04-15", ImageGenerated: 120, ImageDownload: 170 },
  { date: "2024-04-16", ImageGenerated: 138, ImageDownload: 190 },
  { date: "2024-04-17", ImageGenerated: 446, ImageDownload: 360 },
  { date: "2024-04-18", ImageGenerated: 364, ImageDownload: 410 },
  { date: "2024-04-19", ImageGenerated: 243, ImageDownload: 180 },
  { date: "2024-04-20", ImageGenerated: 89, ImageDownload: 150 },
  { date: "2024-04-21", ImageGenerated: 137, ImageDownload: 200 },
  { date: "2024-04-22", ImageGenerated: 224, ImageDownload: 170 },
  { date: "2024-04-23", ImageGenerated: 138, ImageDownload: 230 },
  { date: "2024-04-24", ImageGenerated: 387, ImageDownload: 290 },
  { date: "2024-04-25", ImageGenerated: 215, ImageDownload: 250 },
  { date: "2024-04-26", ImageGenerated: 75, ImageDownload: 130 },
  { date: "2024-04-27", ImageGenerated: 383, ImageDownload: 420 },
  { date: "2024-04-28", ImageGenerated: 122, ImageDownload: 180 },
  { date: "2024-04-29", ImageGenerated: 315, ImageDownload: 240 },
  { date: "2024-04-30", ImageGenerated: 454, ImageDownload: 380 },
  { date: "2024-05-01", ImageGenerated: 165, ImageDownload: 220 },
  { date: "2024-05-02", ImageGenerated: 293, ImageDownload: 310 },
  { date: "2024-05-03", ImageGenerated: 247, ImageDownload: 190 },
  { date: "2024-05-04", ImageGenerated: 385, ImageDownload: 420 },
  { date: "2024-05-05", ImageGenerated: 481, ImageDownload: 390 },
  { date: "2024-05-06", ImageGenerated: 498, ImageDownload: 520 },
  { date: "2024-05-07", ImageGenerated: 388, ImageDownload: 300 },
  { date: "2024-05-08", ImageGenerated: 149, ImageDownload: 210 },
  { date: "2024-05-09", ImageGenerated: 227, ImageDownload: 180 },
  { date: "2024-05-10", ImageGenerated: 293, ImageDownload: 330 },
  { date: "2024-05-11", ImageGenerated: 335, ImageDownload: 270 },
  { date: "2024-05-12", ImageGenerated: 197, ImageDownload: 240 },
  { date: "2024-05-13", ImageGenerated: 197, ImageDownload: 160 },
  { date: "2024-05-14", ImageGenerated: 448, ImageDownload: 490 },
  { date: "2024-05-15", ImageGenerated: 473, ImageDownload: 380 },
  { date: "2024-05-16", ImageGenerated: 338, ImageDownload: 400 },
  { date: "2024-05-17", ImageGenerated: 499, ImageDownload: 420 },
  { date: "2024-05-18", ImageGenerated: 315, ImageDownload: 350 },
  { date: "2024-05-19", ImageGenerated: 235, ImageDownload: 180 },
  { date: "2024-05-20", ImageGenerated: 177, ImageDownload: 230 },
  { date: "2024-05-21", ImageGenerated: 82, ImageDownload: 140 },
  { date: "2024-05-22", ImageGenerated: 81, ImageDownload: 120 },
  { date: "2024-05-23", ImageGenerated: 252, ImageDownload: 290 },
  { date: "2024-05-24", ImageGenerated: 294, ImageDownload: 220 },
  { date: "2024-05-25", ImageGenerated: 201, ImageDownload: 250 },
  { date: "2024-05-26", ImageGenerated: 213, ImageDownload: 170 },
  { date: "2024-05-27", ImageGenerated: 420, ImageDownload: 460 },
  { date: "2024-05-28", ImageGenerated: 233, ImageDownload: 190 },
  { date: "2024-05-29", ImageGenerated: 78, ImageDownload: 130 },
  { date: "2024-05-30", ImageGenerated: 340, ImageDownload: 280 },
  { date: "2024-05-31", ImageGenerated: 178, ImageDownload: 230 },
  { date: "2024-06-01", ImageGenerated: 178, ImageDownload: 200 },
  { date: "2024-06-02", ImageGenerated: 470, ImageDownload: 410 },
  { date: "2024-06-03", ImageGenerated: 103, ImageDownload: 160 },
  { date: "2024-06-04", ImageGenerated: 439, ImageDownload: 380 },
  { date: "2024-06-05", ImageGenerated: 88, ImageDownload: 140 },
  { date: "2024-06-06", ImageGenerated: 294, ImageDownload: 250 },
  { date: "2024-06-07", ImageGenerated: 323, ImageDownload: 370 },
  { date: "2024-06-08", ImageGenerated: 385, ImageDownload: 320 },
  { date: "2024-06-09", ImageGenerated: 438, ImageDownload: 480 },
  { date: "2024-06-10", ImageGenerated: 155, ImageDownload: 200 },
  { date: "2024-06-11", ImageGenerated: 92, ImageDownload: 150 },
  { date: "2024-06-12", ImageGenerated: 492, ImageDownload: 420 },
  { date: "2024-06-13", ImageGenerated: 81, ImageDownload: 130 },
  { date: "2024-06-14", ImageGenerated: 426, ImageDownload: 380 },
  { date: "2024-06-15", ImageGenerated: 307, ImageDownload: 350 },
  { date: "2024-06-16", ImageGenerated: 371, ImageDownload: 310 },
  { date: "2024-06-17", ImageGenerated: 475, ImageDownload: 520 },
  { date: "2024-06-18", ImageGenerated: 107, ImageDownload: 170 },
  { date: "2024-06-19", ImageGenerated: 341, ImageDownload: 290 },
  { date: "2024-06-20", ImageGenerated: 408, ImageDownload: 450 },
  { date: "2024-06-21", ImageGenerated: 169, ImageDownload: 210 },
  { date: "2024-06-22", ImageGenerated: 317, ImageDownload: 270 },
  { date: "2024-06-23", ImageGenerated: 480, ImageDownload: 530 },
  { date: "2024-06-24", ImageGenerated: 132, ImageDownload: 180 },
  { date: "2024-06-25", ImageGenerated: 141, ImageDownload: 190 },
  { date: "2024-06-26", ImageGenerated: 434, ImageDownload: 380 },
  { date: "2024-06-27", ImageGenerated: 448, ImageDownload: 490 },
  { date: "2024-06-28", ImageGenerated: 149, ImageDownload: 200 },
  { date: "2024-06-29", ImageGenerated: 103, ImageDownload: 160 },
  { date: "2024-06-30", ImageGenerated: 446, ImageDownload: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  ImageGenerated: {
    label: "ImageGenerated",
    color: "#8ec5ff",
  },
  ImageDownload: {
    label: "ImageDownload",
    color: "#2b7fff",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillImageGenerated"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-ImageGenerated)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ImageGenerated)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillImageDownload"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-ImageDownload)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ImageDownload)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="ImageDownload"
              type="natural"
              fill="url(#fillImageDownload)"
              stroke="var(--color-ImageDownload)"
              stackId="a"
            />
            <Area
              dataKey="ImageGenerated"
              type="natural"
              fill="url(#fillImageGenerated)"
              stroke="var(--color-ImageGenerated)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
