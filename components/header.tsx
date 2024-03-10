"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { makeAuth } from "@/lib/features/user/userSlice";
import { CircleUserRound, LogOut } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "/assets/1.png";

const Header = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(makeAuth({roles: [], authorities: [], username: "", isAuth: false}));
  }

  if (!user.isAuth) {
    return redirect('/login');
  }

  return (
    <div className="fixed flex items-center justify-between bg-white shadow-lg w-full h-[72px] px-20 z-50">
      <div className="relative h-[48px] w-[48px]">
        <Image src={logo} alt="Logo" fill className="rounded-full" />
      </div>

      <div className="flex items-center gap-x-4">
        <p className="font-bold">{user.username}</p>
        <CircleUserRound size={40} className="text-neutral-600" />
        <LogOut onClick={handleLogout} className="hover:text-red-500 cursor-pointer transition" size={30} />
      </div>
    </div>
  );
};

export default Header;
