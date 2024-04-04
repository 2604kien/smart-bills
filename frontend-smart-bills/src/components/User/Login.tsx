import React from "react";
import Logo from "../../Logo/BlackBackground.png"
import { NavigateFunction, useNavigate } from "react-router-dom";
export default function Login(){
    const navigate: NavigateFunction=useNavigate();
    return (
        <section>
            <div className="select-none flex flex-col justify-center items-center" style={{height:"90vh"}}>
                <div className="container-fluid border-black sm:border flex flex-col justify-center items-center rounded-xl bg-black text-white" style={{boxShadow:"0px 5px 20px 5px rgba(0,0,0,0.5)",height:"90%", width:"560px", maxWidth:"100%", minWidth:"390px"}}>
                        <div className="h-1/6 flex justify-center items-center hover:brightness-50 duration-150">
                            <img src={Logo} style={{width:"80%",}}/>
                        </div>
                        <div className="h-1/4 border-1 flex flex-col justify-center">
                            <h1 className="text-5xl font-semibold">Log In</h1>
                            
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6" >
                            <form className="flex flex-col w-5/6 gap-5">
                                <label className="text-lg">Username</label>
                                <input className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter your username." required/>
                                <label className="text-lg">Password</label>
                                <div style={{position:"relative"}}>
                                <input className="w-full h-11 rounded-xl indent-1.5 text-black" type="password" placeholder="Enter your password." required/>
                                <i className="fa-solid fa-lock flex flex-col text-black justify-center items-center rounded-xl bg-white" style={{position:"absolute", top:"2px", right:"0px",border: "1px solid white", height:"90%", width:"30px"}}></i>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <input id="remember" type="checkbox" value=   {"true"}/>
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                                <button className="bg-white text-black rounded-lg h-9 mt-10 font-bold hover:brightness-75 duration-150">Log In</button>
                            </form>
                            <h1 className="mt-3" onClick={()=>navigate('/register')}>or <span className="underline cursor-pointer hover:brightness-75 duration-150">register here</span></h1>
                        </div>
                </div>
            </div>
        </section>
    )
}