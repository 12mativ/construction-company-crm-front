"use client";

import AuthLogin from "@/components/auth/auth-login";
import { useAppSelector } from "@/hooks/redux-hooks";
import { redirect } from "next/navigation";

const Login = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <AuthLogin />
    </div>
  );
};

export default Login;
