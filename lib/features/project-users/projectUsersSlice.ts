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

export interface IProjectUser {
  id: number;
  phoneNumber: string;
  email: string;
  projectEntityList: IProject;
  authorities: AuthorityType[];
  roles: RoleType[];
}

interface IProjectUsersState {
  users: IProjectUser[];
}

const initialState: IProjectUsersState = {
  users: [],
};

export const projectUsersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IProjectUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<IProjectUser>) => {
      if (!findEqualItemsById(state.users, action.payload.id)) {
        state.users.push(action.payload);
      }
    },
  },
});

export default projectUsersSlice.reducer;

export const { addUsers, addUser } = projectUsersSlice.actions;
