import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITransaction {
  id: number;
  amount: number;
  recipientMoneyAccount: number | null;
  senderMoneyAccount: number | null;
  partnerId: number | null;
  timestamp: string;
  description: string;
  type: "TRANSFER" | "OUTCOME" | "INCOME";
}

interface ITransfer {
  id: number;
  amount: number;
  senderMoneyAccountId: number;
  recipientMoneyAccountId: number;
  description: string;
  date: string;
}

interface IOutcome {
  id: number;
  amount: number;
  senderMoneyAccountId: number;
  recipientCounterpartyId: number;
  description: string;
  date: string;
}

interface IIncome {
  id: number;
  amount: number;
  senderCounterpartyId: number;
  recipientMoneyAccountId: number;
  description: string;
  date: string;
}

interface ITransactionsState {
  transfers: ITransfer[];
  outcomes: IOutcome[];
  incomes: IIncome[];
}

const initialState: ITransactionsState = {
  transfers: [],
  outcomes: [],
  incomes: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      action.payload.forEach((transaction) => {
        switch (transaction.type) {
          case "TRANSFER":
            if (!findEqualItemsById(state.transfers, transaction.id)) {
              const dataForTransfer = {
                id: transaction.id,
                amount: transaction.amount,
                senderMoneyAccountId: transaction.senderMoneyAccount!,
                recipientMoneyAccountId: transaction.recipientMoneyAccount!,
                description: transaction.description,
                date: transaction.timestamp,
              };
              state.transfers.push(dataForTransfer);
            }
            break;
          case "OUTCOME":
            if (!findEqualItemsById(state.outcomes, transaction.id)) {
              const dataForOutcome = {
                id: transaction.id,
                amount: transaction.amount,
                senderMoneyAccountId: transaction.senderMoneyAccount!,
                recipientCounterpartyId: transaction.partnerId!,
                description: transaction.description,
                date: transaction.timestamp,
              };
              state.outcomes.push(dataForOutcome);
            }
            break;
          case "INCOME":
            if (!findEqualItemsById(state.incomes, transaction.id)) {
              const dataForOutcome = {
                id: transaction.id,
                amount: transaction.amount,
                senderCounterpartyId: transaction.partnerId!,
                recipientMoneyAccountId: transaction.recipientMoneyAccount!,
                description: transaction.description,
                date: transaction.timestamp,
              };
              state.incomes.push(dataForOutcome);
            }
            break;
        }
      });
    },
    addTransfer: (state, action: PayloadAction<ITransfer>) => {
      if (!findEqualItemsById(state.transfers, action.payload.id)) {
        state.transfers.push(action.payload);
      }
    },
    addOutcome: (state, action: PayloadAction<IOutcome>) => {
      if (!findEqualItemsById(state.transfers, action.payload.id)) {
        state.outcomes.push(action.payload);
      }
    },
    addIncome: (state, action: PayloadAction<IIncome>) => {
      if (!findEqualItemsById(state.transfers, action.payload.id)) {
        state.incomes.push(action.payload);
      }
    },
  },
});

export default transactionsSlice.reducer;

export const { addTransactions, addTransfer, addOutcome, addIncome } = transactionsSlice.actions;
