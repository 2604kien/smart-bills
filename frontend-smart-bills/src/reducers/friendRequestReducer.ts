import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backEndServer, getConfig } from "../server/server";
import axios from "axios";
import {setStatusIdle, setStatusPending, setStatusSuccess} from "./serverStatusReducer";
const friendRequestAdapter=createEntityAdapter();
const initialState=friendRequestAdapter.getInitialState({
    friendList:[],
    friendRequestList:[],
    friendPendingList:[],
});
//send friend request to another user
export const sendFriendRequest=createAsyncThunk<{message:string, data?:Object}, {data:Object, token:string}>('friendRequest/sendFriendRequest', async ({data, token}, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.post(backEndServer+'friend-request', data,getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
//get the friend list of a user
export const getFriendList=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('friendRequest/getFriendList', async({id, token}, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+`friend-request/friend-list/${id}`, getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
//accept friend request of a user
export const acceptFriendRequest=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('friendRequest/acceptFriendRequet', async({id, token}, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+`friend-request/accept/${id}`, getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
//reject friend request
export const rejectFriendRequest=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('friendRequest/acceptFriendRequet', async({id, token}, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.delete(backEndServer+`friend-request/reject/${id}`, getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
//get friend request list
export const getFriendRequest=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('friend-request/getFriendRequest', async({id, token}, thunkAPI:any)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+`friend-request/request-list/${id}`, getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
//get pending request list
export const getPendingRequest=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('friend-request/getPendingRequest', async ({id, token}, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setStatusPending());
        const response=await axios.get(backEndServer+`friend-request/pending-list/${id}`, getConfig(token));
        thunkAPI.dispatch(setStatusSuccess());
        return response.data;        
    }catch (error:any) {
        thunkAPI.dispatch(setStatusIdle());
        return thunkAPI.rejectWithValue(error.response.data);
    }

})
const friendRequestSlice=createSlice({
    name:'friendRequest',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getFriendList.fulfilled, (state, action:any)=>{
            state.friendList=action.payload.data;
        })
        .addCase(getFriendRequest.fulfilled, (state, action:any)=>{
            state.friendRequestList=action.payload.data;
        })
        .addCase(getPendingRequest.fulfilled, (state, action:any)=>{
            state.friendPendingList=action.payload.data;
        })
    },
})
export default friendRequestSlice.reducer;