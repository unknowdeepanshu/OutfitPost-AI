import { api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetProjects = createAsyncThunk(
  "projectCreation/GetProjects",
  async (__, { rejectWithValue }) => {
    try {
      // console.log("this is token", token);
      const response = await api.get(`/conversations/listMessage`);
      const messages = response.data.data.messages;

      const projects = messages.map(
        (message: { messageId: string; messageName: string }) => ({
          ProjectId: message.messageId,
          ProjectName: message.messageName,
        }),
      );
      console.log("messa", projects);
      //   dispatch(ListProject(projects));

      return projects;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ?? "Failed to fetch projects",
      );
    }
  },
);
