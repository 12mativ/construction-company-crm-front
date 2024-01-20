import { $authHost } from "..";

export const createTransfer = async (
  amount: number,
  senderId: number,
  recipientId: number
) => {
  const response = await $authHost.post("/api/v1/transaction/transfer", {
    amount, 
    senderId,
    recipientId
  });

  return response;
};

export const createOutcome = async (
  amount: number,
  senderId: number,
  partnerId: number
) => {
  const response = await $authHost.post("/api/v1/transaction/outcome", {
    amount, 
    senderId,
    partnerId
  });

  return response;
};

export const createIncome = async (
  amount: number,
  recipientId: number,
  partnerId: number
) => {
  const response = await $authHost.post("/api/v1/transaction/income", {
    amount, 
    recipientId,
    partnerId
  });

  return response;
};
