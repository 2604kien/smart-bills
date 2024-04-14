import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backEndServer, getConfig } from "../server/server";
import axios from "axios";

const friendRequestAdapter=createEntityAdapter();
const initialState=friendRequestAdapter.getInitialState({});
export const sendFriendRequest=createAsyncThunk<{message:string, data?:Object}, {data:Object, token:string}>('friendRequest/sendFriendRequest', async ({data, token})=>{
    const response=await axios.post(backEndServer+'friend-request', data,getConfig(token));
    return response.data;
})
const friendRequestSlice=createSlice({
    name:'friendRequest',
    initialState,
    reducers:{},
    extraReducers:builder=>{},
})
export default friendRequestSlice.reducer;