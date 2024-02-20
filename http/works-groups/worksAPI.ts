import { $authHost } from "..";

interface ICreateWorkProps {
  name: string;
  number: number;
  quantity: number;
  measureUnit: string;
  startDate: string;
  endDate: string;
  worksGroupId: number;
}

export const createWork = async ({
  name,
  number,
  quantity,
  measureUnit,
  startDate,
  endDate,
  worksGroupId,
}: ICreateWorkProps) => {
  const response = await $authHost.post("/api/v1/work", {
    name,
    number,
    quantity,
    measureUnit,
    startDate,
    endDate,
    worksGroupId,
  });

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
