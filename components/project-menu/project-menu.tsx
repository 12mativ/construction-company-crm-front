"use client";

import {
  BookOpen,
  FileCheck2,
  FolderDot,
  HardHat,
  Image,
  Settings,
  UsersRound,
  Wallet,
} from "lucide-react";
import MenuItem from "../menu-item";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

const ProjectMenu = () => {
  const [activeId, setIsActiveId] = useState<number>();

  const params = usePathname();
  const { projectId } = useParams<{ projectId: string }>();

  const menuItems = [
    {
      id: 1,
      projectMenuItemName: "Планирование",
      icon: <FolderDot className="stroke-1" size={25} />,
      href: `/project/${projectId}/planning`,
      isActive: activeId === 1,
    },
    {
      id: 2,
      projectMenuItemName: "Снабжение",
      icon: <FileCheck2 className="stroke-1" size={25} />,
      href: `/project/${projectId}/supply`,
      isActive: activeId === 2,
    },
    {
      id: 3,
      projectMenuItemName: "Финансы",
      icon: <Wallet className="stroke-1" size={25} />,
      href: `/project/${projectId}/finance`,
      isActive: activeId === 3,
    },
    {
      id: 4,
      projectMenuItemName: "Стройка",
      icon: <HardHat className="stroke-1" size={25} />,
      href: `/project/${projectId}/development`,
      isActive: activeId === 4,
    },
    {
      id: 5,
      projectMenuItemName: "Фото",
      icon: <Image className="stroke-1" size={25} />,
      href: `/project/${projectId}/photos`,
      isActive: activeId === 5,
    },
    {
      id: 6,
      projectMenuItemName: "Команда",
      icon: <UsersRound className="stroke-1" size={25} />,
      href: `/project/${projectId}/team`,
      isActive: activeId === 6,
    },
  ];

  useEffect(() => {
    const currentMenuItem = menuItems.find((el) => el.href === params);
    if (currentMenuItem) {
      setIsActiveId(currentMenuItem.id);
    }
  }, [params]);

  return (
    <div className="flex gap-x-3">
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

export default ProjectMenu;
