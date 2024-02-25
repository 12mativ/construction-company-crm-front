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

    addResource: (state, action: PayloadAction<IResourcePattern>) => {
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

    removeResource: (
      state,
      action: PayloadAction<{ resourcePatternId: number }>
    ) => {
      state.resourcesPatterns.forEach((pattern) => {
        pattern.resources = pattern.resources.filter((resource) => resource.id !== action.payload.resourcePatternId);
      });
    },

    editResource: (
      state,
      action: PayloadAction<{ 
        resourcePatternId: number,
        resourcePatternName: string,
        costPricePerUnit: number,
        orderPricePerUnit: number,
        extraCharge: number,
        measureUnit: string,
        resourceType: ResourceType
      }>
    ) => {
      state.resourcesPatterns.forEach((pattern) => {
        pattern.resources.forEach((resource) => {
          if (resource.id === action.payload.resourcePatternId) {
            resource.name = action.payload.resourcePatternName;
            resource.costPricePerUnit = action.payload.costPricePerUnit;
            resource.orderPricePerUnit = action.payload.orderPricePerUnit;
            resource.extraCharge = action.payload.extraCharge;
            resource.measureUnit = action.payload.measureUnit;
            resource.resourceType = action.payload.resourceType;
          }
        });
      });
    },
  },
});

export default resourcesPatternsSlice.reducer;

export const { addResourcesPatterns, addResource, removeResource, editResource } =
  resourcesPatternsSlice.actions;
