import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProjectCreated {
  ProjectName: string;
  ProjectId: string;
}
const initialState: ProjectCreated[] = [
  {
    ProjectName: "Dipanshu",
    ProjectId: "be0cf5aa-8326-4c35-a2db-6f97a15903a4",
  },
];
export const projectCreationSlice = createSlice({
  name: "Project create",
  initialState,
  reducers: {
    CreateProjectS: (state, action: PayloadAction<string>) => {
      state.push({
        ProjectName: action.payload,
        ProjectId: crypto.randomUUID(),
      });
    },
    DeleteProject: (state, action: PayloadAction<string>) => {
      return state.filter((project) => project.ProjectId !== action.payload);
    },
  },
});

export const { CreateProjectS, DeleteProject } = projectCreationSlice.actions;
export default projectCreationSlice.reducer;
