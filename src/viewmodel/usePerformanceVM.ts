// src/viewmodel/usePerformanceVM.ts
import type {
  TaskTypeData,
  ChartSlice,
  SegmentConfig,
} from "../model/performanceModel";

export type PerformanceVM = {
  title: string;
  items: TaskTypeData[];   // for legend
  chartSlices: ChartSlice[]; // for chart (includes "Other")
  segments: SegmentConfig[]; // positioning each slice
};

export const usePerformanceVM = (): PerformanceVM => {
  // Legend + main 4 task types
  const items: TaskTypeData[] = [
    { id: "video", label: "Video", value: 35, color: "#13C4E9" },   // blue
    { id: "photo", label: "Photo", value: 30, color: "#A26EFF" },   // purple
    { id: "referral", label: "Referral", value: 18, color: "#FF5C93" }, // pink
    { id: "survey", label: "Survey", value: 25, color: "#FFB347" }, // yellow
  ];

  // Slices used in the chart (5 total: 4 + Other)
  const chartSlices: ChartSlice[] = [
    ...items.map((item) => ({
      id: item.id,
      name: item.label,
      value: item.value,
      color: item.color,
    })),
    {
      id: "other",
      name: "Other",
      value: 10,
      color: "#00B4B0B2",
    },
  ];

  // Each segment controls shape + position of a slice
  const segments: SegmentConfig[] = [
    {
      id: "video-seg",
      sliceId: "video",         // links to chartSlices.id
      startAngle: 435,
      endAngle: 570,
      innerRadius: "20%",
      outerRadius: "80%",
    },
    {
      id: "referral-seg",
      sliceId: "referral",
      startAngle: 35,
      endAngle: 75,
      innerRadius: "20%",
      outerRadius: "100%",
    },
    {
      id: "other-seg",
      sliceId: "other",
      startAngle: 15,
      endAngle: 35,
      innerRadius: "20%",
      outerRadius: "75%",
    },
    {
      id: "survey-seg",
      sliceId: "survey",
      startAngle: -30,
      endAngle: 15,
      innerRadius: "20%",
      outerRadius: "80%",
    },
    {
      id: "photo-seg",
      sliceId: "photo",
      startAngle: 210,
      endAngle: 330,
      innerRadius: "20%",
      outerRadius: "60%",
    },
  ];

  return {
    title: "Task Type Performance",
    items,
    chartSlices,
    segments,
  };
};
