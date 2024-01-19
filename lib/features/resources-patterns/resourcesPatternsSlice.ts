import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResourcePatternType =
  | "HUMAN"
  | "MECHANICAL"
  | "MATERIAL"
  | "INVOICES";

interface IResourcePattern {
  id: number;
  resourceType: ResourcePatternType;
  name: string;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  extraCharge: number;
  measureUnit: string;
}

interface IResourceGroup {
  type: ResourcePatternType;
  name: string;
  resources: IResourcePattern[];
}

interface ResourcesGroupsState {
  resourcesPatterns: IResourceGroup[];
}

const initialState: ResourcesGroupsState = {
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

const findEqualResource = (array: IResourcePattern[], resource: IResourcePattern) => {
  const equalResource = array.find((res) => res.id === resource.id);

  return equalResource;
};

export const resourcesPatternsSlice = createSlice({
  name: "resourcesPatterns",
  initialState: initialState,
  reducers: {
    addResourcesPatterns: (state, action: PayloadAction<IResourcePattern[]>) => {
      action.payload.forEach((resource) => {
        switch (resource.resourceType) {
          case "HUMAN":
            if (
              !findEqualResource(state.resourcesPatterns[0].resources, resource)
            ) {
              state.resourcesPatterns[0].resources.push({ ...resource });
            }
            break;

          case "MECHANICAL":
            if (
              !findEqualResource(state.resourcesPatterns[1].resources, resource)
            ) {
              state.resourcesPatterns[1].resources.push({ ...resource });
            }
            break;

          case "MATERIAL":
            if (
              !findEqualResource(state.resourcesPatterns[2].resources, resource)
            ) {
              state.resourcesPatterns[2].resources.push({ ...resource });
            }
            break;

          case "INVOICES":
            if (
              !findEqualResource(state.resourcesPatterns[3].resources, resource)
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
  },
});

export default resourcesPatternsSlice.reducer;

export const { addResourcesPatterns, addResource } =
  resourcesPatternsSlice.actions;
