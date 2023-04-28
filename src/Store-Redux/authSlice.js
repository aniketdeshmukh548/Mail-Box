import { createSlice } from "@reduxjs/toolkit";

const initalAuthState={isAuthenticated:false,token:'',localid:''}
const authSlice=createSlice({
    name:'auth',
    initialState:initalAuthState,
    reducers:{
        isLogin(state,action){
            state.token=action.payload;
            state.isAuthenticated=true;
        },
        isLogout(state,action){
            state.localid=action.payload;
            state.isAuthenticated=false;
        }
    }
})

export const authAction=authSlice.actions;
const authReducer= authSlice.reducer;

export default authReducer;