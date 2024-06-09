import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { acceptFriendRequest, rejectFriendRequest } from "../../reducers/friendRequestReducer";
export default function ActionFriendCard(props:{id:number, action:string, fullName:string, username:string, phoneNumber:string}){
    
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const handleAcceptFriendRequest=async()=>{
        await dispatch(acceptFriendRequest({id:props.id, token}))
        alert('Your action is performed successfully');
        window.location.reload();
    }
    const handleRejectRequest=async()=>{
        await dispatch(rejectFriendRequest({id:props.id, token}));
        alert('Your action is performed successfully');
        window.location.reload();
    }
    const buttonElement=props.action==="request"?(
        <button onClick={handleRejectRequest} className="bg-black text-white hover:bg-white hover:text-black duration-500" style={{
            border:"1px solid black",
            padding:"10px 20px",
            boxShadow:"0px 1px 5px 2px rgba(0,0,0,0.5)",
            fontSize:"1.5rem"
        }}>Drop</button>
    ):props.action==="pending"?(
        <div className="flex flex-col justify-center items-center gap-5">
        <button onClick={handleAcceptFriendRequest} className="bg-black text-white hover:bg-white hover:text-black duration-500" style={{
            border:"1px solid black",
            padding:"0 5px",
            width:"100px",
            boxShadow:"0px 1px 5px 2px rgba(0,0,0,0.5)",
            fontSize:"1.5rem"
        }}>Accept</button>
        <button onClick={handleRejectRequest} className="bg-black text-white hover:bg-white hover:text-black duration-500" style={{
            border:"1px solid black",
            padding:"0 5px",
            width:"100px",
            boxShadow:"0px 1px 5px 2px rgba(0,0,0,0.5)",
            fontSize:"1.5rem"
        }}>Reject</button>
        </div>
    ):(
        <button onClick={handleRejectRequest} className="bg-black text-white hover:bg-white hover:text-black duration-500" style={{
            border:"1px solid black",
            padding:"10px 10px",
            boxShadow:"0px 1px 5px 2px rgba(0,0,0,0.5)",
            fontSize:"1.5rem"
        }}>Delete</button>
    )
    return(
        <div className="w-full h-full" style={{
            display:"grid",
            gridTemplateColumns:"30% 50% 20%",
            padding:"15px",
            borderBottom:props.action==="list"?"none":"1px solid gray",
            borderTop:props.action==="list"?"none":"1px solid gray",
            maxWidth:"500px",
            height:"fit-content",
            borderRight:props.action==="list"?"1px solid gray":"none"
        }}>
            <div className="flex flex-col justify-center items-center">
                <img src={defaultAvatar} alt="avatar"/>
            </div>
            <div style={{
                display:"grid",
                gridTemplateRows:"30% 30% 30%"
            }}>
                <div className="flex flex-col justify-center items-center">
                    <h1>{props.fullName}</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>Username: {props.username}</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>Phone: {props.phoneNumber}</h1>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
                {buttonElement}
            </div>
        </div>
    )
}