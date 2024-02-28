"use client";

import LoaderIndicator from "@/components/loader";
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
        //@ts-ignore
        dispatch(makeAuth({ username: res.sub!, role: res.roles, isAuth: true }));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (user.isAuth) {
    return redirect('/projects');
  }

	if (isLoading) {
		return <LoaderIndicator />
	}
	
  return <>{children}</>;
}
