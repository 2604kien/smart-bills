import { createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { backEndServer } from "../server/server";
type Register={
    username:string,
    fullName:string,
    password:string,
    email:string
}

const userAdapter=createEntityAdapter();
//get all user data (only for admin user)
export const getAllUserData=createAsyncThunk('user/getAllUserData',async (token:string) => {
   
    const response=await axios.get(backEndServer, getConfig(token));
    return response.data;
})
//get user by id
export const getUserById=createAsyncThunk<{message:string, data?:string}, {id:number, token:string}, {rejectValue:string}>('user/getUserById', async({id, token})=>{
    const response=await axios.get(backEndServer+`user/${id}`, getConfig(token));
    return response.data;
})
//register new user
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
    message:"",
    currentUser:{
        id:0,
        username:"",
        fullName:"",
        email:"",
        balance:0,
        roles:[],
        oweList:[],
        paidList:[],
        createdBillList:[],
        phoneNumber:"",
    }
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
        .addCase(getUserById.fulfilled, (state, action:any)=>{
            state.currentUser=action.payload.data;
        })
    },
})
const getConfig=(token:string)=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config;
}
export default userSlice.reducer;