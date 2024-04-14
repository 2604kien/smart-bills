import React from "react";
import { useNavigate } from "react-router-dom";
export default function FriendNav(){
    const navigate=useNavigate();
    return (
        <div className="h-full" style={{
            display:"grid",
            gridTemplateRows:"40% 60%",
            background:"#f0f0f0"
        }}>
           <div className="flex flex-col justify-center items-center" style={{gap:"20px"}}>
                <h1 onClick={()=>navigate("/friend/new")} className="hover:brightness-50 cursor-pointer flex flex-col justify-center items-center duration-300" style={{ borderRadius:"15px", padding:"5px", width:"70%", background:"white"}}>Add New Friend</h1>
                <h1 onClick={()=>navigate("/friend")} className="hover:brightness-50 cursor-pointer flex flex-col justify-center items-center duration-300" style={{ borderRadius:"15px", padding:"5px", width:"70%", background:"white"}}>View Friend List</h1>
           </div>

        </div>
    )
}