import { ITrackerData, Tracker } from "@/types/tracker";

export function getSankeyFlowForJobTracker(data: ITrackerData) {
  let minFlow = 5;
  const maxFlow = 15;

  const jobTrackerMetadataArr = Object.entries(data.metadata);
  jobTrackerMetadataArr.sort((a, b) => b[1] - a[1]);

  const max = jobTrackerMetadataArr[0][1];
  const min = jobTrackerMetadataArr.at(-1)?.[1] || 0;

  const flows = jobTrackerMetadataArr.map((metadata) => {
    const isZero = metadata[1] == 0;
    minFlow = isZero ? 0 : minFlow;
    const scaled =
      minFlow + ((metadata[1] - min) * (maxFlow - minFlow)) / (max - min);

    // Math.round ensures no decimals
    return [metadata[0], Math.round(scaled)];
  });

  return function (tracker: Tracker) {
    return Object.fromEntries(flows)[tracker];
  };
}
