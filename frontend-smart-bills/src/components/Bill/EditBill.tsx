import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFriendList } from "../../reducers/friendRequestReducer";
import AddUserOverlay from "./AddUserOverlay";
import {getBillById, updateBill } from "../../reducers/billReducer";
import { useParams } from "react-router-dom";
import moment from "moment";
export default function EditBill(){
    const currUser=useAppSelector(state=>state.user.currentUser);
    const currBill:any=useAppSelector(state=>state.bill.currBill);
    const [formData,setFormData]=React.useState({
        title:"",
        description:"",
        userList:[],
        totalCost:0,
        numberPeople:0,
        creator:currUser,
    });
    React.useEffect(()=>{
        setFormData((prev)=>{
            return {
                ...prev,
                creator:currUser
            }
        })
    },[currUser])
    console.log(formData)
    const userId=currUser?currUser.id:0;
    const {id}=useParams();
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const [overlay, setOverlay]=React.useState(false);
    const userRef=React.useRef<HTMLInputElement>(null);
    const handleChange=(e:any)=>{
        const {name, value}=e.target
        setFormData(prev=>{
            return{
                ...prev,
                [name]: name==="totalCost"?Number(value):value
            }
        })
    }
    const userElement=formData.userList.length>0?formData.userList.map((el:any, id:number)=>(<div key={id} className="ml-2 flex flex-col">
        <h1>user: {el.userFullName}, paid: {el.isPaid?"true":"false"}, amount: ${el.amount};</h1>
    </div>)):(
        <div className="ml-2 flex flex-row">
            <h1>Please add an user</h1>
        </div>
    )

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        const totalCostCheck=formData.userList.reduce((accumulator:any, currValue:any)=>Number(accumulator)+Number(currValue.amount),0);
        const difference=Math.round(Math.abs((Number(totalCostCheck)-Number(formData.totalCost))*100))/100;
        if(difference===0||(difference>=0.01&&difference<=0.02)){
            

            dispatch(updateBill({data:formData, token, id:Number(id)}))
            alert('Edit Bill Successfully');
        }
        else{
            alert('Total amount must equal to the total cost');
        }
    }
    React.useEffect(()=>{
        if(userId!==0){
            dispatch(getFriendList({id:userId, token}))
            dispatch(getBillById({id:Number(id), token}))
        }
    },[currUser, token, dispatch, id, userId])
    React.useEffect(()=>{
        let handler=(e:any)=>{
            const element=userRef.current;
            if(element && !element.contains(e.target)){
                setOverlay(false);
            }
        }
        document.addEventListener("mousedown", handler);
    },[])
    React.useEffect(()=>{
        if(currBill.oweList && currBill.paidList){
            const userOweList=currBill.oweList.map((el:any)=>{
                return {
                    isPaid:false,
                    userId:el.user.id,
                    userFullName:el.user.fullName,
                    oweId:el.id,
                    amount:el.oweAmount
                }
            })
            const userPaidList=currBill.paidList.map((el:any)=>{
                return {
                    isPaid:true,
                    userId:el.user.id,
                    userFullName:el.user.fullName,
                    paidId:el.id,
                    amount:el.paidAmount
                }
            })
            setFormData(()=>{
                return{
                    ...currBill,
                    userList:userOweList.concat(userPaidList),
                    creator: currUser,
                    totalCost: Number(currBill.totalCost)
                }
            })
        }
    },[currBill, currUser])
    return (

            <div className="z-0 flex flex-col justify-center items-center w-full h-full mt-5">
            
                <div className="container border-black sm:border w-full flex flex-col justify-center items-center rounded-xl bg-black text-white" style={{position:"relative",boxShadow:"0px 5px 20px 5px rgba(0,0,0,0.5)",height:"fit-content", width:"60%", maxWidth:"100%", minWidth:"390px"}}>
                <AddUserOverlay userlist={formData.userList} totalCost={formData.totalCost} userRef={userRef} setOverlay={setOverlay} setUserArray={setFormData} overlay={overlay}/>
                        <div className="h-1/6 flex flex-col justify-center w-full items-center">
                            <h1 className="text-5xl font-semibold mt-5">Edit Bill</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <form className="flex flex-col w-5/6 gap-5" onSubmit={handleSubmit}>
                                <label className="text-lg">Date</label>
                                <input onChange={handleChange} name="title" value={currBill.date?moment(currBill.date).format('HH:mm | DD-MM-YYYY'):"N/A"} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter bill title" disabled required style={{width:"fit-content"}}/>
                                <label className="text-lg">Title<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="title" value={formData.title} className="w-full h-11 indent-1.5 rounded-xl text-black text-base" type="text" placeholder="Enter bill title" required/>
                                <label className="text-lg">Total Cost ($)<span className="text-red-600">*</span></label>
                                <input onChange={handleChange} name="totalCost" value={formData.totalCost} className="w-1/4 h-11 indent-1.5 rounded-xl text-black text-base" type="number" placeholder="Enter total bill cost." required/>
                                <label className="text-lg">Description</label>
                                <textarea onChange={handleChange} name="description" value={formData.description} className="w-full h-11 indent-1.5 pt-1 rounded-xl text-black text-base" placeholder="Enter bill title" style={{height:"100px"}}/>
                                <h1 className="bg-white rounded-xl text-black duration-300 cursor-pointer sm:border border-white hover:brightness-50 p-2 gap-2" style={{width:"fit-content"}} onClick={()=>setOverlay(true)}>Add User</h1>
                                <div className="w-full sm:border border-white" style={{minHeight:"100px"}}>
                                    {userElement}
                                </div>
                                <button style={{
                                    marginBottom:"30px"
                                }} className="bg-white text-black rounded-lg h-9 mt-12 font-bold hover:brightness-75 duration-150">Edit Bill</button>
                            </form>
                        </div>
                </div>
            </div>
    )
}