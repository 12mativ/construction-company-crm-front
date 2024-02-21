import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectStatusType = "PLANNING" | "INWORK" | "COMPLETED";

export type ProjectType = {
  id: number
  name: string;
  startDate: string;
  endDate: string;
  totalWorkQuantity: number;
  doneWorkQuantity: number;
  projectStatus: ProjectStatusType
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

    updateProject: (state, action: PayloadAction<ProjectType>) => {
      state.projects.forEach((project) => {
        if (project.id === action.payload.id) {
          project = action.payload;
        }
      })
    },
  },
});

export default projectsSlice.reducer;

export const { addProjects, addProject, updateProject } = projectsSlice.actions;