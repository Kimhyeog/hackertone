// src/components/ui/RestaurantTabs.tsx

"use client";
import { motion } from "framer-motion";
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
            <motion.button
              key={key}
              onClick={() => onSelect(Number(key) as LocationKey)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              animate={{
                scale: isSelected ? 1.1 : 1,
                backgroundColor: isSelected ? "#f97316" : "#f3f4f6",
                color: isSelected ? "#ffffff" : "#374151",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-4 py-2 text-sm rounded-full snap-start min-w-fit font-semibold shadow-sm"
            >
              {name}
            </motion.button>
          );
        }
      )}
    </div>
  );
}
