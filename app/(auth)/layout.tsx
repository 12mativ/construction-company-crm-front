"use client";

import Header from "@/components/header";
import MainMenu from "@/components/main-menu/main-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    check().then((res) => {
      //@ts-ignore
      dispatch(makeAuth({ username: res.sub!, role: res.roles, isAuth: true }));
    });
  }, []);

  if (!user.isAuth) {
    return redirect("/login");
  }

  return (
    <div>
      <Header />
      <div className="flex bg-neutral-100 p-20 pt-32 gap-x-2">
        <div className="flex justify-center flex-[1]">
          <MainMenu />
        </div>
        <main className="flex-[4] ml-10">{children}</main>
      </div>
    </div>
  );
}
