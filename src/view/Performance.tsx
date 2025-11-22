// src/views/Performance.tsx
// import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { usePerformanceVM } from "../viewmodel/usePerformanceVM";

const RADIAN = Math.PI / 180;

// Label INSIDE the arc, shown only when chart is hovered
const renderLabel = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
  } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g className="opacity-0 group-hover:opacity-100">
      {/* Percentage (top) */}
      <text
        x={x - 6}
        y={y - 6}
        dominantBaseline="central"
        fontSize={10}
        fontWeight={500}
        fill="#FFFFFF"
      >
        {value}%
      </text>

      {/* Name (bottom) */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9}
        fontWeight={500}
        fill="#FFFFFF"
      >
        {name}
      </text>
    </g>
  );
};

function Performance() {
  const { title, chartSlices, items, segments } = usePerformanceVM();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="h-[634px] w-[718px] rounded-lg bg-white border-1 shadow-lg">
        {/* Title */}
        <h1
          className="pt-[20px] pl-[40px] text-[24px] font-[500]"
          style={{
            background: "linear-gradient(to bottom,  #2070FF , #319F43)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>

        {/* Chart */}
        <div className="mt-10 flex flex-col items-center">
          <div
            className="group h-[325px] w-[332px] flex items-center justify-center
                       transform transition-transform duration-300 ease-out
                       hover:scale-105"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {segments.map((seg) => {
                  const slice = chartSlices.find(
                    (s) => s.id === seg.sliceId
                  );
                  if (!slice) return null;

                  return (
                    <Pie
                      key={seg.id}
                      data={[slice]} // single-slice pie
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      startAngle={seg.startAngle}
                      endAngle={seg.endAngle}
                      innerRadius={seg.innerRadius}
                      outerRadius={seg.outerRadius}
                      paddingAngle={0}
                      labelLine={false}
                      label={renderLabel} // inside-arc labels
                    >
                      <Cell
                        fill={slice.color}
                        stroke="#FFFFFF"
                        strokeWidth={3}
                         style={{ outline: "none" }} 
                      />
                    </Pie>
                  );
                })}
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend (no "Other") */}
          <div className="mt-[84px] grid w-[80%] grid-cols-2 gap-y-[30px] gap-x-[22px] font-[400]">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <span
                  className="inline-block h-[20px] w-[20px] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
