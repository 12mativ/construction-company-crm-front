import { IOrder, OrderType } from "@/lib/features/orders/ordersSlice";
import { AxiosResponse } from "axios";
import { $authHost } from "..";

interface IQueryEntity {
  id: number;
  newFactQuantity: number;
  newFactCostPerUnit: number;
}

interface IOrderForCreateRequest {
  partnerId: number;
  queryEntityList: IQueryEntity[];
  projectId: number;
  creationDate: string;
  paymentDate: string;
  description: string;
}

export const getOrders = async (projectId: number, type: OrderType) => {
  const response = await $authHost.get(`/api/v1/order/${projectId}`, {
    params: { type },
  });

  return response;
};

export const createOrder = async ({
  partnerId,
  queryEntityList,
  projectId,
  creationDate,
  paymentDate,
  description,
}: IOrderForCreateRequest): Promise<AxiosResponse<IOrder>> => {
  const response = await $authHost.post("/api/v1/order", {
    partnerId,
    queryEntityList,
    projectId,
    creationDate,
    paymentDate,
    description,
  });

  return response;
};
