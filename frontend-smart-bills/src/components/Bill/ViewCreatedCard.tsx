import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteBill } from "../../reducers/billReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
//ViewCreatedCard that will be used in created bill page
export default function ViewCreatedCard(props:any){
    //initialize data, variable, method
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    //delete created bill
    const handleDelete=()=>{
        const confirm=window.confirm('Please confirm you want to delete this bill?')
        if(confirm){
            dispatch(deleteBill({id:props.data.id, token}))
            window.location.reload();
        }       
    }
    //return the created bill card
    return(
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
            background:"white"
        }}>
            <div className="flex flex-col justify-center items-center">
                <i className="fa-solid fa-receipt" style={{fontSize:"8rem", color:"green"}}></i>
            </div>
            <div className="flex flex-col justify-center items-center" style={{fontSize:"1.3rem"}}>
                 <h1 style={{fontWeight:"600", fontSize:"1.5rem"}}>Title: {props.data.title}</h1>
                 <h1>Time: {moment(props.data.date).format('HH:mm | DD-MM-YYYY')}</h1>
                 <h1>Paid By: {props.data.creator.fullName}</h1>
                 <h1>Total Cost: ${props.data.totalCost}</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <button className="border-black border-2 bg-black text-white hover:bg-white hover:text-black duration-300" style={{
                    fontSize:"1.5rem",
                    borderRadius:"15px",
                    height:"60px",
                    width:"100px"
                }} onClick={()=>navigate(`/bill/edit/${props.data.id}`)}>Edit</button>
                <button className="border-red-600 hover:border-black border-2  bg-red-600 text-white hover:bg-white hover:text-black duration-300" style={{
                    fontSize:"1.5rem",
                    height:"60px",
                    borderRadius:"15px",
                    width:"100px"
                }} onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}