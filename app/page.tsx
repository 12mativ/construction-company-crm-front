"use client";

import LoaderIndicator from "@/components/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useAppSelector(state => state.userReducer.user);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        if (res) {
          //@ts-ignore
          dispatch(makeAuth({ username: res.sub!, role: res.roles, isAuth: true }));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoaderIndicator />
  }

  if (user.isAuth) {
    return redirect("/projects");
  }

  if (!user.isAuth) {
    return redirect("/login");
  }
}
