import { $host } from "..";

export type RoleType = "SUPER_MEGA_ADMIN" | "ADMIN" | "ACCOUNTANT" | "EMPLOYEE";

export const addRole = async ({
  username,
  roleType
} : {
  username: string;
  roleType: RoleType;
}
) => {
  await $host.post("/api/v1/role", {
    username,
    roleType
  });
};

export const deleteRole = async ({
  username,
  roleType
} : {
  username: string;
  roleType: RoleType;
}
) => {
  await $host.delete("/api/v1/role", {
    data: {
      username: username,
      roleType: roleType
    }
  });
};