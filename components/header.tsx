"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserAvatar from "./user-avatar";
import logo from "/assets/1.png";
import { CircleUserRound, LogOut } from "lucide-react";
import { makeAuth } from "@/lib/features/user/userSlice";

const Header = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(makeAuth({role: "", username: "", isAuth: false}));
  }

  if (!user.isAuth) {
    return redirect('/login');
  }

  return (
    <div className="fixed flex lg:items-center lg:justify-between bg-white shadow-lg w-full h-[72px] px-10 lg:px-20 z-50">
      <div className="hidden lg:block lg:relative lg:h-[48px] lg:w-[48px]">
        <Image src={logo} alt="Logo" fill className="rounded-full" />
      </div>

      <div className="ml-auto flex items-center gap-x-4">
        <p className="hidden lg:block lg:font-bold">{user.username}</p>
        <CircleUserRound size={40} className="text-neutral-600" />
        <LogOut onClick={handleLogout} className="hover:text-red-500 cursor-pointer transition" size={30} />
      </div>
    </div>
  );
};

export default Header;
