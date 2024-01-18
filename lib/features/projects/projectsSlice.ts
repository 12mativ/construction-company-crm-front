import { ProjectType } from "@/components/project/projects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectsState {
  projects: ProjectType[];
}

const initialState: ProjectsState = {
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