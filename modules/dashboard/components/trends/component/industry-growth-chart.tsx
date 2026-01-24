import { GenericChart } from "@/components/common/generic-chart";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AITrendsType } from "@/types/trends";
import React from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

export function IndustryGrowthChart({
  data,
}: {
  data: AITrendsType["growthRate"];
}) {
  return (
    <GenericChart ChartType={AreaChart} data={data}>
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis tickLine={false} axisLine={false} tickMargin={10} tickCount={6} />

      <Area
        dataKey="rate"
        type="bump"
        fill="var(--color-desktop)"
        fillOpacity={0.4}
        stroke="var(--color-desktop)"
      />
    </GenericChart>
  );
}
