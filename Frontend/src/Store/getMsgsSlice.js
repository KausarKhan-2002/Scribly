import { createSlice } from "@reduxjs/toolkit";

const getMsgsSlice = createSlice({
  name: "messages",
  initialState: null,
  reducers: {
    replaceMsgs: (state, action) => {
      return action.payload;
    },

    addMsg: (state, action) => {
      state.push(action.payload)
    }

  },
});

export const { replaceMsgs, addMsg } = getMsgsSlice.actions;
export default getMsgsSlice.reducer;
