import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backEndServer, getConfig } from "../server/server";
import axios from "axios";

const billAdapter=createEntityAdapter();
const initialState=billAdapter.getInitialState({
    oweList:[],
    paidList:[]
});

//get all created bill
export const getAllCreatedBill=createAsyncThunk<{message:string, data?:Object}, {id:string, token:string}>('bill/getAllCreatedBill', async({id, token})=>{
    const response=await axios.get(backEndServer+`bill/${id}`, getConfig(token));
    return response.data;
})
export const createNewBill=createAsyncThunk<{message:string, data?:Object},{data:any, token:string}>('bill/createNewBill',async({data, token})=>{
    console.log(data);
    const response=await axios.post(backEndServer+`bill`, data, getConfig(token));
    return response.data;
})
export const getOweBill=createAsyncThunk<{message:string, data?:Object}, {data:any, token:string}>('bill/getOweBill', async({data, token})=>{
    const response=await axios.post(backEndServer+`user-owe/get-list`, data, getConfig(token));
    return response.data;
})
export const getPaidBill=createAsyncThunk<{message:string, data?:Object},{data:any, token:string}>('bill/getPaidBill', async({data,token})=>{
    const response=await axios.post(backEndServer+`user-paid/get-list`, data,getConfig(token));
    return response.data;
})
export const getOweBillSettle=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('bill/getOweBillSettle',async({id,token})=>{
    const response=await axios.get(backEndServer+`user-owe/settle/${id}`, getConfig(token));
    return response.data;
})
export const deleteUserPaid=createAsyncThunk<{message:string, data?:Object}, {id:number, token:string}>('bill/deleteUserPaid', async({id, token})=>{
    const response=await axios.delete(backEndServer+`user-paid/${id}`, getConfig(token));
    return response.data;
})
const billSlice=createSlice({
    name:'bill',
    initialState,
    reducers:{},
    extraReducers: builder=>{
        builder.addCase(getOweBill.fulfilled, (state,action:any)=>{
            state.oweList=action.payload;
        })
        .addCase(getPaidBill.fulfilled,(state, action:any)=>{
            state.paidList=action.payload;
        })
    }
})
export default billSlice.reducer;