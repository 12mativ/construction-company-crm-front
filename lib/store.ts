import { resourcesPatternsSlice } from './features/resources-patterns/resourcesPatternsSlice';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectsReducer from "./features/projects/projectsSlice";
import resourcesPatternsReducer from "./features/resources-patterns/resourcesPatternsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { userReducer, projectsReducer, resourcesPatternsReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
