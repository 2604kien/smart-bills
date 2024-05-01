import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getBillById } from "../../reducers/billReducer";
import { useParams } from "react-router-dom";
export default function EditBill(){
    const dispatch=useAppDispatch();
    const {id}=useParams();
    const token=useAppSelector(state=>state.auth.accessToken);
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const currBill=useAppSelector(state=>state.bill.currBill);
    React.useEffect(()=>{
        if(isAuthenticated){
            dispatch(getBillById({id:Number(id), token}))
        }
    },[isAuthenticated])
    console.log(currBill);
    return(
        <div>
            <h1>Edit Bill Page</h1>
        </div>
    )
}