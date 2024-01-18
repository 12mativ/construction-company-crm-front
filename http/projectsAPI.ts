import { $authHost, $host } from "."

export const getProjects = async () => {
  const response = await $authHost.get('/api/v1/projects')

  return response;
}