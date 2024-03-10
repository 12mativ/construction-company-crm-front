import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectStatusType } from "../projects/projectsSlice";
import { findEqualItemsById } from "@/lib/store";
import { RoleType } from "@/http/roles-manage/rolesManageAPI";
import { AuthorityType } from "@/http/user/userAPI";

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
  authorities: AuthorityType[];
  roles: RoleType[];
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
    editUserRoles: (state, action: PayloadAction<{
      email: string,
      roles: RoleType[]
    }>) => {
      state.users.forEach((user) => {
        if (user.email == action.payload.email) {
          user.roles = action.payload.roles;
        }
      })
    },
  },
});

export default usersSlice.reducer;

export const { addUsers, addUser, editUserRoles } = usersSlice.actions;
