import { $authHost } from "..";

export const getOrganisations = async () => {
  const response = await $authHost.get("/api/v1/organisation/full");

  return response;
};

export const createOrganisation = async (name: string) => {
  const response = await $authHost.post("/api/v1/organisation", {
    name,
  });

  return response;
};

export const createMoneyAccount = async (
  name: string,
  organisationId: number,
  balance: number,
  numberOfAccount: string
) => {
  const response = await $authHost.post("/api/v1/moneyAccount", {
    name,
    organisationId,
    balance,
    numberOfAccount
  });

  return response;
};
