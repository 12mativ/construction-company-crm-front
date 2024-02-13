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
    addWorkProgressImage: (state, action: PayloadAction<{progressOfWorkId: number, imageId: string}>) => {
      const currentWorkProgress = state.worksProgress.find((workProgress) => workProgress.id === action.payload.progressOfWorkId);
      if (!findEqualItemsById(currentWorkProgress?.imageIdsList, action.payload.imageId)) {
        currentWorkProgress?.imageIdsList.push(action.payload.imageId);
      }
    }, 
  },
});

export default worksProgressSlice.reducer;

export const { addWorksProgress, addWorkProgress, addWorkProgressImage } =
  worksProgressSlice.actions;
