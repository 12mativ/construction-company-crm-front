import { $authHost } from "..";

export const getTransactions = async () => {
  const response = await $authHost.get("/api/v1/transaction");

  return response;
}

export const createTransfer = async (
  amount: number,
  senderId: number,
  recipientId: number,
  description: string,
  timestamp: string
) => {
  const response = await $authHost.post("/api/v1/transaction/transfer", {
    amount, 
    senderId,
    recipientId,
    description,
    timestamp
  });

  return response;
};

export const createOutcome = async (
  amount: number,
  senderId: number,
  partnerId: number,
  description: string,
  timestamp: string
) => {
  const response = await $authHost.post("/api/v1/transaction/outcome", {
    amount, 
    senderId,
    partnerId,
    description,
    timestamp
  });

  return response;
};

export const createIncome = async (
  amount: number,
  recipientId: number,
  partnerId: number,
  description: string,
  timestamp: string,
) => {
  const response = await $authHost.post("/api/v1/transaction/income", {
    amount, 
    recipientId,
    partnerId,
    description,
    timestamp
  });

  return response;
};
