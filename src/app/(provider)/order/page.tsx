"use client";

import { getMemusByLocation } from "@/api/order";
import Loading from "@/components/ui/Loading";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { Menu } from "@/types/order";

export default function Page() {
  const location = 1; // 예: 나루또

  const { data, isLoading, isError } = useQueryWrapper(
    ["menus", location.toString()],
    () => getMemusByLocation({ location }),
    {
      onError: (error) => {
        console.error("메뉴 불러오기 실패:", error);
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
