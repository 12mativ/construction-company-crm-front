import { $authHost } from "..";

export const getWorksGroups = async (projectId: string) => {
  const response = await $authHost.get(`/api/v1/worksGroup/${projectId}`);

  return response;
};

export const createWorkGroup = async (projectId: number, name: string, number: number) => {
  const response = await $authHost.post("/api/v1/worksGroup", { projectId, name, number });

  return response;
};

export const deleteWorksGroup = async (works_group_id: number) => {
  await $authHost.delete(`/api/v1/worksGroup/${works_group_id}`);
};

export const updateWorksGroup = async ({ worksGroupId, worksGroupName, worksGroupNumber, projectId }: {
  worksGroupId: number
  worksGroupName: string
  worksGroupNumber: number
  projectId: number
}) => {
  const response = await $authHost.put(`/api/v1/worksGroup/${worksGroupId}`, { name: worksGroupName, number: worksGroupNumber, projectId: projectId });

  return response;
};