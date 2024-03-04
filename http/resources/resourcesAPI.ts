import {
  IResourcePattern,
  ResourceType,
} from "@/lib/features/resources-patterns/resourcesPatternsSlice";
import { $authHost } from "..";
import { AxiosResponse } from "axios";

interface IResourcePatternForCreate {
  name: string;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  measureUnit: string;
  resourceType: ResourceType;
}

interface IResourceEntityForCreatingWork {
  name: string;
  measureUnit: string;
  quantity: number;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  resourceType: ResourceType;
}

export const getResourcePatterns = async (): Promise<
  AxiosResponse<IResourcePattern[]>
> => {
  const response = await $authHost.get("/api/v1/resource/pattern");

  return response;
};

export const createResourcePattern = async ({
  name,
  costPricePerUnit,
  orderPricePerUnit,
  extraCharge,
  measureUnit,
  resourceType,
}: IResourcePatternForCreate) => {
  const response = await $authHost.post("/api/v1/resource/pattern", {
    name,
    costPricePerUnit,
    orderPricePerUnit,
    extraCharge,
    measureUnit,
    resourceType,
  });

  return response;
};

export const deleteResourcePattern = async (resourcePatternId: number) => {
  await $authHost.delete(`/api/v1/resource/pattern/${resourcePatternId}`);
};

export const updateResourcePattern = async ({
  resourcePatternId,
  resourcePatternName,
  costPricePerUnit,
  orderPricePerUnit,
  extraCharge,
  measureUnit,
  resourceType,
}: {
  resourcePatternId: number;
  resourcePatternName: string;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  measureUnit: string;
  resourceType: ResourceType;
}) => {
  const response = await $authHost.put(
    `/api/v1/resource/pattern/${resourcePatternId}`,
    {
      name: resourcePatternName,
      costPricePerUnit: costPricePerUnit,
      orderPricePerUnit: orderPricePerUnit,
      extraCharge: extraCharge,
      measureUnit: measureUnit,
      resourceType: resourceType,
    }
  );

  return response;
};


export const createResource = async ({
  name,
  measureUnit,
  quantity,
  costPricePerUnit,
  orderPricePerUnit,
  extraCharge,
  resourceType,
  workId,
}: IResourceEntityForCreatingWork & { workId: number }) => {
  const response = await $authHost.post(`/api/v1/resource`, {
    name,
    measureUnit,
    quantity,
    costPricePerUnit,
    orderPricePerUnit,
    extraCharge,
    resourceType,
    workId,
  });

  return response;
};


export const deleteResource = async (resource_id: number) => {
  await $authHost.delete(`/api/v1/resource/${resource_id}`);
};

export const updateResource = async ({
  resource_id,
  resourceName,
  measureUnit,
  quantity,
  costPricePerUnit,
  orderPricePerUnit,
  extraCharge,
  resourceType,
  // workId,
}: {
  resource_id: number;
  resourceName: string;
  measureUnit: string;
  quantity: number;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  resourceType: ResourceType;
}) => {
  const response = await $authHost.put(
    `/api/v1/resource/${resource_id}`,
    {
      name: resourceName,
      measureUnit: measureUnit,
      quantity: quantity,
      costPricePerUnit: costPricePerUnit,
      orderPricePerUnit: orderPricePerUnit,
      extraCharge: extraCharge,
      resourceType: resourceType,
      // workId: workId,
    }
  );

  return response;
};
