import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
export default function Dashboard(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    React.useEffect(()=>{
        if(!isAuthenticated) navigate('/');
    },[])
    return(
        <div>
            <h1>This is Dashboard page.</h1>
        </div>
    )
}