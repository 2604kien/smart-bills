import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
//settle bill page that group all the owed bill and lent bill by friend and user can settle payment by each friend.
export default function Bill(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const element=isAuthenticated? (<div style={{height:"100%"}}>  
                                            <h1 style={{fontSize:"4rem"}}></h1>
                                    </div>):
                                    (
                                        <div style={{height:"100%"}}>
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 style={{fontSize:"1.5rem"}}>Please <span onClick={()=>navigate('/login')} className="hover:text-white hover:brightness-50 cursor-pointer" style={{textDecoration:"underline"}}>login</span> first to access to Bills.</h1>
                                            </div>
                                        </div>
                                    )
    return element;
}