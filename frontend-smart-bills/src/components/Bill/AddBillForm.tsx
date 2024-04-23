import React, { HtmlHTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFriendList } from "../../reducers/friendRequestReducer";
import AddUserOverlay from "./AddUserOverlay";
export default function AddBillForm(){
    const currUser=useAppSelector(state=>state.user.currentUser);
    const [formData,setFormData]=React.useState({
        title:"",
        description:"",
        userList:[],
        totalCost:0,
        numberPeople:0,
        creator:currUser
    })
    const id=currUser?currUser.id:0;
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const [overlay, setOverlay]=React.useState(false);
    const userRef=React.useRef<HTMLInputElement>(null);
    const handleChange=(e:any)=>{
        const {name, value}=e.target
        setFormData(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const userElement=formData.userList.length>0?formData.userList.map((el:any, id:number)=>(<div key={id} className="ml-2 flex flex-col">
        <h1>user: {el.userFullName?el.userFullName:"self"}, paid: {el.isPaid?"true":"false"}, amount: ${el.amount};</h1>
    </div>)):(
        <div className="ml-2 flex flex-row">
            <h1>Please add an user</h1>
        </div>
    )
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        console.log(formData);
    }
    React.useEffect(()=>{
        if(id!==0){
            dispatch(getFriendList({id, token}))
        }
    },[currUser, token])
    React.useEffect(()=>{
        let handler=(e:any)=>{
            const element=userRef.current;
            if(element && !element.contains(e.target)){
                setOverlay(false);
            }
        }
        document.addEventListener("mousedown", handler);
    },[])
    return (
        <section >
            <div className="z-0 flex flex-col justify-center items-center h-full mt-10">
            
                <div className="container border-black sm:border flex flex-col justify-center items-center rounded-xl bg-black text-white" style={{position:"relative",boxShadow:"0px 5px 20px 5px rgba(0,0,0,0.5)",height:"90%", width:"60%", maxWidth:"100%", minWidth:"390px"}}>
                <AddUserOverlay totalCost={formData.totalCost} userRef={userRef} setOverlay={setOverlay} setUserArray={setFormData} overlay={overlay}/>
                        <div className="h-1/6 flex flex-col justify-center w-full items-center">
                            <h1 className="text-5xl font-semibold mt-5">Add New Bill</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6">
                            <form className="flex flex-col w-5/6 gap-5" onSubmit={handleSubmit}>
                                
                                <label className="text-lg">Title<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="title" value={formData.title} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter bill title" required/>
                                <label className="text-lg">Total Cost<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="totalCost" value={formData.totalCost} className="w-1/4 h-11 indent-1.5 rounded-xl text-black text-base" type="number" placeholder="Enter total bill cost." required/>
                                <label className="text-lg">Description</label>
                                <textarea onChange={handleChange} name="description" value={formData.description} className="w-full h-11 indent-1.5 pt-1 rounded-xl text-black text-base" placeholder="Enter bill title" style={{height:"100px"}} required/>
                                <h1 className="bg-white rounded-xl text-black duration-300 cursor-pointer sm:border border-white hover:brightness-50 p-2 gap-2" style={{width:"fit-content"}} onClick={()=>setOverlay(true)}>Add User</h1>
                                <div className="w-full sm:border border-white" style={{height:"100px"}}>
                                    {userElement}
                                </div>
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