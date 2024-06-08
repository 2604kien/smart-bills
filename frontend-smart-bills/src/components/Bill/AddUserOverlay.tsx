import React from "react";

import { useAppSelector } from "../../app/hooks";
import BillUserCard from "./BillUserCard";
export default function AddUserOverlay(props:{userlist?:any, setUserArray:any, overlay:any, totalCost:number, userRef:React.RefObject<HTMLInputElement>, setOverlay:(x:boolean)=>void}){
    const friendList=useAppSelector(state=>state.friendRequest.friendList);
    const [isEqual, setIsEqual]=React.useState(false);
    const currUser=useAppSelector(state=>state.user.currentUser);
    const userList=currUser.id!==0?[{user:currUser}].concat(friendList):[];
    const [involveList, setInvolveList]=React.useState([]);
    
    const amount=involveList.length>0?Math.round(props.totalCost/involveList.length*100)/100:0;
    const userCardElement=userList && userList.length>0? userList.map((el:any, id:number)=><BillUserCard amount={amount} setInvolveList={setInvolveList} involveList={involveList} equal={isEqual} key={id} id={el.user.id} fullName={el.user.fullName} phoneNumber={el.user.phoneNumber} username={el.user.username}/>):<></>
    const handleSubmit=()=>{
        const check=involveList.filter((el:any)=>Number(el.amount)===0);
        if(check.length>0){
            alert('Amount must be greater than $0.')
        }
        else{
            props.setUserArray((prev:any)=>{
                return {
                    ...prev,
                    userList:involveList,
                    numberPeople:involveList.length
                }
            });
            props.setOverlay(false);
        }
    }
    React.useEffect(()=>{
        if(props.userlist) setInvolveList(props.userlist)
    },[props.userlist])
    React.useEffect(()=>{setIsEqual(false)},[props.totalCost])
    return(
        <div className="flex flex-col justify-center items-center" ref={props.userRef} style={{
            border:"3px solid black",
            borderStyle:"inset",
            height:"60vh",
            width:"100%",
            position:"absolute",
            left:"0",
            textAlign:"center",
            color:"black",
            zIndex:props.overlay?"1000":"-1"
        }}>
            <div className="w-full p-3 text-white" style={{
                background:"rgba(0,0,0,1)",
                border:"3px inset white",
            }}>
                <h1 style={{
                    fontSize:"2rem",
                    fontWeight:"600"
                }}>Total Bill Cost: {props.totalCost}$</h1>
                <div className="flex flex-row justify-center items-center gap-2">
                    <input checked={isEqual} onChange={()=>setIsEqual(prev=>!prev)} id="isEqual" type="checkbox"/>
                    <label className="sm:border p-2 cursor-pointer rounded-xl text-white bg-black hover:text-black hover:bg-white duration-300" htmlFor="isEqual">Split Equal?</label>
                </div>
            </div>
            <div style={{
                display:"grid",
                width:"100%",
                height:"100%",
                background:"white",
                gridTemplateColumns:"50% 50%",
                rowGap:"0%",
                overflowY:"scroll"
            }}>
                {userCardElement}
            </div>
            <div className="bg-black w-full flex flex-col justify-center items-center" style={{
                border:"3px inset white",
                
            }}>
                <button onClick={handleSubmit} className="bg-white text-black hover:brightness-50 duration-300 rounded-xl p-2 m-3" >Submit</button>
            </div>
        </div>
    )
}