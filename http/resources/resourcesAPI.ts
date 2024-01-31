import { IResourcePattern, ResourceType } from "@/lib/features/resources-patterns/resourcesPatternsSlice";
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

export const getResourcePatterns = async (): Promise<AxiosResponse<IResourcePattern[]>> => {
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
