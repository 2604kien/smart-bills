import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import BillCard from "./BillCard";
export default function Bill(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const element=isAuthenticated? (<div style={{display:"grid", gridTemplateColumns:"20% 80%", height:"100%"}}>  
                                            <div style={{position:"relative"}}>
                                            </div>
                                    </div>):
                                    (
                                        <div style={{display:"grid", gridTemplateColumns:"20% 80%", height:"100%"}}>
                                            <div></div>
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 style={{fontSize:"1.5rem"}}>Please <span onClick={()=>navigate('/login')} className="hover:text-white hover:brightness-50 cursor-pointer" style={{textDecoration:"underline"}}>login</span> first to access to Bills.</h1>
                                            </div>
                                        </div>
                                    )
    return element;
}