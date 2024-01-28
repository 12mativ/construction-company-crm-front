import { $authHost } from "..";

export const getWorksGroups = async (projectId: string) => {
  const response = await $authHost.get(`/api/v1/worksGroup/${projectId}`);

  return response;
};

export const createWorkGroup = async (projectId: number, name: string, number: number) => {
  const response = await $authHost.post("/api/v1/worksGroup", {projectId, name, number});

  return response;
};
