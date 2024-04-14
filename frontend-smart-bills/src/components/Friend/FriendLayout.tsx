import React from "react";
import { Outlet } from "react-router-dom";
import FriendNav from "./FriendNav";
export default function FriendLayout(){
    return(
        <div style={{
            display:"grid",
            height:"100%",
            gridTemplateColumns:"20% 80%",
        }}>
            <FriendNav/>
            <Outlet/>
        </div>
    )
}