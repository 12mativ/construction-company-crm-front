import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWorksProgress {
  id: number;
  quantityBefore: number;
  quantityAfter: number;
  timestamp: string;
  workId: number;
  imageIdsList: string[];
}

interface IWorksProgressState {
  worksProgress: IWorksProgress[];
}

const initialState: IWorksProgressState = {
  worksProgress: [],
};

export const worksProgressSlice = createSlice({
  name: "worksProgress",
  initialState: initialState,
  reducers: {
    addWorksProgress: (state, action: PayloadAction<IWorksProgress[]>) => {
      state.worksProgress = action.payload;
    }, 
    addWorkProgress: (state, action: PayloadAction<IWorksProgress>) => {
      if (!findEqualItemsById(state.worksProgress, action.payload.id)) {
        state.worksProgress.push(action.payload);
      }
    }, 
  },
});

export default worksProgressSlice.reducer;

export const { addWorksProgress } =
  worksProgressSlice.actions;
