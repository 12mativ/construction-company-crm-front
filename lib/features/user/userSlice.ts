import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  username: string
  role: string;
  token: string
}

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null
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