import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { loading: false, user: null },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    updateUser: () => {},

    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, setLoading } = userSlice.actions;
