"use client";

import { BookOpen, FolderDot, Settings, User, Wallet } from "lucide-react";
import MenuItem from "../menu-item";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MainMenu = () => {
  const [activeId, setIsActiveId] = useState<number>();

  const params = usePathname();

  const menuItems = [
    {
      id: 1,
      projectMenuItemName: "Проекты",
      icon: <FolderDot className="stroke-1" size={25} />,
      href: "/projects",
      isActive: activeId === 1,
    },
    {
      id: 2,
      projectMenuItemName: "Финансы",
      icon: <Wallet className="stroke-1" size={25} />,
      href: "/finance",
      isActive: activeId === 2,
    },
    {
      id: 3,
      projectMenuItemName: "Справочники",
      icon: <BookOpen className="stroke-1" size={25} />,
      href: "/catalogs",
      isActive: activeId === 3,
    },
    {
      id: 4,
      projectMenuItemName: "Настройки",
      icon: <Settings className="stroke-1" size={25} />,
      href: "/settings",
      isActive: activeId === 4,
    },
    {
      id: 5,
      projectMenuItemName: "Пользователи",
      icon: <User className="stroke-1" size={25} />,
      href: "/users",
      isActive: activeId === 5,
    },
  ];

  useEffect(() => {
    const currentMenuItem = menuItems.find((el) => el.href === params);
    if (currentMenuItem) {
      setIsActiveId(currentMenuItem.id);
    }
  }, [params]);

  return (
    <div className=" flex flex-[4] p-4 lg:w-[250px] lg:flex-col lg:gap-y-5 lg:pr-4">
      {menuItems.map((menuItem) => {
        return (
          <MenuItem
            key={menuItem.id}
            menuItem={menuItem}
            changeIsActive={setIsActiveId}
          />
        );
      })}
    </div>
  );
};

export default MainMenu;
