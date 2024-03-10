import { RoleType } from "@/http/roles-manage/rolesManageAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  username: string;
  authorities: string[];
  roles: string[];
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