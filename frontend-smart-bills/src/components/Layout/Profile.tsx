import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
//Profile drop down
export default function Profile(props:{profileRef:React.RefObject<HTMLInputElement> ,isClick:boolean, handleClick:()=>void}){
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const navigate=useNavigate();
    const element=isAuthenticated?<ProfileCard/>:<div className="w-full" style={{lineHeight:"40px"}}>
        <h1 onClick={()=>{navigate('/login'); props.handleClick()}} className="hover:text-white hover:brightness-50 cursor-pointer w-full text-center">Login</h1>
        <h2 onClick={()=>{navigate('/register'); props.handleClick()}} className=" hover:text-white hover:brightness-50 cursor-pointer w-full text-center">Register</h2>
    </div>
    return (
        <div ref={props.profileRef} className={props.isClick?"open":"close"} style={{ transition:"all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)", visibility:props.isClick?"visible":"hidden",position:"fixed",overflow:"hidden", right:"0px", height:"fit-content", minWidth:"390px", maxWidth:"100%", borderBottomLeftRadius:"15px",borderBottomRightRadius:"15px", backgroundColor:"#f0f0f0", boxShadow:"0px 1px 5px 1px rgba(0,0,0,0.5)"}}> 
            {element}
        </div>
    )
}