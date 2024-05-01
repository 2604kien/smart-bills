import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate=useNavigate();
    return(
        <div>
            <h1>Home page is in development, please <span style={{
                color:"black",
                fontWeight:"600",
                textDecoration:"underline",
                fontSize:"1.5rem",
                cursor:"pointer"
            }} onClick={()=>navigate('/login')}>Login</span> to access features</h1>
        </div>
    )
}