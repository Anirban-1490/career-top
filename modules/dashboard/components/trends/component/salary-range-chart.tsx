import { GenericChart } from "@/components/common/generic-chart";

import { AITrendsType } from "@/types/trends";

import { Area, Bar, BarChart, XAxis, YAxis } from "recharts";

export function SalaryRangeChart({
  data,
}: {
  data: AITrendsType["salaryRanges"];
}) {
  return (
    <GenericChart
      chartContainerProps={{ className: "h-[20rem] w-full" }}
      ChartType={BarChart}
      customChartConfig={(prevConfig) => {
        return {
          ...prevConfig,
          mobile: {
            label: "Mobile",
            color: "var(--accent-neon-red)",
          },
        };
      }}
      data={data}
    >
      <XAxis dataKey="role" tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis tickLine={false} axisLine={false} tickMargin={10} tickCount={6} />

      <Bar dataKey="min" fill="var(--color-mobile)" radius={4} />
      <Bar dataKey="max" fill="var(--color-desktop)" radius={4} />
    </GenericChart>
  );
}
