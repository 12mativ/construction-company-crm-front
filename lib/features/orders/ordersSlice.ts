import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResourceEntity } from "../works-groups/worksGroupsSlice";

export type OrderType = "PAID" | "NOT_PAID";

export interface IOrder {
  id: number,
  partnerId: number,
  projectId: number,
  queryEntityList: {
    id: number,
    factQuantity: number,
    factCostPerUnit: number,
    factCostPrice: number,
    profit: number,
    needDate: string,
    resourceEntity: IResourceEntity
    ordered: boolean
  }[],
  creationDate: string,
  paymentDate: string,
  factPaymentDate: string,
  profit: number,
  orderType: OrderType,
  costPrice: number,
  factCostPrice: number,
  description: string
}

interface IOrdersState {
  orders: IOrder[];
}

const initialState: IOrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },

    addOrder: (state, action: PayloadAction<IOrder>) => {
      if (!findEqualItemsById(state.orders, action.payload.id)) {
        state.orders.push(action.payload);
      }
    },
    removeOrder: (state, action: PayloadAction<{orderId: number}>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload.orderId);
    },
  },
});

export default ordersSlice.reducer;

export const {
  addOrder,
  addOrders,
  removeOrder
} = ordersSlice.actions;
