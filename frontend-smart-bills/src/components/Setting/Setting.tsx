import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
export default function Setting(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const element=isAuthenticated? (<div>
                                        This is Bill Page.
                                    </div>):
                                    (
                                        <div style={{height:"90vh"}} className="w-screen flex flex-col justify-center items-center">
                                            <h1 style={{fontSize:"1.5rem"}}>Please <span onClick={()=>navigate('/login')} className="hover:text-white hover:brightness-50 cursor-pointer" style={{textDecoration:"underline"}}>login</span> first to access to Setting.</h1>
                                        </div>
                                    )
    return element;
}