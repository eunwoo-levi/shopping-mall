import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        ui:uiSlice
    }
})


export default store

// redux toolkit: 초기세팅때 index.tsx에서 <Provide store={store}> ~~ </Provide> 로 감싸야함

// store: 어플리케이션의 상태를 관리하는 중앙 저장소
// configureStore : Redux 의 Store를 설정하는 함수 , 기본적으로 middleware, devTools 설정이 포함 -> Redux 스토어 설정을 쉽게 만들어줌

// reducer: state(상태)를 업데이트하는 순수 함수 - 이전 state와 action을 받아 새로운 state를 반환   / 모든 상태 변경은 reducer를 통해 이루어짐

// createSlice: reducer와 action 을 한 번에 생성하는 도구 - 특정 기능에 대한 상태 관리 로직을 간결하게 작성하게 해줌.  
// ㄴ name, initialState, reducers 반환 + actions (각 reducer 함수에 대응하는 action 생성자)

// createAsyncThunk: 비동기 작업을 처리하는 redux 도구 -  비동기 요청을 만들고, pending, fulfilled, rejected의 세 가지 상태를 자동으로 관리
// ㄴ 서버와의 통신 , API 호출 같은 비동기 작업을 Redux에서 쉽게 처리할 수 있게 해줌

// dispatch: action 을 (Redux) store에 보내는 함수 - 컴포넌트에서 state(상태)를 변경하기 위해 action을 dispatch 함
// ㄴ action 객체를 reducer로 전달하여 상태 변경을 트리거함

// useSelector: store 에서 state(상태)를 읽어오는 훅  /  컴포넌트가 store의 상태를 구독하고 state가 변경될 때 마다 자동으로 다시 렌덜링됌 - 불필요한 렌더링 방지

