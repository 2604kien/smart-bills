import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/WhiteBackground.png";
import Menu from "./Menu";
export default function Navbar(){
    const navigate=useNavigate();
    const [isClick, setIsClick]=React.useState<boolean>(false);
    const hanndleMenuClick=()=>{
        setIsClick(prev=>!prev);
    }
    return(
        <div style={{position:"relative"}}>
        <div className="h-20">
        </div>
        <div className="select-none z-10 w-full sm:border h-20 border-gray flex flex-row justify-between items-center text-black" style={{borderTop:"none", top:"0", backgroundColor:"#f0f0f0", position:"fixed", borderLeft:"none", borderRight:"none", padding:"10px 5%"}}>
            <img src={Logo} className="h-full cursor-pointer brightness-0 hover:brightness-100 duration-150" onClick={()=>navigate('/')}/>
            <input className="indent-2 border-gray sm:border-2 rounded-xl " placeholder="Search..." style={{width:"30%", maxWidth:"300px"}}/>
            <div style={{fontSize:"1.5rem", gap:"20px"}} className="flex flex-row justify-between items-center">
                <i className="fa-solid fa-bell cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i className="fa-solid fa-user cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i onClick={hanndleMenuClick} className="fa-solid fa-bars cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>

            </div>
        </div>
        {isClick && <Menu handleMenuClick={hanndleMenuClick}/>}
        </div>
        
    )
}