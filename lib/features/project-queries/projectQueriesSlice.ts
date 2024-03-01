import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourceType } from "../resources-patterns/resourcesPatternsSlice";

interface IResource {
  id: number;
  name: string;
  measureUnit: string;
  quantity: number;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  costPrice: number;
  orderPrice: number;
  resourceType: ResourceType;
  workId: number;
}

type ProjectQueryType = {
  id: number;
  factQuantity: number;
  factCostPerUnit: number;
  factCostPrice: number;
  profit: number;
  needDate: string;
  resourceEntity: IResource;
};

interface IProjectQueriesState {
  projectQueries: ProjectQueryType[];
}

const initialState: IProjectQueriesState = {
  projectQueries: [],
};

export const projectQueriesSlice = createSlice({
  name: "projectQueries",
  initialState: initialState,
  reducers: {
    addProjectQueries: (state, action: PayloadAction<ProjectQueryType[]>) => {
      state.projectQueries = action.payload;
    },
  },
});

export default projectQueriesSlice.reducer;

export const { addProjectQueries } = projectQueriesSlice.actions;
