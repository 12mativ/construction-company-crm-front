import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITransfer {
  id: number;
  amount: number;
  senderMoneyAccountId: number;
  recipientMoneyAccountId: number;
  date: string;
}

interface IOutcome {
  id: number;
  amount: number;
  senderMoneyAccountId: number;
  recipientCounterpartyId: number;
  date: string;
}

interface IIncome {
  id: number;
  amount: number;
  senderCounterpartyId: number;
  recipientMoneyAccountId: number;
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
    addTransfer: (state, action: PayloadAction<ITransfer>) => {
      if (!findEqualItemsById(state.transfers, action.payload)) {
        state.transfers.push(action.payload);
      }
    },
    addOutcome: (state, action: PayloadAction<IOutcome>) => {
      if (!findEqualItemsById(state.transfers, action.payload)) {
        state.outcomes.push(action.payload);
      }
    },
    addIncome: (state, action: PayloadAction<IIncome>) => {
      if (!findEqualItemsById(state.transfers, action.payload)) {
        state.incomes.push(action.payload);
      }
    },
  },
});

export default transactionsSlice.reducer;

export const { addTransfer, addOutcome, addIncome } = transactionsSlice.actions;
