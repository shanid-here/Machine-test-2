// src/model/performanceModel.ts

export type TaskTypeId = "video" | "photo" | "referral" | "survey";

export type TaskTypeData = {
  id: TaskTypeId;
  label: string;
  value: number; // percentage
  color: string;
};

export type ChartSlice = {
  id: string;
  name: string;
  value: number;
  color: string;
};

export type SegmentConfig = {
  id: string;
  sliceId: string;      // links to ChartSlice.id
  startAngle: number;
  endAngle: number;
  innerRadius: string;  // e.g. "20%"
  outerRadius: string;  // e.g. "80%"
};
