"use client";

import { useRouter } from "next/navigation";

interface ContentsMenuProps {
  onClose: () => void;
}
const pathToMenuMap: Record<string, string> = {
  "/waiting": "식당 대기 시간",
  "/recommend": "식당 • 메뉴 추천",
  "/order": "주문 하기",
};

function ContentsMenu({ onClose }: ContentsMenuProps) {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
    onClose(); // 메뉴 닫기
  };

  return (
    <nav className="absolute left-0 right-0 top-[40px] bg-white border border-gray-200 shadow-md z-50">
      <ul className="flex flex-col divide-y divide-gray-200">
        {Object.entries(pathToMenuMap).map(([path, label]) => (
          <li
            key={path}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClick(path)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ContentsMenu;
