import { Menu } from "@/types/order";
import Image from "next/image";
import { LocationKey, locationMap } from "./RestaurantTabs";
import { motion } from "framer-motion";
import { useState } from "react";

interface MenuListProps {
  menus: Menu[]; // 메뉴 배열
  location: LocationKey;
}

export default function MenuList({ menus, location }: MenuListProps) {
  const locationName = locationMap[location];
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {menus.map((menu, index) => {
        const imagePath = `/assets/images/foods/${locationName}/${menu.menuName}.png`;
        const isFocused = focusedIndex === index;

        return (
          <motion.li
            key={index}
            whileHover={{
              scale: 1.03,
              borderColor: "#f97316",
              backgroundColor: "#fff7ed",
            }}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            tabIndex={0}
            className="relative bg-white p-4 border border-gray-200 rounded-xl flex flex-col items-center text-center focus:outline-none transition-all duration-200"
          >
            <Image
              src={imagePath}
              alt={menu.menuName}
              width={100}
              height={100}
              className="object-cover rounded-lg mb-3 border border-gray-100"
            />
            <span className="font-semibold text-base text-gray-900">
              {menu.menuName}
            </span>
            <span className="text-sm text-orange-500 mt-1">
              {menu.menuPrice.toLocaleString()}원
            </span>

            {/* + 버튼: focus 상태일 때만 표시 */}
            {isFocused && (
              <button
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold shadow-md hover:bg-orange-600 transition"
                aria-label={`${menu.menuName} 추가`}
              >
                <span className="mb-1.5">+</span>
              </button>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
