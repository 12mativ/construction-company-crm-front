import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResourceType = "HUMAN" | "MECHANICAL" | "MATERIAL" | "INVOICES";

export interface IResourcePattern {
  id: number;
  resourceType: ResourceType;
  name: string;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  measureUnit: string;
}

interface IResourceGroup {
  type: ResourceType;
  name: string;
  resources: IResourcePattern[];
}

interface IResourcesGroupsState {
  resourcesPatterns: IResourceGroup[];
}

const initialState: IResourcesGroupsState = {
  resourcesPatterns: [
    {
      type: "HUMAN",
      name: "Рабочие",
      resources: [],
    },
    {
      type: "MECHANICAL",
      name: "Механизмы",
      resources: [],
    },
    {
      type: "MATERIAL",
      name: "Материалы",
      resources: [],
    },
    {
      type: "INVOICES",
      name: "Накладные",
      resources: [],
    },
  ],
};

export const resourcesPatternsSlice = createSlice({
  name: "resourcesPatterns",
  initialState: initialState,
  reducers: {
    addResourcesPatterns: (
      state,
      action: PayloadAction<IResourcePattern[]>
    ) => {
      action.payload.forEach((resource) => {
        switch (resource.resourceType) {
          case "HUMAN":
            if (
              !findEqualItemsById(
                state.resourcesPatterns[0].resources,
                resource.id
              )
            ) {
              state.resourcesPatterns[0].resources.push({ ...resource });
            }
            break;

          case "MECHANICAL":
            if (
              !findEqualItemsById(
                state.resourcesPatterns[1].resources,
                resource.id
              )
            ) {
              state.resourcesPatterns[1].resources.push({ ...resource });
            }
            break;

          case "MATERIAL":
            if (
              !findEqualItemsById(
                state.resourcesPatterns[2].resources,
                resource.id
              )
            ) {
              state.resourcesPatterns[2].resources.push({ ...resource });
            }
            break;

          case "INVOICES":
            if (
              !findEqualItemsById(
                state.resourcesPatterns[3].resources,
                resource.id
              )
            ) {
              state.resourcesPatterns[3].resources.push({ ...resource });
            }
            break;
        }
      });
    },

    addResourcePattern: (state, action: PayloadAction<IResourcePattern>) => {
      switch (action.payload.resourceType) {
        case "HUMAN":
          state.resourcesPatterns[0].resources.push({ ...action.payload });
          break;
        case "MECHANICAL":
          state.resourcesPatterns[1].resources.push({ ...action.payload });
          break;
        case "MATERIAL":
          state.resourcesPatterns[2].resources.push({ ...action.payload });
          break;
        case "INVOICES":
          state.resourcesPatterns[3].resources.push({ ...action.payload });
          break;
      }
    },

    removeResourcePattern: (
      state,
      action: PayloadAction<{ resourcePatternId: number }>
    ) => {
      state.resourcesPatterns.forEach((pattern) => {
        pattern.resources = pattern.resources.filter(
          (resource) => resource.id !== action.payload.resourcePatternId
        );
      });
    },

    editResourcePattern: (state, action: PayloadAction<IResourcePattern>) => {
      state.resourcesPatterns.forEach((resourcePattern) => {
        if (resourcePattern.type === action.payload.resourceType) {
          resourcePattern.resources.forEach((resource) => {
            if (resource.id === action.payload.id) {
              resource.name = action.payload.name;
              resource.costPricePerUnit = action.payload.costPricePerUnit;
              resource.orderPricePerUnit = action.payload.orderPricePerUnit;
              resource.extraCharge = action.payload.extraCharge;
              resource.measureUnit = action.payload.measureUnit;
            }
          });
        }
      });
    },
  },
});

export default resourcesPatternsSlice.reducer;

export const {
  addResourcesPatterns,
  addResourcePattern,
  removeResourcePattern,
  editResourcePattern,
} = resourcesPatternsSlice.actions;
