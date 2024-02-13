import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectType = {
  id: number
  name: string;
  startDate: string;
  endDate: string;
  totalWorkQuantity: number;
  doneWorkQuantity: number;
}

interface IProjectsState {
  projects: ProjectType[];
}

const initialState: IProjectsState = {
  projects: []
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    addProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.projects = action.payload;
    },

    addProject: (state, action: PayloadAction<ProjectType>) => {
      state.projects.push(action.payload);
    },
  },
});

export default projectsSlice.reducer;

export const { addProjects, addProject } = projectsSlice.actions;