import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PartnerType = "PHYSICAL" | "LEGAL";

interface ICounterparty {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  partnerType: PartnerType;
}

interface ICounterpartiesState {
  counterparties: ICounterparty[];
}

const initialState: ICounterpartiesState = {
  counterparties: [],
};

export const counterpartiesSlice = createSlice({
  name: "counterparties",
  initialState: initialState,
  reducers: {
    addCounterparties: (state, action: PayloadAction<ICounterparty[]>) => {
      state.counterparties = action.payload;
    },

    addCounterparty: (state, action: PayloadAction<ICounterparty>) => {
      if (!findEqualItemsById(state.counterparties, action.payload)) {
        state.counterparties.push(action.payload);
      }
    },
  },
});

export default counterpartiesSlice.reducer;

export const { addCounterparties, addCounterparty } =
  counterpartiesSlice.actions;
