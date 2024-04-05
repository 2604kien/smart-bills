import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../reducers/authReducer";
export default function ProfileCard(){
    const user=useAppSelector(state=>state.user.currentUser);
    const dispatch=useAppDispatch();
    const handleLogout=async ()=>{
        await dispatch(logout());
    }
    return(
        <div className="flex flex-col justify-center items-center" style={{height:"fit-content", gap:"20px", padding:"20px"}}>
            <img className="hover:brightness-75 duration-300 cursor-pointer" style={{scale:"0.8"}}  src={defaultAvatar} alt="avatar"/>
            <h1><span style={{fontSize:"1.5rem"}}>{user.fullName}</span> <span style={{fontStyle:"italic", color:"gray"}}>({user.username})</span></h1>
            <h1 style={{textDecoration:"underline"}}>{user.email}</h1>
            <h1>Balance: {user.balance}$</h1>
            <button onClick={handleLogout} className="sm:border border-black w-full bg-black text-white rounded-xl p-1 hover:text-black hover:bg-white duration-300">Logout</button>
        </div>
    )
}