import { AxiosResponse } from "axios";
import { $authHost } from "..";
import { IUser } from "@/lib/features/users/usersSlice";

export const getUsers = async (projectId: number): Promise<AxiosResponse<IUser[]>> => {
  const response = await $authHost.get(`api/v1/projects/users/${projectId}`);

  return response;
}