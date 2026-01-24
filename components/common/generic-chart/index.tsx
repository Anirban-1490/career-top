import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { PropsWithChildren } from "react";
import { AreaChart, XAxis, YAxis } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-neon-red)",
  },
} satisfies ChartConfig;

interface IGenericChartProps {
  data: any;
  ChartType: React.JSXElementConstructor<CategoricalChartProps>;
  chartTypeProps?: CategoricalChartProps;
  chartContainerProps?: React.ComponentProps<"div">;
  customChartConfig?: (prevConfig: ChartConfig) => ChartConfig;
}

export function GenericChart({
  data,
  ChartType,
  children,
  customChartConfig,
  chartContainerProps,
  chartTypeProps,
}: IGenericChartProps & PropsWithChildren) {
  return (
    <ChartContainer
      {...chartContainerProps}
      config={customChartConfig?.(chartConfig) || chartConfig}
    >
      <ChartType
        {...chartTypeProps}
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          ...chartTypeProps?.margin,
        }}
      >
        {children}
      </ChartType>
    </ChartContainer>
  );
}
