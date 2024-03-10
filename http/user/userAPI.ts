import { $authHost, $host } from "..";
import { jwtDecode } from "jwt-decode";

export type AuthorityType = "CUSTOMER" | "WORKER";

export const register = async (
  username: string,
  password: string,
  authority: AuthorityType
) => {
  await $host.post("/api/v1/auth/register", {
    username,
    password,
    authorityType: authority,
  });

  const responseWithJwt = await loginJWT(username, password);
  //@ts-ignore
  localStorage.setItem("token", responseWithJwt.data.jwt);
  //@ts-ignore
  return {authorities: responseWithJwt.data.authorities, roles: responseWithJwt.data.roles, ...jwtDecode(responseWithJwt.data.jwt)};
};

export const login = async (username: string, password: string) => {
  const response = await $host.post("/api/v1/auth/login", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.jwt);

  return {authorities: response.data.authorities, roles: response.data.roles, ...jwtDecode(response.data.jwt)};
};

export const loginJWT = async (username: string, password: string) => {
  const response = await $host.post("/api/v1/auth/login", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.jwt);

  return response;
};

export const check = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await $authHost.get("/api/v1/auth");
    return response;
  }
};
