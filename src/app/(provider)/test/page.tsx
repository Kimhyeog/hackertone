"use client";

import { useState } from "react";
import Calendar from "react-calendar"; // 캘린더 컴포넌트 (예: react-calendar)
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import { format } from "date-fns";

export default function Page() {
  const [name, setName] = useState("오렌지 주스");
  const [type, setType] = useState("음료");
  const [expiry, setExpiry] = useState<Date | null>(new Date("2023-06-20"));

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4 text-green-700">
        음식 추가하기
      </h1>

      {/* 필드 영역 */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700">음식 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">음식 타입</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">유통기한</label>
          <input
            type="text"
            readOnly
            value={expiry ? format(expiry, "yyyy-MM-dd") : ""}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-sm font-semibold"
          />
        </div>
      </div>

      {/* 캘린더 */}
      <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
        <Calendar
          onChange={(date) => setExpiry(date as Date)}
          value={expiry}
          locale="ko"
          calendarType="gregory"
          tileClassName={({ date, view }) =>
            format(date, "yyyy-MM-dd") === format(expiry!, "yyyy-MM-dd")
              ? "bg-green-700 text-white rounded-lg"
              : undefined
          }
        />
      </div>

      {/* 추가 버튼 */}
      <button className="w-full bg-green-700 text-white py-3 text-lg rounded-full shadow">
        추가
      </button>
    </div>
  );
}
