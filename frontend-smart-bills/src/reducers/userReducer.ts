import { createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";
const userAdapter=createEntityAdapter();
export const getAllUserData:Object=async (token:string) => {
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(backEndServer, config);
    return response.data;
}
const initialState=userAdapter.getInitialState();
export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{}
})

export default userSlice.reducer;