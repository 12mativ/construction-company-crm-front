import { findEqualItems } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PartnerType = "PHYSICAL" | "LEGAL";

interface CounterpartyType {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  partnerType: PartnerType;
}

interface CounterpartiesState {
  counterparties: CounterpartyType[];
}

const initialState: CounterpartiesState = {
  counterparties: [],
};

export const counterpartiesSlice = createSlice({
  name: "counterparties",
  initialState: initialState,
  reducers: {
    addCounterparties: (state, action: PayloadAction<CounterpartyType[]>) => {
      state.counterparties = action.payload;
    },

    addCounterparty: (state, action: PayloadAction<CounterpartyType>) => {
      if (!findEqualItems(state.counterparties, action.payload)) {
        state.counterparties.push(action.payload);
      }
    },
  },
});

export default counterpartiesSlice.reducer;

export const { addCounterparties, addCounterparty } =
  counterpartiesSlice.actions;
