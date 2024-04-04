import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/BlackBackground.png";
export default function Navbar(){
    const navigate=useNavigate();
    return(
        <>
        <div className="h-20">

        </div>
        <div className="w-full sm:border-2 h-20 border-gray flex flex-row justify-between items-center bg-black text-white" style={{borderTop:"none", top:"0", borderLeft:"none", borderRight:"none", padding:"10px 5%", position:"fixed"}}>
            <img src={Logo} className="h-full cursor-pointer hover:brightness-50 duration-150" onClick={()=>navigate('/')}/>
            <input className="indent-2 border-gray sm:border-2 rounded-xl " placeholder="Search..." style={{width:"30%", maxWidth:"300px"}}/>
            <div style={{fontSize:"1.5rem", gap:"20px"}} className="flex flex-row justify-between items-center">
                <i className="fa-solid fa-bell cursor-pointer hover:brightness-50 duration-150"></i>
                <i className="fa-solid fa-gear cursor-pointer hover:brightness-50 duration-150"></i>
                <i className="fa-solid fa-user cursor-pointer hover:brightness-50 duration-150"></i>
            </div>
        </div>
        </>
        
    )
}