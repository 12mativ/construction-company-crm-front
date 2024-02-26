"use client";

import AuthRegister from "@/components/auth/auth-register";
import { useAppSelector } from "@/hooks/redux-hooks";
import { redirect } from "next/navigation";

const Register = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (user.isAuth) {
    return redirect("/projects");
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <AuthRegister />
    </div>
  );
};

export default Register;
