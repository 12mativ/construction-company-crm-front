import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export type RoleType = 'ADMIN' | 'CUSTOMER' | 'ACCOUNTANT' | 'EMPLOYEE'

export const register = async (username: string, password: string, role: RoleType) => {
  const response = await $host.post("/api/v1/auth/register", {
    username,
    password,
    userType: role
  });
  localStorage.setItem("token", response.data.jwt);
  // return jwtDecode(response.data.jwt)
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await $host.post("/api/v1/auth/login", {
    username,
    password,
  });
  localStorage.setItem("token", response.data.jwt);
  // return jwtDecode(response.data.jwt)
  return response;
};

export const check = async () => {
  const response = await $host.post("/api/v1/auth/register");
  return response;
};
