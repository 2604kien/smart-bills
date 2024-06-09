import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const serverStatusAdapter=createEntityAdapter();
const initialState=serverStatusAdapter.getInitialState({
    status:"idle"
});
const serverStatusSlice=createSlice({
    name:'serverStatus',
    initialState,
    reducers:{
        setStatusPending: (state)=>{
            state.status="pending"
        },
        setStatusSuccess:(state)=>{
            state.status="success"
        },
        setStatusIdle:(state)=>{
            state.status="idle"
        }
    }
})
export default serverStatusSlice.reducer;
export const {setStatusIdle, setStatusPending, setStatusSuccess}=serverStatusSlice.actions;