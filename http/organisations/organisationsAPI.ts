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

export const deleteOrganisation = async (organisationId: number) => {
  await $authHost.delete(`/api/v1/organisation/${organisationId}`);
};

export const updateOrganisation = async ({organisationId, organisationName}: {
  organisationId: number,
  organisationName: string
}) => {
  const response = await $authHost.put(`/api/v1/organisation/${organisationId}`, {name: organisationName});
  
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
    numberOfAccount,
  });

  return response;
};

export const deleteMoneyAccount = async (moneyAccountId: number) => {
  await $authHost.delete(`/api/v1/moneyAccount/${moneyAccountId}`);
};

export const updateMoneyAccount = async ({moneyAccountId, moneyAccountName, organisationId, balance, numberOfAccount}: {
  moneyAccountId: number,
  moneyAccountName: string,
  organisationId: number,
  balance: number,
  numberOfAccount: string
}) => {
  const response = await $authHost.put(`/api/v1/moneyAccount/${moneyAccountId}`, {name: moneyAccountName, organisationId: organisationId, balance: balance, numberOfAccount: numberOfAccount});
  
  return response;
};
