import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/BlackBackground.png";
import { useAppSelector } from "../../app/hooks";
export default function BillCard(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const element=isAuthenticated?(
        <div className="flex flex-col justify-center items-center" style={{
            gap:"20px",
        }}>
            <h1 onClick={()=>navigate("/bill/new")} className="cursor-pointer">Add New Bill</h1>
            <h1 className="cursor-pointer">View Owed Bill</h1>
            <h1 className="cursor-pointer">View Paid Bill</h1>
        </div>
    ):(
        <div className="flex flex-col justify-center items-center">     
            <h1>Unauthorized!!!</h1>
        </div>
    )
    return (
        <div className="duration-300" style={{
                display:"grid",
                gridTemplateRows:"9% 35% 50%",
                transition:"all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)",
                animation:"slideDown 0.5s forwards",
                backgroundColor:"#f0f0f0",
                position:"absolute", 
                left:"0px", width:"20%", 
                borderBottomRightRadius:"25px",
                zIndex:"5",
                background:"black",
                color:"white"
            }}>
            <div className="flex flex-col justify-center items-center">
                <img className="cursor-pointer" onClick={()=>navigate('/')} src={Logo} alt="logo" style={{scale:"0.6"}}/>
            </div>
            {element}
            
        </div>
    )
}