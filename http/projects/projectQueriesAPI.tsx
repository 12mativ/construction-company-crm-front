import { $authHost } from "..";

export const getProjectQueries = async (projectId: number) => {
  const response = await $authHost.get(`/api/v1/query/${[projectId]}`, { params: { isOrdered: false } });

  return response;
}