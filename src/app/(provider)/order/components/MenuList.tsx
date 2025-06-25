// src/app/(your_path)/components/MenuList.tsx

import { Menu } from "@/types/order";
import Image from "next/image";
import { LocationKey, locationMap } from "./RestaurantTabs";

interface MenuListProps {
  menus: Menu[];
  location: LocationKey;
}

export default function MenuList({ menus, location }: MenuListProps) {
  const locationName = locationMap[location]; // 예: "나루또"

  return (
    <ul className="grid grid-cols-2 gap-4">
      {menus.map((menu, index) => {
        // 이미지 경로 구성
        const imagePath = `/assets/images/foods/${locationName}/${menu.menuName}.png`;

        return (
          <li
            key={index}
            className="p-3 border rounded-md flex flex-col items-center text-center"
          >
            <Image
              src={imagePath}
              alt={menu.menuName}
              width={100}
              height={100}
              className="object-cover rounded-md mb-2"
              onError={(e) => {
                // next/image는 fallback 대체가 직접 지원되지 않기 때문에,
                // 이미지 누락 시 대비하려면 <img>로 대체하거나 모든 이미지를 준비해야 합니다.
              }}
            />
            <span className="font-medium">{menu.menuName}</span>
            <span className="text-gray-600">
              {menu.menuPrice.toLocaleString()}원
            </span>
          </li>
        );
      })}
    </ul>
  );
}
