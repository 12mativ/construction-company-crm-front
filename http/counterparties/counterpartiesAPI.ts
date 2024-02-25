import { PartnerType } from "@/lib/features/counterparties/counterpartiesSlice";
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
    partnerType,
  });

  return response;
};

export const deleteCounterparty = async (partnerId: number) => {
  await $authHost.delete(`/api/v1/partner/${partnerId}`);
};

export const updateCounterparty = async ({partnerId, counterpartyName, phoneNumber, email, partnerType}: {
  partnerId: number,
  counterpartyName: string,
  phoneNumber: string,
  email: string,
  partnerType: PartnerType
}) => {
  const response = await $authHost.put(`/api/v1/partner/${partnerId}`, {name: counterpartyName, phoneNumber: phoneNumber, email: email, partnerType: partnerType});
  
  return response;
};
