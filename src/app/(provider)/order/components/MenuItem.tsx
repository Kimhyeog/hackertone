import { Menu } from "@/types/order";
import Image from "next/image";
import { motion } from "framer-motion";

interface MenuItemProps {
  menu: Menu;
  imagePath: string;
  count: number;
  onClick: () => void;
}

export default function MenuItem({
  menu,
  imagePath,
  count,
  onClick,
}: MenuItemProps) {
  return (
    <motion.li
      whileHover={{
        scale: 1.03,
        borderColor: "#f97316",
        backgroundColor: "#fff7ed",
      }}
      tabIndex={0}
      onClick={onClick}
      className="relative bg-white p-4 border-1 border-gray-200 rounded-xl flex flex-col items-center text-center focus:outline-none transition-all duration-200"
    >
      <Image
        src={imagePath}
        alt={menu.menuName}
        width={100}
        height={100}
        className="w-[100px] h-[100px] object-cover rounded-lg mb-3 border border-gray-100"
      />
      <span className="font-semibold text-base text-gray-900">
        {menu.menuName}
      </span>
      <span className="text-sm text-orange-500 font-bold mt-1">
        {menu.menuPrice.toLocaleString()}원
      </span>

      {count > 0 && (
        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
          {count}
        </div>
      )}
    </motion.li>
  );
}
