import { Menu } from "@/types/order";
import { LocationKey, locationMap } from "./RestaurantTabs";
import MenuItem from "./MenuItem";

interface MenuListProps {
  menus: Menu[];
  location: LocationKey;
  selectedCounts: Record<number, number>;
  onMenuClick: (menu: Menu) => void;
}

export default function MenuList({
  menus,
  location,
  selectedCounts,
  onMenuClick,
}: MenuListProps) {
  const locationName = locationMap[location];

  return (
    <ul className="grid grid-cols-2 gap-4 mb-4">
      {menus.map((menu) => (
        <MenuItem
          key={menu.id}
          menu={menu}
          imagePath={`/assets/images/foods/${locationName}/${menu.menuName}.png`}
          count={selectedCounts[menu.id] || 0}
          onClick={() => onMenuClick(menu)}
        />
      ))}
    </ul>
  );
}
