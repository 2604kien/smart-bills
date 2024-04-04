import React from "react";
import { useNavigate } from "react-router-dom";
export default function MenuItem(props:{item:string, itemName:string, navigation:string, handleMenuClick:()=>void}){
    const navigate=useNavigate();
    return(
        <div className="w-full cursor-pointer flex flex-col justify-center items-center" onClick={()=>{
            props.handleMenuClick();
            navigate(props.navigation);
        }} style={{
            height:"fit-content"
        }}>
            <i className={props.item}></i>
            <h1 className="select-none">{props.itemName}</h1>
        </div>
    )
}