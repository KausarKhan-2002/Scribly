import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});
export default store;
