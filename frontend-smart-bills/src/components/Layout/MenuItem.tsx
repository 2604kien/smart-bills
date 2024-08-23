import React from "react";
import { useNavigate } from "react-router-dom";
// display each Item in the menu item drop down
export default function MenuItem(props:{item:string, itemName:string, navigation:string, handleMenuClick:()=>void}){
    const navigate=useNavigate();
    return(
        <div className="p-3 hover:text-white duration-150 hover:brightness-50 w-full cursor-pointer flex flex-col justify-center items-center" onClick={()=>{
            props.handleMenuClick();
            navigate(props.navigation);
        }} style={{
            height:"fit-content",
            gap:"5px"
        }}>
            <i className={props.item} style={{scale:"1.5"}}></i>
            <h1 className="select-none">{props.itemName}</h1>
        </div>
    )
}