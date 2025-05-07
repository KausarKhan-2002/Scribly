import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    replaceTask: (state, action) => {
      return action.payload;
    },

    addTasks: (state, action) => {
      const newTask = action.payload;
      if (newTask) {
        state.push(newTask);
      }
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      if (taskId) {
        const filter = state.filter((task) => task._id != taskId);
        return filter;
      }
    },
  },
});

export default tasksSlice.reducer;
export const { replaceTask, addTask, deleteTask } = tasksSlice.actions;
