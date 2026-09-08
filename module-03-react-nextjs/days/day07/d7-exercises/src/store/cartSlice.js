import { createSlice } from "@reduxjs/toolkit";

// EXERCISE 7 — Redux Toolkit slice.
// This is intentionally NOT connected to React, matching the original exercise.
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    remove: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
