import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuType = {
  id: number;
  icon: React.ReactNode;
  href: string;
  projectMenuItemName: string;
  isActive: boolean;
};

interface ProjectMenuItem {
  menuItem: MenuType;
  changeIsActive: (id: number) => void;
}

const MenuItem = ({ menuItem, changeIsActive }: ProjectMenuItem) => {
  return (
    <Link
      className="h-fit"
      href={menuItem.href}
      onClick={() => changeIsActive(menuItem.id)}
    >
      <div
        className={cn(
          "flex gap-x-3 py-2 px-5 sm:px-9 sm:mx-4 lg:px-4 rounded-md shadow-lg border border-white bg-white hover:bg-neutral-400 hover:border-neutral-400 cursor-pointer transition",
          menuItem.isActive && "border-neutral-300 bg-neutral-300"
        )}
      >
        {menuItem.icon}
        <p className="hidden lg:block">{menuItem.projectMenuItemName}</p>
      </div>
    </Link>
  );
};

export default MenuItem;
