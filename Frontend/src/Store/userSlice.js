import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return {};
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
