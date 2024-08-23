import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import AddBillForm from "./AddBillForm";
//component to add bill form to the server
export default function AddBill(){
    const navigate=useNavigate();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    //if user is authenticated then show the AddBillForm componet, otherwise error message asking for login
    const element=isAuthenticated? (<div className="flex flex-col justify-center items-center" style={{height:"100%", width:"100%"}}>
                                        <AddBillForm/>                                   
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