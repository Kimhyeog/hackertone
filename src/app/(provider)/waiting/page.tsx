"use client";

import { getPerInfo } from "@/api/waitng";
import { GetPreInfoResponse } from "@/types/waiting";
import Loading from "@/components/ui/Loading";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import RestaurantNav from "./components/ReastaurantNav";
import { useState } from "react";
import RestaurantChart from "./components/RestaurantChart";

// 타입 정의
type RestaurantData = {
  time: string;
  expected: number;
};

type Restaurant = {
  id: string;
  name: string;
  data: RestaurantData[];
};

// location 번호와 이름 매핑
const locationNameMap: Record<number, string> = {
  0: "아지오",
  1: "나루또",
  2: "진관키친",
  3: "계절밥상",
};

export default function WaitingPage() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const queries: ReturnType<typeof useQueryWrapper<GetPreInfoResponse[]>>[] = [
    useQueryWrapper(["preInfo", "0"], () => getPerInfo(0)),
    useQueryWrapper(["preInfo", "1"], () => getPerInfo(1)),
    useQueryWrapper(["preInfo", "2"], () => getPerInfo(2)),
    useQueryWrapper(["preInfo", "3"], () => getPerInfo(3)),
  ];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const allDataReady = queries.every((q) => q.data);

  if (isLoading || !allDataReady) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        데이터를 불러오는 도중 오류가 발생했습니다.
      </div>
    );
  }

  // 응답을 식당 데이터 형태로 변환
  const restaurants = convertToRestaurantData(queries);

  // 선택된 식당
  const selectedRestaurant = restaurants.find(
    (r) => r.id === String(selectedLocation)
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <RestaurantNav
        selectedLocation={selectedLocation}
        onChange={setSelectedLocation}
      />

      {selectedRestaurant && (
        <div className="mb-6">
          <RestaurantChart data={selectedRestaurant.data} />
        </div>
      )}
    </div>
  );
}

// ✅ useQueryWrapper 배열을 받아 변환
function convertToRestaurantData(
  queries: ReturnType<typeof useQueryWrapper<GetPreInfoResponse[]>>[]
): Restaurant[] {
  return queries.map((query, index) => {
    const location = index; // 순서 = location 번호
    const responseList = query.data!;

    responseList.sort((a, b) => a.time - b.time);

    return {
      id: String(location),
      name: locationNameMap[location] ?? "알 수 없는 식당",
      data: responseList.map((item) => ({
        time: `${item.time}:00`,
        expected: item.estimatedWaitTime,
        actual: item.estimatedWaitTime + Math.floor(Math.random() * 3),
      })),
    };
  });
}
