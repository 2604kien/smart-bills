import React from "react";

import { useAppSelector } from "../../app/hooks";
import BillUserCard from "./BillUserCard";
export default function AddUserOverlay(props:{setUserArray:any, overlay:any, totalCost:number, userRef:React.RefObject<HTMLInputElement>, setOverlay:(x:boolean)=>void}){
    const friendList=useAppSelector(state=>state.friendRequest.friendList);
    const [isEqual, setIsEqual]=React.useState(false);
    const currUser=useAppSelector(state=>state.user.currentUser);
    const userList=[{user:currUser}].concat(friendList);
    const [involveList, setInvolveList]=React.useState([]);
    const amount=involveList.length>0?props.totalCost/involveList.length:0;
    const userCardElement=userList && userList.length>0? userList.map((el:any, id:number)=><BillUserCard amount={amount} setInvolveList={setInvolveList} involveList={involveList} equal={isEqual} key={id} id={el.user.id} fullName={el.user.fullName} phoneNumber={el.user.phoneNumber} username={el.user.username}/>):<></>
    console.log(involveList);
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
                    <label htmlFor="isEqual">Split Equal?</label>
                </div>
            </div>
            <div style={{
                display:"grid",
                width:"100%",
                height:"100%",
                background:"white",
                gridTemplateColumns:"50% 50%"
            }}>
                {userCardElement}
            </div>
            <div className="bg-black w-full flex flex-col justify-center items-center" style={{
                border:"3px inset white",
                
            }}>
                <button onClick={()=>props.setUserArray(involveList)} className="bg-white text-black hover:brightness-50 duration-300 rounded-xl p-2 m-3" >Submit</button>
            </div>
        </div>
    )
}