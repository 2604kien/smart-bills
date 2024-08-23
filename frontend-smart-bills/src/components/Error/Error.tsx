import React from "react";
import { useNavigate } from "react-router-dom";
//display error 404 page when the website is unabled to retrive content
export default function Error(){
    const navigate=useNavigate();
    return(
        <div className="flex flex-col justify-center items-center h-full w-full">
            <h1>Page is not found or unauthorized, please <span className="text-blue-600 cursor-pointer" onClick={()=>navigate('/login')}>login here.</span></h1>
        </div>
    )
}