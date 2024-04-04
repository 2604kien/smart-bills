import { createSlice, createEntityAdapter, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";
type Register={
    username:string,
    fullName:string,
    password:string,
    email:string
}
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
export const createNewUser=createAsyncThunk<{message:string, data?:string}, Register, {rejectValue:string}>('user/createNewUser',async(data:Register,{rejectWithValue})=>{
    try{
        const response=await axios.post(backEndServer+'user', data);
        return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.response.data)
    }
})
const initialState=userAdapter.getInitialState({
    status:'idle',
    message:""
});
export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(createNewUser.fulfilled, (state, action)=>{
            state.message=action.payload.message;
        })
        .addCase(createNewUser.rejected, (state, action:any)=>{
            state.message=action.payload.message;
        })
    },
})

export default userSlice.reducer;