'use client'

import { useAppSelector } from "@/hooks/redux-hooks";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useAppSelector((state) => state.userReducer.user);
  
  if (user) {
    return redirect('/projects')
  }

  return redirect('/login')
}