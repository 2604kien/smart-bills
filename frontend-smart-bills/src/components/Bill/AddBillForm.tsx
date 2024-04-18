import React from "react";
import { useAppSelector } from "../../app/hooks";
export default function AddBillForm(){
    const currUser=useAppSelector(state=>state.user.currentUser);
    const [formData,setFormData]=React.useState({
        title:"",
        description:"",
        userPaid:[],
        userOwe:[],
        totalCost:0,
        numberPeople:0,
        creator:currUser
    })
    const handleChange=()=>{

    }
    const handleSubmit=()=>{

    }
    return (
        <section >
            <div className="z-0 flex flex-col justify-center items-center h-full mt-10">
                <div className="container border-black sm:border flex flex-col justify-center items-center rounded-xl bg-black text-white" style={{boxShadow:"0px 5px 20px 5px rgba(0,0,0,0.5)",height:"90%", width:"60%", maxWidth:"100%", minWidth:"390px", position:"relative"}}>
                        <div className="h-1/6 flex flex-col justify-center w-full items-center">
                            <h1 className="text-5xl font-semibold mt-5">Add New Bill</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6">
                            <form className="flex flex-col w-5/6 gap-5" onSubmit={handleSubmit}>
                                
                                <label className="text-lg">Title<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="title" value={formData.title} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="number" placeholder="Enter bill title" required/>
                                <label className="text-lg">Total Cost<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="totalCost" value={formData.totalCost} className="w-1/4 h-11 indent-1.5 rounded-xl text-black text-base" type="number" placeholder="Enter total bill cost." required/>
                                <label className="text-lg">Description</label>
                                <textarea onChange={handleChange} name="totalCost" value={formData.title} className="w-full h-11 indent-1.5 pt-1 rounded-xl text-black text-base" placeholder="Enter bill title" style={{height:"100px"}} required/>
                                <button style={{
                                    marginBottom:"20px"
                                }} className="bg-white text-black rounded-lg h-9 mt-12 font-bold hover:brightness-75 duration-150">Create New Bill</button>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}