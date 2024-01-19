import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/projectsSlice";
import resourcesPatternsReducer from "./features/resources-patterns/resourcesPatternsSlice";
import counterpartiesReducer from "./features/counterparty/counterpartiesSlice";
import userReducer from "./features/user/userSlice";

export const findEqualItems = (array: any, item: any) => {
  const equalItem = array.find((el: any) => el.id === item.id);

  return equalItem;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      projectsReducer,
      resourcesPatternsReducer,
      counterpartiesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
