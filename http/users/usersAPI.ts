import { AxiosResponse } from "axios";
import { $authHost } from "..";
import { IUser } from "@/lib/features/users/usersSlice";

export const getUsers = async (
  projectId: number
): Promise<AxiosResponse<IUser[]>> => {
  const response = await $authHost.get(`api/v1/projects/users/${projectId}`);

  return response;
};

export const addUserToProject = async ({
  projectId,
  email,
}: {
  projectId: number;
  email: string;
}): Promise<AxiosResponse<IUser>> => {
  const response = await $authHost.post(`api/v1/projects/users/${projectId}`, {
    email,
  });

  return response;
};
