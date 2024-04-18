import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backEndServer, getConfig } from "../server/server";
import axios from "axios";

const billAdapter=createEntityAdapter();
const initialState=billAdapter.getInitialState({});

//get all created bill
export const getAllCreatedBill=createAsyncThunk<{message:string, data?:Object}, {id:string, token:string}>('bill/getAllCreatedBill', async({id, token})=>{
    const response=await axios.get(backEndServer+`bill/${id}`, getConfig(token));
    return response.data;
})

const billSlice=createSlice({
    name:'bill',
    initialState,
    reducers:{},
    extraReducers: builder=>{

    }
})
export default billSlice.reducer;