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
      if (!findEqualItemsById(state.counterparties, action.payload.id)) {
        state.counterparties.push(action.payload);
      }
    },

    removeCounterparty: (
      state,
      action: PayloadAction<{ partnerId: number }>
    ) => {
      state.counterparties = state.counterparties.filter(
        (counterparty) => counterparty.id !== action.payload.partnerId
      );
    },

    editCounterparty: (
      state,
      action: PayloadAction<{
        partnerId: number,
        counterpartynName: string,
        phoneNumber: string,
        email: string,
        partnerType: PartnerType
      }>
    ) => {
      state.counterparties.forEach((counterparty) => {
        if (counterparty.id === action.payload.partnerId) {
          counterparty.name = action.payload.counterpartynName;
          counterparty.phoneNumber = action.payload.phoneNumber;
          counterparty.email = action.payload.email;
          counterparty.partnerType = action.payload.partnerType;
        }
      });
    },
  },
});

export default counterpartiesSlice.reducer;

export const { addCounterparties, addCounterparty, removeCounterparty, editCounterparty } =
  counterpartiesSlice.actions;
