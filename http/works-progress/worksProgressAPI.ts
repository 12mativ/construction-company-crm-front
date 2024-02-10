import { $authHost } from "..";

interface IGetWorksProgressProps {
  projectId: string;
}

export const getWorksProgress = async (projectId: string) => {
  const response = await $authHost.get(`/api/v1/progressOfWork/${projectId}`);

  return response;
};

// export const updateWork = async ({
//   workId,
//   name,
//   number,
//   quantity,
//   measureUnit,
//   startDate,
//   endDate,
//   worksGroupId,
//   resourceEntityList,
// }: ICreateWorkProps & {workId: number}) => {
//   const response = await $authHost.put(`/api/v1/work/${workId}`, {
//     name,
//     number,
//     quantity,
//     measureUnit,
//     startDate,
//     endDate,
//     worksGroupId,
//     resourceEntityList,
//   });

//   return response;
// };
