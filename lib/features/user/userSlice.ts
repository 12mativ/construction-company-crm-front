import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  username: string;
  role: string;
  isAuth: boolean;
}

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    username: "",
    role: "",
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
  },
});


export default userSlice.reducer;

export const { makeAuth } = userSlice.actions;