import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});
// incrementByAmount: (state, action) => {
//   state.value += action.payload
// }
// Action creators are generated for each case reducer function
export const { setuser, logout } = counterSlice.actions;

export default counterSlice.reducer;

// const initialState = {
//     currentUser: null
// }

// export const user = (state = initialState, action) => {
//     return {
//         ...state,
//         currentUser: action.currentUser
//     }
// }
