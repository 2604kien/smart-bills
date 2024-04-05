import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";
import { stat } from "fs";

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
            state.accessToken=action.payload;
            state.message="Login successfully";
            state.isAuthenticated=true;
        })
        .addCase(login.rejected, (state, action)=>{
            state.message="Username/password incorrect!";
        })
    }
})
export default authSlice.reducer;
export const {resetMessage}=authSlice.actions;