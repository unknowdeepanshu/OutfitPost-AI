import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetProjects } from "./projectThunk";

interface ProjectCreated {
  ProjectName: string;
  ProjectId: string;
}
const initialState: ProjectCreated[] = [];
export const projectCreationSlice = createSlice({
  name: "Project create",
  initialState,
  reducers: {
    CreateProjectS: (state, action: PayloadAction<ProjectCreated>) => {
      state.push(action.payload);
    },
    DeleteProject: (state, action: PayloadAction<string>) => {
      return state.filter((project) => project.ProjectId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetProjects.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { CreateProjectS, DeleteProject } = projectCreationSlice.actions;
export default projectCreationSlice.reducer;
