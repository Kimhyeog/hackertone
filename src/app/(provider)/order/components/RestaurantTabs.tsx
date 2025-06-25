// src/components/ui/RestaurantTabs.tsx

"use client";

import clsx from "clsx";
import { useRef } from "react";

export const locationMap = {
  0: "아지오",
  1: "나루또",
  2: "김밥천국",
  3: "진관키친",
  4: "계절밥상",
} as const;

export type LocationKey = keyof typeof locationMap;

interface Props {
  selected: LocationKey;
  onSelect: (key: LocationKey) => void;
}

export default function RestaurantTabs({ selected, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      // 수직 휠 스크롤을 좌우 스크롤로 전환
      e.preventDefault();
      scrollRef.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide px-1 py-2 scroll-smooth scroll-px-2 snap-x snap-mandatory"
    >
      {(Object.entries(locationMap) as [string, string][]).map(
        ([key, name]) => {
          const isSelected = Number(key) === selected;

          return (
            <button
              key={key}
              onClick={() => onSelect(Number(key) as LocationKey)}
              className={clsx(
                "px-4 py-2 text-sm rounded-full snap-start min-w-fit font-semibold transition-all duration-200 ease-in-out",
                isSelected
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              )}
            >
              {name}
            </button>
          );
        }
      )}
    </div>
  );
}
