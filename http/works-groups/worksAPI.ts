import { ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { $authHost } from "..";

interface IResourceEntityForCreatingWork {
  name: string;
  measureUnit: string;
  quantity: number;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  resourceType: ResourceType;
}

interface ICreateWorkProps {
  name: string;
  number: number;
  quantity: number;
  measureUnit: string;
  startDate: string;
  endDate: string;
  worksGroupId: number;
  resourceEntityList: IResourceEntityForCreatingWork[];
}

export const createWork = async ({
  name,
  number,
  quantity,
  measureUnit,
  startDate,
  endDate,
  worksGroupId,
  resourceEntityList,
}: ICreateWorkProps) => {
  const response = await $authHost.post("/api/v1/work", {
    name,
    number,
    quantity,
    measureUnit,
    startDate,
    endDate,
    worksGroupId,
    resourceEntityList,
  });

  return response;
};

export const updateWork = async ({
  workId,
  name,
  number,
  quantity,
  measureUnit,
  startDate,
  endDate,
  worksGroupId,
  resourceEntityList,
}: ICreateWorkProps & {workId: number}) => {
  const response = await $authHost.put(`/api/v1/work/${workId}`, {
    name,
    number,
    quantity,
    measureUnit,
    startDate,
    endDate,
    worksGroupId,
    resourceEntityList,
  });

  return response;
};
