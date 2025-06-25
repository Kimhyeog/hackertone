"use client";

import { getMemusByLocation } from "@/api/order";
import Loading from "@/components/ui/Loading";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { getErrorMeesage } from "@/libs/axios";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import RestaurantTabs, { LocationKey } from "./components/RestaurantTabs";
import MenuList from "./components/MenuList";
import { Menu } from "@/types/order";

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

  const [selectedCounts, setSelectedCounts] = useState<Record<number, number>>(
    {}
  );

  const handleMenuClick = (menu: Menu) => {
    setSelectedCounts((prev) => ({
      ...prev,
      [menu.id]: (prev[menu.id] || 0) + 1,
    }));
  };

  const totalPrice = useMemo(() => {
    if (!data) return 0;
    return Object.entries(selectedCounts).reduce((acc, [menuId, count]) => {
      const menu = data.menus.find((m) => m.id === Number(menuId));
      if (!menu) return acc;
      return acc + menu.menuPrice * count;
    }, 0);
  }, [selectedCounts, data]);

  if (isLoading) return <Loading />;
  if (isError || !data)
    return <p className="p-4">메뉴를 불러올 수 없습니다.</p>;

  return (
    <div className="p-4">
      <RestaurantTabs selected={location} onSelect={setLocation} />

      <h1 className="text-center text-xl font-semibold pb-2 mb-2 border-b-1">
        메뉴 목록
      </h1>

      <MenuList
        menus={data.menus}
        location={location}
        selectedCounts={selectedCounts}
        onMenuClick={handleMenuClick}
      />

      <div className="text-right text-lg font-semibold text-gray-800 mt-4">
        총 합계:{" "}
        <span className="text-orange-600">{totalPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
}
