import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";
import {setStatusIdle, setStatusPending, setStatusSuccess} from "./serverStatusReducer";
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

export const login= createAsyncThunk('auth/login', async(data:Login, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response =await axios.post(backEndServer+'auth/login', data, {withCredentials:true});
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const logout=createAsyncThunk('auth/logout', async(_,thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+'auth/logout', {withCredentials:true});
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
export const refresh=createAsyncThunk('auth/refresh', async(_,thunkAPI:any)=>{
    try{
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+'auth/refresh', {withCredentials:true});
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;
    }
    catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }
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
            if(action.error.message.includes("401")||action.error.message.includes("404")||action.error.message.includes("Rejected")){
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
        .addCase(refresh.rejected, (state, action)=>{
            state.isAuthenticated=false;
            state.accessToken="";
            state.message="";
        })
    }
})
export default authSlice.reducer;
export const {resetMessage}=authSlice.actions;