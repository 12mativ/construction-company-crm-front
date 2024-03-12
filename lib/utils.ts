import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IUser } from "./features/user/userSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formateComplexDate = (_date: string) => {
  const date = new Date(_date);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const isAdmin = (user: IUser) => {
  return (
    user.roles.includes("ADMIN") || user.roles.includes("SUPER_MEGA_ADMIN")
  );
};

export const isAccountant = (user: IUser) => {
  return (
    user.roles.includes("ACCOUNTANT")
  );
};

export const isEmployee = (user: IUser) => {
  return (
    user.roles.includes("EMPLOYEE")
  );
};