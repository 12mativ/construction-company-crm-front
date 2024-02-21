import { ProjectStatusType } from "@/lib/features/projects/projectsSlice";
import { $authHost } from "..";

export const getProjects = async () => {
  const response = await $authHost.get("/api/v1/projects");

  return response;
};

export const createProject = async (name: string) => {
  const response = await $authHost.post("/api/v1/projects", { name: name });

  return response;
};

export const updateProjectStatus = async ({projectId, projectStatus}: {
  projectId: number,
  projectStatus: ProjectStatusType
}) => {
  const response = await $authHost.put(`/api/v1/projects/status/${projectId}`, {
    projectStatus
  });

  return response;
};
