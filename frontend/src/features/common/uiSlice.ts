import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastMessage: { message: "", status: "" },
  // 'success', 'error', 'warning'
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToastMessage(state, action) {
      state.toastMessage = {
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    hideToastMessage(state:any) {
      state.toastMessage={message:"",status:""}
    },
  },
});

// action 객체는 type과 payload 등..  가지고 있다.
export const { showToastMessage, hideToastMessage } = uiSlice.actions;
export default uiSlice.reducer;