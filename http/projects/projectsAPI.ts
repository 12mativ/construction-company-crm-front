import { $authHost } from "..";

export const getProjects = async () => {
  const response = await $authHost.get("/api/v1/projects");

  return response;
};

export const createProject = async (name: string) => {
  const response = await $authHost.post("/api/v1/projects", { name: name });

  return response;
};
