import { AxiosResponse } from "axios";
import { $authHost } from "..";
import { IProjectUser } from "@/lib/features/project-users/projectUsersSlice";

export const getUsers = async (
  projectId: number
): Promise<AxiosResponse<IProjectUser[]>> => {
  const response = await $authHost.get(`api/v1/projects/users/${projectId}`);

  return response;
};

export const addUserToProject = async ({
  projectId,
  email,
}: {
  projectId: number;
  email: string;
}): Promise<AxiosResponse<IProjectUser>> => {
  const response = await $authHost.post(`api/v1/projects/users/${projectId}`, {
    email,
  });

  return response;
};

export const getAllUsers = async (): Promise<AxiosResponse<IProjectUser[]>> => {
  return await $authHost.get(`api/v1/user`);
};
