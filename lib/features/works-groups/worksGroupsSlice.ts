import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResourceType } from "../resources-patterns/resourcesPatternsSlice";

export interface IResourceEntity {
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
    addWorksGroup: (state, action: PayloadAction<IWorkGroup>) => {
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
      const currentWorkGroup = state.worksGroups.find(
        (worksGroup) => worksGroup.id === action.payload.worksGroupId
      );

      if (
        !findEqualItemsById(currentWorkGroup?.workEntityList, action.payload.id)
      ) {
        currentWorkGroup?.workEntityList.push(action.payload);
      }
    },
    addResourceToWork: (state, action: PayloadAction<IResourceEntity>) => {
      state.worksGroups.forEach((worksGroup) => {
        worksGroup.workEntityList.forEach((workEntity) => {
          if (workEntity.id === action.payload.workId) {
            if (
              !findEqualItemsById(
                workEntity.resourceEntityList,
                action.payload.id
              )
            ) {
              workEntity.resourceEntityList.push(action.payload);
            }
          }
        });
      });
    },
    removeWork: (state, action: PayloadAction<{ work_id: number }>) => {
      state.worksGroups.forEach((workGroup) => {
        workGroup.workEntityList = workGroup.workEntityList.filter(
          (work) => work.id !== action.payload.work_id
        );
      });
    },
    editWork: (
      state,
      action: PayloadAction<{
        work_id: number;
        workName: string;
        workNumber: number;
        quantity: number;
        measureUnit: string;
        startDate: string;
        endDate: string;
        worksGroupId: number;
      }>
    ) => {
      state.worksGroups.forEach((workGroup) => {
        workGroup.workEntityList.forEach((work) => {
          if (work.id === action.payload.work_id) {
            work.name = action.payload.workName;
            work.number = action.payload.workNumber;
            work.quantity = action.payload.quantity;
            work.measureUnit = action.payload.measureUnit;
            work.startDate = action.payload.startDate;
            work.endDate = action.payload.endDate;
            work.worksGroupId = action.payload.worksGroupId;
          }
        });
      });
    },
    editResource: (
      state,
      action: PayloadAction<IResourceEntity>
    ) => {
      state.worksGroups.forEach((workGroup) => {
        workGroup.workEntityList.forEach((work) => {
          if (work.id === action.payload.workId) {
            work.resourceEntityList.forEach((resourceEntity) => {
              if (resourceEntity.id === action.payload.id) {
                resourceEntity.name = action.payload.name
                resourceEntity.measureUnit = action.payload.measureUnit
                resourceEntity.quantity = action.payload.quantity
                resourceEntity.costPricePerUnit = action.payload.costPricePerUnit
                resourceEntity.orderPricePerUnit = action.payload.orderPricePerUnit
                resourceEntity.extraCharge = action.payload.extraCharge
                resourceEntity.costPrice = action.payload.costPrice
                resourceEntity.orderPrice = action.payload.orderPrice
                resourceEntity.resourceType = action.payload.resourceType
                resourceEntity.workId = action.payload.workId
              }
            })
          }
        });
      });
    },
    removeResource: (
      state,
      action: PayloadAction<IResourceEntity>
    ) => {
      state.worksGroups.forEach((workGroup) => {
        workGroup.workEntityList.forEach((work) => {
          if (work.id === action.payload.workId) {
            work.resourceEntityList = work.resourceEntityList.filter((resourceEntity) => resourceEntity.id !== action.payload.id)
          }
        });
      });
    },
  },
});

export default worksGroupsSlice.reducer;

export const {
  addWorksGroups,
  addWorksGroup,
  removeWorksGroup,
  editWorksGroup,
  addWork,
  addResourceToWork,
  removeWork,
  editWork,
  editResource,
  removeResource
} = worksGroupsSlice.actions;
