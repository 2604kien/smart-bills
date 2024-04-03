import React from "react";
import { createNewUser } from "../../reducers/userReducer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
type Register={
    username:string,
    fullName:string,
    password:string,
    email:string
}
export default function Login(){
    const dispatch=useAppDispatch();
    const message=useAppSelector(state=>state.user.message);
    const navigate: NavigateFunction=useNavigate();
    const [formData, setFormData]=React.useState<Register>({
        fullName:"",
        username:"",
        password:"",
        email:""
    });
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit=async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        await dispatch(createNewUser(formData));
    }
    React.useEffect(()=>{
        if(message){
            alert(message);
            window.location.reload()
        };
    },[message])
    return (
        <section>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="container-fluid border-black sm:border flex flex-col justify-center items-center rounded-xl bg-black text-white" style={{boxShadow:"0px 5px 20px 5px rgba(0,0,0,0.5)",height:"90%", width:"640px", maxWidth:"100%", minWidth:"390px"}}>
                        <div className="h-1/6 flex flex-col justify-center w-full items-center">
                            <h1 className="text-5xl font-semibold">Register</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6">
                            <form className="flex flex-col w-5/6 gap-5" onSubmit={handleSubmit}>
                                <label className="text-lg">Full Name <span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="fullName" value={formData.fullName} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter your full name." required/>
                                <label className="text-lg">Username <span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="username" value={formData.username} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter your username." required/>
                                <label className="text-lg">Password <span className="text-red-600">*</span></label>
                                <div style={{position:"relative"}}>
                                <input onChange={handleChange} name="password" value={formData.password} className="w-full h-11 rounded-xl indent-1.5 text-black" type="password" placeholder="Enter your password." required/>
                                <i className="fa-solid fa-lock flex flex-col text-black justify-center items-center rounded-xl bg-white" style={{position:"absolute", top:"2px", right:"0px",border: "1px solid white", height:"90%", width:"30px"}}></i>
                                </div>
                                <label className="text-lg">Email <span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="email" value={formData.email} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="email" placeholder="Enter your email." required/>
                                <button className="bg-white text-black rounded-lg h-9 mt-12 font-bold hover:brightness-75 duration-150">Create New Account</button>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}