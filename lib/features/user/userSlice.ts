import { RoleType } from "@/http/roles-manage/rolesManageAPI";
import { AuthorityType } from "@/http/user/userAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  username: string;
  authorities: AuthorityType[];
  roles: RoleType[];
  isAuth: boolean;
}

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    username: "",
    authorities: [],
    roles: [],
    isAuth: false,
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    makeAuth: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    editCurrentUserRoles: (state, action: PayloadAction<{
      roles: RoleType[]
    }>) => {
      state.user.roles = action.payload.roles
    },
  },
});


export default userSlice.reducer;

export const { makeAuth, editCurrentUserRoles } = userSlice.actions;