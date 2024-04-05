import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo/WhiteBackground.png";
import Menu from "./Menu";
export default function Navbar(){
    const navigate=useNavigate();
    const [isClick, setIsClick]=React.useState<boolean>(false);
    const hanndleMenuClick=()=>{
        setIsClick(prev=>!prev);
    }
    const menuRef=React.useRef<HTMLInputElement>(null);
    React.useEffect(()=>{
        let handler=(e:any)=>{
            const element=menuRef.current;
            if(element && !element.contains(e.target)) {
                setIsClick(false);
            }
        }
        document.addEventListener("mousedown", handler);
    },[])
    return(
        <div style={{position:"relative", zIndex:"1000"}}>
        <div className="h-20">
        </div>
        <div className="select-none z-10 sm:border h-20 border-gray flex flex-row justify-between items-center text-black" style={{width:"100vw",borderTop:"none", top:"0", backgroundColor:"#f0f0f0", position:"fixed", borderLeft:"none", borderRight:"none", padding:"10px 5%"}}>
            <img src={Logo} className="h-full cursor-pointer brightness-0 hover:brightness-100 duration-150" onClick={()=>navigate('/')}/>
            <div className="flex justify-center items-center" style={{position:"relative", width:"40%"}}>
                <i style={{position:"absolute", left:"8px", borderRadius:"50%", padding:"10px"}} className="cursor-pointer hover:bg-gray-50 hover:opacity-50 duration-300 hover:brightness-75 fa-solid fa-magnifying-glass"></i>
                <input className="border-gray sm:border-2 rounded-xl " placeholder="Search" style={{width:"100%", textIndent:"35px", padding:"8px"}}/>
            </div>
            <div style={{fontSize:"1.5rem", gap:"20px"}} className="flex flex-row justify-between items-center">
                <i className="fa-solid fa-bell cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i onClick={()=> navigate('/login')} className="fa-solid fa-user cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i onClick={hanndleMenuClick} className="fa-solid fa-bars cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>

            </div>
        </div>
        <Menu menuRef={menuRef} handleMenuClick={hanndleMenuClick} isClick={isClick}/>
        </div>
        
    )
}