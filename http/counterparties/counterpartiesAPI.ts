import { PartnerType } from "@/lib/features/counterparty/counterpartiesSlice";
import { $authHost } from "..";

export const getCounterparties = async () => {
  const response = await $authHost.get("/api/v1/partner");

  return response;
};

export const createCounterparty = async (
  name: string, 
  phoneNumber: string, 
  email: string, 
  partnerType: PartnerType
) => {
  const response = await $authHost.post("/api/v1/partner", { 
    name,
    phoneNumber,
    email,
    partnerType
  });

  return response;
};
