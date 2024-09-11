import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

interface Props{
   email: string; name: string; password: string; navigate: any 

}
// createAsyncThunk 함수 3가지 반환함=> pending 비동기 작업이 시작, fulfilled 비동기 작업이 성공, rejected 비동기 작업이 실패했을 때 발생  
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate }:Props,
    { dispatch, rejectWithValue }
  ) => {try{
    const res = await api.post("/user", {name,email,password})
    // 성공
    dispatch(showToastMessage({messages:"회원가입을 완료하였습니다.", status:"success"}))
    navigate('/login')

    // axios는 기본적으로 data라는 객체로 내줌 , 그리고 백엔드에서 data로 return하게 설정했으므로 data.data가 됌
    return res.data.data
  }catch(err:any){
    dispatch(showToastMessage({messages:"회원가입을 실패하였습니다.", status:"error"}))
    return rejectWithValue(err.error)
  }}
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state)=>{
        state.loading=true
    }).addCase(registerUser.fulfilled, (state)=>{
        state.loading=false
        state.registrationError=null})
        .addCase(registerUser.rejected, (state:any, action)=>{
        state.registrationError=action.payload
    })
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;

// reducers 는 async 없이 직접적으로 아이템을 호출할때 
// extraReduceers 는 async 처럼 외부의 함수를 통해서 호출을 할때