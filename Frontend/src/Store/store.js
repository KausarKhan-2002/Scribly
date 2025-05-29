import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";
import messagesReducer from "./getMsgsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    messages: messagesReducer,
  },
});
export default store;
