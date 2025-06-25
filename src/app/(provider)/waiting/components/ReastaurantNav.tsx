"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import Input from "@/components/ui/Input";

const locationNameMap: Record<number, string> = {
  0: "아지오",
  1: "나루또",
  2: "김밥천국",
  3: "진관키친",
  4: "계절밥상",
};

const locationImages: Record<number, string> = {
  0: "/assets/images/restaurants/학생회관.png",
  1: "/assets/images/restaurants/학생회관.png",
  2: "/assets/images/restaurants/학생회관.png",
  3: "/assets/images/restaurants/진관홀.png",
  4: "/assets/images/restaurants/계절밥상.png",
};

const locationBuildingMap: Record<number, string> = {
  0: "학생회관",
  1: "학생회관",
  2: "학생회관",
  3: "진관홀",
  4: "군자관",
};

interface Props {
  selectedLocation: number;
  onChange: (location: number) => void;
}

export default function RestaurantNav({ selectedLocation, onChange }: Props) {
  const [activeBuilding, setActiveBuilding] = useState("학생회관");

  // 건물 리스트 추출
  const buildingList = Array.from(new Set(Object.values(locationBuildingMap)));

  // 현재 선택된 건물에 해당하는 식당들
  const filteredLocations = Object.entries(locationNameMap).filter(
    ([key]) => locationBuildingMap[Number(key)] === activeBuilding
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-center text-lg font-bold mb-4">식당 선택</h2>

      {/* Building Nav */}
      <div className="flex justify-center gap-3 mb-4">
        {buildingList.map((building) => (
          <button
            key={building}
            onClick={() => setActiveBuilding(building)}
            className={clsx(
              "px-4 py-2 rounded-full text-md font-bold transition",
              activeBuilding === building
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
          >
            {building}
          </button>
        ))}
      </div>

      {/* Radio List */}
      <div className="flex flex-col gap-3">
        {filteredLocations.map(([key, name]) => {
          const locationNum = Number(key);
          const imageSrc = locationImages[locationNum];

          const isSelected = selectedLocation === locationNum;

          return (
            <label
              key={locationNum}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition",
                isSelected
                  ? "border-orange-600 bg-orange-50 font-extrabold border-2"
                  : "border-gray-300 hover:bg-orange-50"
              )}
            >
              <Input
                type="radio"
                name="location"
                value={locationNum}
                checked={isSelected}
                onChange={() => onChange(locationNum)}
                className="accent-orange-700"
              />
              <div className="w-12 h-12 rounded overflow-hidden shadow-sm">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className={clsx(
                  "text-sm font-bold",
                  isSelected
                    ? "text-orange-700 text-md font-extrabold"
                    : "text-gray-800"
                )}
              >
                {name}
              </span>
            </label>
          );
        })}
      </div>

      {/* 선택된 식당 이미지 (하단 100% 너비) */}
      <div className="mt-6">
        <Image
          src={locationImages[selectedLocation]}
          alt={locationNameMap[selectedLocation]}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg border object-cover"
        />
      </div>
    </div>
  );
}
