"use client";

import Header from "@/components/header";
import LoaderIndicator from "@/components/loader";
import MainMenu from "@/components/main-menu/main-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.userReducer.user);

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        if (res) {
          dispatch(makeAuth({ username: res.data.username, roles: res.data.authorities, authorities: res.data.authorities, isAuth: true }));
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!user.isAuth) {
    return redirect('/login');
  }

	if (isLoading) {
		return <LoaderIndicator />
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
