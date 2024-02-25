import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectStatusType } from "../projects/projectsSlice";
import { findEqualItemsById } from "@/lib/store";

interface IProject {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  totalWorkQuantity: number;
  doneWorkQuantity: number;
  projectStatus: ProjectStatusType;
}

export interface IUser {
  id: number;
  phoneNumber: string;
  email: string;
  recipientMoneyAccountId: number;
  projectEntityList: IProject;
}

interface IUsersState {
  users: IUser[];
}

const initialState: IUsersState = {
  users: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      if(!findEqualItemsById(state.users, action.payload.id)) {
        state.users.push(action.payload);
      }
    },
  },
});

export default usersSlice.reducer;

export const { addUsers, addUser } = usersSlice.actions;
