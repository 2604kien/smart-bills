import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";

type Login={
    username:string,
    password:string,
    remember:boolean
}

const authAdapter=createEntityAdapter();
const initialState=authAdapter.getInitialState({
    isAuthenticated:false,
    accessToken:"",
    message:""
});

export const login= createAsyncThunk('auth/login', async(data:Login)=>{
    const response =await axios.post(backEndServer+'auth/login', data, {withCredentials:true});
    return response.data;
})
export const logout=createAsyncThunk('auth/logout', async()=>{
    const response=await axios.get(backEndServer+'auth/logout', {withCredentials:true});
    return response.data;
})
export const refresh=createAsyncThunk('auth/refresh', async()=>{
    const response=await axios.get(backEndServer+'auth/refresh', {withCredentials:true});
    return response.data;
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetMessage:(state)=>{
            state.message=""
        }
    },
    extraReducers:builder=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            state.accessToken=action.payload.data;
            state.message="Login successfully";
            state.isAuthenticated=true;
        })
        .addCase(login.rejected, (state, action:any)=>{
            if(action.error.message.includes("401")||action.error.message.includes("404")){
                state.message="Username/password incorrect!";
              
            }
            else{
                state.message="Something went wrong, please try again later" 
            }
        })
        .addCase(logout.fulfilled,(state, action)=>{
            state.isAuthenticated=false;
            state.accessToken="";
        })
        .addCase(refresh.fulfilled, (state, action)=>{
            if(action.payload.accessToken){
                state.isAuthenticated=true;
                state.accessToken=action.payload.accessToken;
            }
        })
    }
})
export default authSlice.reducer;
export const {resetMessage}=authSlice.actions;