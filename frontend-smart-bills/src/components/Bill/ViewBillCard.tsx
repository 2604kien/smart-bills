import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteUserPaid, getOweBillSettle } from "../../reducers/billReducer";
export default function ViewBillCard(props:any){

    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const handleDelete=()=>{
        const confirmMsg=window.confirm("Are you sure to delete this paid history?");
        if(confirmMsg){
            dispatch(deleteUserPaid({id:props.data.id, token}));
            window.location.reload();
        }
        
    }
    const handleSettle=()=>{
        const confirmMsg=window.confirm("Are you sure you have settle this bill?");
        if(confirmMsg){
            dispatch(getOweBillSettle({id:props.data.id, token}))
            window.location.reload();
        }
    }
    const buttonElement=props.isPaid?(
        <button className="bg-red-600 text-white hover:bg-white hover:text-black duration-300" style={{
            border:"2px solid white",
            cursor:"pointer",
            height:"100px",
            width:"100px",
            fontSize:"1.5rem",
            borderRadius:"50%"

        }} onClick={handleDelete}>Delete</button>
    ):(
        <button className="bg-black text-white hover:bg-white hover:text-black duration-300" style={{
            border:"2px solid white",
            cursor:"pointer",
            height:"100px",
            width:"100px",
            fontSize:"1.5rem",
            borderRadius:"50%"

        }} onClick={handleSettle}>Settle</button>
    )
    return (
        <div style={{
            height:"200px",
            border:"1px solid black",
            width:"60%",
            marginBottom:"20px",
            borderRadius:"15px",
            padding:"10px",
            zIndex:"50",
            display:"grid",
            gridTemplateColumns:"20% 60% 20%",
            background:props.isPaid?"lightgreen":"rgba(255, 193, 195,0.5)"
        }}>
            <div className="flex flex-col justify-center items-center">
                <i className="fa-solid fa-receipt" style={{fontSize:"8rem", color:"green"}}></i>
            </div>
            <div className="flex flex-col justify-center items-center" style={{fontSize:"1.3rem"}}>
               {!props.isPaid?(
                <>
                 <h1 style={{fontWeight:"600", fontSize:"1.5rem"}}>Title: {props.data.bill?.title}</h1>
                 <h1>Date: {props.data.bill.date.split('T')[0].split("-").reverse().join("-")}</h1>
                 <h1>Created By: {props.data.bill.creator.fullName}</h1>
                 <h1>Total Cost: ${props.data.bill.totalCost}</h1>
                 <h1>Owe Amount: ${props.data.oweAmount}</h1>
                 </>
               ):<>
                <h1 style={{fontWeight:"600", fontSize:"1.5rem"}}>Title: {props.data.bill?.title}</h1>
                 <h1>Date: {props.data.bill.date.split('T')[0].split("-").reverse().join("-")}</h1>
                 <h1>Created By: {props.data.bill.creator.fullName}</h1>
                 <h1>Total Cost: ${props.data.bill.totalCost}</h1>
               </>}
            </div>
            <div className="flex flex-col justify-center items-center">
                {buttonElement}
            </div>
        </div>
    )
}