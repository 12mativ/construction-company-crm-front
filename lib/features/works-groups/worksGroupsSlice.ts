import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourceType } from "../resources-patterns/resourcesPatternsSlice";

interface IResourceEntity {
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

export interface IWorkEntity {
  id: number;
  name: string;
  number: number;
  quantity: number;
  measureUnit: string;
  costPricePerUnit: number;
  orderPricePerUnit: number;
  costPrice: number;
  orderPrice: number;
  extraCharge: number;
  doneQuantity: number;
  startDate: string;
  endDate: string;
  resourceEntityList: IResourceEntity[];
  done: boolean;
  worksGroupId: number;
}

export interface IWorkGroup {
  id: number;
  name: string;
  number: number;
  workEntityList: IWorkEntity[];
}

interface IResourcesGroupsState {
  worksGroups: IWorkGroup[];
}

const initialState: IResourcesGroupsState = {
  worksGroups: [],
};

export const worksGroupsSlice = createSlice({
  name: "worksGroups",
  initialState: initialState,
  reducers: {
    addWorksGroups: (state, action: PayloadAction<IWorkGroup[]>) => {
      state.worksGroups = action.payload;
    },
    addWorkGroup: (state, action: PayloadAction<IWorkGroup>) => {
      if (!findEqualItemsById(state.worksGroups, action.payload.id)) {
        state.worksGroups.push(action.payload);
      }
    },
    removeWorksGroup: (
      state,
      action: PayloadAction<{ works_group_id: number }>
    ) => {
      state.worksGroups = state.worksGroups.filter(
        (worksGroup) => worksGroup.id !== action.payload.works_group_id
      );
    },
    editWorksGroup: (
      state,
      action: PayloadAction<{
        works_group_id: number;
        worksGroupName: string;
      }>
    ) => {
      state.worksGroups.forEach((worksGroup) => {
        if (worksGroup.id === action.payload.works_group_id) {
          worksGroup.name = action.payload.worksGroupName;
        }
      });
    },


    addWork: (state, action: PayloadAction<IWorkEntity>) => {
      const currentWorkGroup = state.worksGroups.find((worksGroup) => worksGroup.id === action.payload.worksGroupId);

      if (!findEqualItemsById(currentWorkGroup?.workEntityList, action.payload.id)) {
        currentWorkGroup?.workEntityList.push(action.payload)
      }
    },
    
    addResourceToWork: (state, action: PayloadAction<IResourceEntity>) => {
      state.worksGroups.forEach((worksGroup) => {
        worksGroup.workEntityList.forEach((workEntity) => {
          if (workEntity.id === action.payload.workId) {
            if (!findEqualItemsById(workEntity.resourceEntityList, action.payload.id)) {
              workEntity.resourceEntityList.push(action.payload);
            }
          }
        })        
      })
    },
  },
});

export default worksGroupsSlice.reducer;

export const { addWorksGroups, addWorkGroup, removeWorksGroup, editWorksGroup, addWork, addResourceToWork } = worksGroupsSlice.actions;
