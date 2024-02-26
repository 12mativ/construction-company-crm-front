"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { check } from "@/http/user/userAPI";
import { makeAuth } from "@/lib/features/user/userSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    check()
      .then((res) => {
        console.log(res);
        //@ts-ignore
        dispatch(makeAuth({ username: res.sub!, role: res.roles, isAuth: true }));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (user.isAuth) {
    console.log(user);
    return redirect("/projects");
  }

  return redirect("/login");
}
