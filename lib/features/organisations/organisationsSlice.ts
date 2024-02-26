import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MoneyAccountType = {
  id: number;
  name: string;
  balance: number;
  numberOfAccount: string;
  organisationId: number;
};

export interface IOrganisation {
  id: number;
  name: string;
  moneyAccountList: MoneyAccountType[];
}

interface ICounterpartiesState {
  organisations: IOrganisation[];
}

const initialState: ICounterpartiesState = {
  organisations: [],
};

export const organisationsSlice = createSlice({
  name: "organisations",
  initialState: initialState,
  reducers: {
    addOrganisations: (state, action: PayloadAction<IOrganisation[]>) => {
      state.organisations = action.payload;
    },

    addOrganisation: (state, action: PayloadAction<IOrganisation>) => {
      if (!findEqualItemsById(state.organisations, action.payload.id)) {
        state.organisations.push(action.payload);
      }
    },

    removeOrganisation: (
      state,
      action: PayloadAction<{ organisationId: number }>
    ) => {
      state.organisations = state.organisations.filter(
        (organisation) => organisation.id !== action.payload.organisationId
      );
    },

    editOrganisation: (
      state,
      action: PayloadAction<{
        organisationId: number;
        organisationName: string;
      }>
    ) => {
      state.organisations.forEach((organisation) => {
        if (organisation.id === action.payload.organisationId) {
          organisation.name = action.payload.organisationName;
        }
      });
    },

    addMoneyAccount: (state, action: PayloadAction<MoneyAccountType>) => {
      const organisation = state.organisations.find(
        (organisation) => organisation.id === action.payload.organisationId
      );

      if (
        !findEqualItemsById(organisation?.moneyAccountList, action.payload.id)
      ) {
        organisation?.moneyAccountList.push(action.payload);
      }
    },

    removeMoneyAccount: (
      state,
      action: PayloadAction<{ moneyAccountId: number }>
    ) => {
      state.organisations.forEach((moneyAccount) => {
        moneyAccount.moneyAccountList = moneyAccount.moneyAccountList.filter((moneyAccount) => moneyAccount.id !== action.payload.moneyAccountId);
      });
    },

    editMoneyAccount: (
      state,
      action: PayloadAction<{
        moneyAccountId: number,
        moneyAccountName: string,
        organisationId: number,
        balance: number,
        numberOfAccount: string
      }>
    ) => {

      state.organisations.forEach((organisation) => {
        organisation.moneyAccountList.forEach((moneyAccount) => {
          if (moneyAccount.id === action.payload.moneyAccountId) {
            moneyAccount.name = action.payload.moneyAccountName;
            moneyAccount.balance = action.payload.balance;
            moneyAccount.numberOfAccount = action.payload.numberOfAccount;
          }
        })
      });
    },

    changeMoneyAccount: (
      state,
      action: PayloadAction<{
        id: number;
        amount: number;
        operation: "increase" | "decrease";
      }>
    ) => {
      for (const organisation of state.organisations) {
        const foundMoneyAccount = organisation.moneyAccountList.find(
          (moneyAccount) => moneyAccount.id === action.payload.id
        );

        if (foundMoneyAccount) {
          switch (action.payload.operation) {
            case "increase":
              foundMoneyAccount.balance += action.payload.amount;
              break;
            case "decrease":
              foundMoneyAccount.balance -= action.payload.amount;
              break;
          }
        }
      }
    },
  },
});

export default organisationsSlice.reducer;

export const {
  addOrganisations,
  addOrganisation,
  addMoneyAccount,
  changeMoneyAccount,
  removeOrganisation,
  editOrganisation,
  removeMoneyAccount,
  editMoneyAccount,
} = organisationsSlice.actions;
