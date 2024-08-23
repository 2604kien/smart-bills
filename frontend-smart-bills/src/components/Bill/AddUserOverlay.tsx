import React from "react";

import { useAppSelector } from "../../app/hooks";
import BillUserCard from "./BillUserCard";
//AddUserOverlay that allow user to select every friend who are part of the bill, allow them to edit the amount, is paid, etc...
export default function AddUserOverlay(props:{userlist?:any, setUserArray:any, overlay:any, totalCost:number, userRef:React.RefObject<HTMLInputElement>, setOverlay:(x:boolean)=>void}){
    //initialize data, variable, and function to be used later.
    const friendList=useAppSelector(state=>state.friendRequest.friendList);
    const [isEqual, setIsEqual]=React.useState(false);
    const currUser=useAppSelector(state=>state.user.currentUser);
    const userList=currUser.id!==0?[{user:currUser}].concat(friendList):[];
    //involveList is list of user who is part of the bill
    const [involveList, setInvolveList]=React.useState([]);
    let finalUserList = userList.slice(); // Make a copy of userList
    //if the userlist array length is greater than 0 then initialize data for the finalUserList
    if (props.userlist?.length > 0) {
        props.userlist.forEach((el: any) => {
            finalUserList = finalUserList.map((e: any) => {
                if (Number(e.user.id) === Number(el.userId)) {
                    return {
                        ...e,
                        editAmount: el.amount,
                        included: true,
                        isPaid: el.isPaid
                    };
                }
                return e;
            });
        });
    }
    //calculate the amount if isEqual is check
    const amount=involveList.length>0?Math.round(props.totalCost/involveList.length*100)/100:0;
    //initialize userCardElement
    const userCardElement=finalUserList && finalUserList.length>0? finalUserList.map((el:any, id:number)=><BillUserCard isPaid={el.isPaid} amount={amount} editAmount={Number(el.editAmount)} included={el.included}  setInvolveList={setInvolveList} involveList={involveList} equal={isEqual} key={id} id={el.user.id} fullName={el.user.fullName} phoneNumber={el.user.phoneNumber} username={el.user.username}/>):<></>
    //handleSubmit to submit the overlay data to parent component (AddBillForm)
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
    //this useEffect check userlist in the props get new data, then assign it to involveList if new data retrieved.
    React.useEffect(()=>{
        if(props.userlist) setInvolveList(props.userlist)
    },[props.userlist])
    //return input form for user overlay
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