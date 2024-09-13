import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

interface LoginProps{
  email:string; password:string
}

interface Props{
   email: string; name: string; password: string; navigate: any 
}

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async({email,password}:LoginProps, {rejectWithValue})=>{
    try{
      const res = await api.post("/auth/login", {email,password})
      //성공
      const token = res.data.token;
      // 1. local storage - 브라우저를 끄거나 새로고침해도 유지가 됌 2. session storage - 특정 기간 동안만 유지 , 새로고침해도 유지가 되지만 끄면 사라짐
      sessionStorage.setItem("token", token);
      //LoginPage
      return res.data
    }catch(err:any){
      // 실패
      // 실패시 생긴 에러값을 reducer에 저장
      return rejectWithValue(err.error)
    }
  }
)


// createAsyncThunk 함수 3가지 반환함=> pending 비동기 작업이 시작, fulfilled 비동기 작업이 성공, rejected 비동기 작업이 실패했을 때 발생  
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate }:Props,
    { dispatch, rejectWithValue }
  ) => {try{
    const res = await api.post("/user", {name,email,password})
    // 성공
    dispatch(showToastMessage({message:"회원가입을 완료하였습니다.", status:"success"}))
    navigate('/login')

    // axios는 기본적으로 data라는 객체로 내줌 , 그리고 백엔드에서 data로 return하게 설정했으므로 data.data가 됌
    return res.data.data
  }catch(err:any){
    dispatch(showToastMessage({message:"회원가입을 실패하였습니다.", status:"error"}))
    return rejectWithValue(err.error)
  }}
);

export const loginWithToken = createAsyncThunk(
  // _ 인 이유는 id, password같은 정보가 없다 , token으로 받아옴
  "user/loginWithToken", async(_, {rejectWithValue})=>{
    try{
      const res = await api.get("/user/me")
      return res.data
    }catch(err:any){
      return rejectWithValue(err.error)
    }
  }
)

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    sessionStorage.removeItem("token");
    dispatch(clearUser());
  }
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
    clearUser:(state)=>{
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state)=>{
        state.loading=true
    }).addCase(registerUser.fulfilled, (state)=>{
        state.loading=false
        state.registrationError=null})
        .addCase(registerUser.rejected, (state:any, action)=>{
        state.registrationError=action.payload
    }).addCase(loginWithEmail.pending, (state)=>{
      state.loading=true
    }).addCase(loginWithEmail.fulfilled,(state,action)=>{
      state.loading=false;
      state.user = action.payload.user
      state.loginError=null
    }).addCase(loginWithEmail.rejected,(state,action:any)=>{
      state.loading=false
      state.loginError = action.payload;
    }).addCase(loginWithToken.fulfilled, (state,action)=>{
      state.user = action.payload.user
    }).addCase(logout.fulfilled, (state)=>{
      state.user = null
    })

  },
});
export const { clearErrors,clearUser } = userSlice.actions;
export default userSlice.reducer;

// reducers 는 async 없이 직접적으로 아이템을 호출할때 
// extraReduceers 는 async 처럼 외부의 함수를 통해서 호출을 할때