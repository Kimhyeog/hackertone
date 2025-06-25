"use client";

import { useState } from "react";
import { Restaurant } from "@/types/estimateTime";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import clsx from "clsx";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantWaitChart({ restaurant }: Props) {
  const [selectedTime, setSelectedTime] = useState<string>(
    restaurant.data[0].time
  );

  const selectedSlot = restaurant.data.find((d) => d.time === selectedTime);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-bold mb-4">{restaurant.name}</h2>

      {/* 시간 탭 메뉴 */}
      <div className="flex gap-2 overflow-x-auto mb-4 no-scrollbar">
        {restaurant.data.map((slot) => (
          <button
            key={slot.time}
            onClick={() => setSelectedTime(slot.time)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm whitespace-nowrap border",
              selectedTime === slot.time
                ? "bg-orange-400 text-white border-orange-500"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* 선택된 시간 정보 */}
      {selectedSlot && (
        <div className="mb-4 text-sm text-gray-800 space-y-1">
          <div>
            <span className="font-semibold">예측 대기 시간:</span>{" "}
            {selectedSlot.expected}분
          </div>
          <div>
            <span className="font-semibold">실제 대기 시간:</span>{" "}
            {selectedSlot.actual}분
          </div>
        </div>
      )}

      {/* 그래프 */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={restaurant.data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expected" fill="#60a5fa" name="예측" />
            <Bar dataKey="actual" fill="#fb923c" name="실제" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
