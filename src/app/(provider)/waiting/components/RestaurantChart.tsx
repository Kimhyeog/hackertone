"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type ChartData = {
  time: string;
  expected: number;
};

interface Props {
  data: ChartData[];
}

export default function RestaurantChart({ data }: Props) {
  return (
    <div className="w-full h-[320px] bg-white p-4 rounded-xl shadow-lg">
      <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
        시간별 대기 시간 예측
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barGap={8}>
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 30]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "#6b7280" }}
          />
          <Bar
            dataKey="expected"
            fill="#fb923c"
            name="예상 대기 시간"
            radius={[6, 6, 0, 0]} // 상단 둥글게
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-md text-sm">
        <p className="text-gray-800 font-semibold">{label}시</p>
        <p className="text-orange-500 font-medium">
          ⏱ {payload[0].value}분 대기 예상
        </p>
      </div>
    );
  }
  return null;
}
