"use client";

import { getMemusByLocation } from "@/api/order";
import Loading from "@/components/ui/Loading";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { getErrorMeesage } from "@/libs/axios";
import { Menu } from "@/types/order";
import { toast } from "sonner";
import { useState } from "react";
import RestaurantTabs, { LocationKey } from "./components/RestaurantTabs";

export default function Page() {
  const [location, setLocation] = useState<LocationKey>(1);

  const { data, isLoading, isError } = useQueryWrapper(
    ["menus", location.toString()],
    () => getMemusByLocation({ location }),
    {
      onError: (error) => {
        const message = getErrorMeesage(error);
        toast.error(message);
      },
    }
  );

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError || !data)
    return <p className="p-4">메뉴를 불러올 수 없습니다.</p>;

  return (
    <div className="p-4">
      <RestaurantTabs selected={location} onSelect={setLocation} />

      <h1 className="text-xl font-semibold mb-4">메뉴 목록</h1>
      <ul className="space-y-2">
        {data.menus.map((menu: Menu, index: number) => (
          <li
            key={index}
            className="p-3 border rounded-md flex justify-between items-center"
          >
            <span className="font-medium">{menu.menuName}</span>
            <span className="text-gray-600">
              {menu.menuPrice.toLocaleString()}원
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
