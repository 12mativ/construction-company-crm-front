import { RoleType } from "@/http/roles-manage/rolesManageAPI";
import { AuthorityType } from "@/http/user/userAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectStatusType } from "../projects/projectsSlice";

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
  projectEntityList: IProject;
  authorities: AuthorityType[];
  roles: RoleType[];
}

interface IUsersState {
  globalUsers: IUser[];
}

const initialState: IUsersState = {
  globalUsers: []
};

export const globalUsersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addGlobalUsers: (state, action: PayloadAction<IUser[]>) => {
      state.globalUsers = action.payload;
    },
    editUserRoles: (state, action: PayloadAction<{
      email: string,
      roles: RoleType[]
    }>) => {
      state.globalUsers.forEach((user) => {
        if (user.email == action.payload.email) {
          user.roles = action.payload.roles;
        }
      })
    },
  },
});

export default globalUsersSlice.reducer;

export const { addGlobalUsers, editUserRoles } = globalUsersSlice.actions;
