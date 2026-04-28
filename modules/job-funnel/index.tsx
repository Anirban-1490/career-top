"use client";

import { ITrackerData, Tracker } from "@/types/tracker";
import { Chart, LinearScale } from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { useEffect, useRef } from "react";
import { getSankeyFlowForJobTracker } from "../dashboard/components/job-tracker/utils/get-sankey-flow";

import twColors from "tailwindcss/colors";

Chart.register(SankeyController, Flow, LinearScale);
const colors = {
  applied: "#f9e400",
  interviewing: "#ffae00",
  offered: "#F5004F",
  rejected: "#7c00fe",
};
type TypeColor = keyof typeof colors;
const getColor = (key: TypeColor) => colors[key];
export function JobFunnel({ data }: { data: ITrackerData }) {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);

  const applied = data.metadata.applied;
  const interviewing = data.metadata.interviewing;
  const rejected = data.metadata.rejected;
  const offer = data.metadata.offer;

  const getFlow = getSankeyFlowForJobTracker(data);

  useEffect(() => {
    if (!chartContainer.current) return;

    const chart = new Chart(chartContainer.current, {
      type: "sankey",
      data: {
        datasets: [
          {
            label: "My Job Funnel",
            data: [
              {
                from: "applied",
                to: "interviewing",
                flow: getFlow("interviewing"),
              },
              { from: "applied", to: "rejected", flow: getFlow("rejected") },

              { from: "interviewing", to: "offered", flow: getFlow("offer") },
            ],
            colorFrom: (c) =>
              getColor(c.dataset.data[c.dataIndex].from as TypeColor),
            colorTo: (c) =>
              getColor(c.dataset.data[c.dataIndex].to as TypeColor),

            colorMode: "from",
            color: "white",

            nodeWidth: 20,
            nodePadding: 90,
            labels: {
              applied: `Applied (${applied})`,
              interviewing: `Interviewing (${interviewing})`,
              offered: `Offered (${offer})`,
              rejected: `Rejected (${rejected})`,
            },

            priority: {
              applied: 0,
              interviewing: 0,
              offered: 12,
              rejected: 1,
            },
            /* optional column overrides */
            column: {
              applied: 0,
              interviewing: 1,
              offered: 2,
              rejected: 2,
            },
            size: "max",
          },
        ],
      },
      options: {
        responsive: true,
        layout: {
          padding: 200,
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <main className="w-full h-full ">
      <div className="w-[70vw] relative mx-auto">
        <canvas ref={chartContainer}></canvas>
      </div>
    </main>
  );
}
