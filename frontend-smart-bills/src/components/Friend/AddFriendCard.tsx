import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sendFriendRequest } from "../../reducers/friendRequestReducer";
//AddFriendCard display user who is found using the search bar in add friend.
export default function AddFriendCard(props:{status:boolean, data:any}){
    const currUserId=useAppSelector(state=>state.user.currentUser.id);
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const handleAddFriend=(e:any)=>{
        e.preventDefault();
        const data={
            sender:{
                id:currUserId,
            },
            receiver:{
                id:props.data.id,
            }
        }
        dispatch(sendFriendRequest({data, token}));
        alert("Your request is successfully performed.");
        window.location.reload();
    }
    return(
        <div className="flex flex-col justify-center items-center" style={{
            width:"100%",
            height:"180px",
            position:"absolute",
            top:"130%",
            left:"0",
            borderRadius:"15px",
            visibility:props.status?"visible":"hidden",
            transition: "all 0.5s ease",
            opacity:props.status?"1":"0",
            color:"black",
            boxShadow:props.status?"0px 1px 5px 1px rgba(0,0,0,0.5)":""
        }}>
            {/* check if there is data, if there is data, then display*/}
            {JSON.stringify(props.data).length>2?(<div className="w-full h-full" style={{
                display:"grid",
                gridTemplateColumns:"30% 50% 20%",
                padding:"15px"
            }}>
                <div className="flex flex-col justify-center items-center">
                    <img src={defaultAvatar} alt="avatar"/>
                </div>
                <div style={{
                    display:"grid",
                    gridTemplateRows:"30% 30% 30%"
                }}>
                    <div className="flex flex-col justify-center items-center">
                        <h1>{props.data.fullName}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1>Username: {props.data.username}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1>Phone: {props.data.phoneNumber}</h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <button className="bg-black text-white hover:bg-white hover:text-black duration-500" onClick={handleAddFriend} style={{
                        border:"1px solid black",
                        borderRadius:"50%",
                        padding:"0 20px",
                        boxShadow:"0px 1px 5px 2px rgba(0,0,0,0.5)",
                        fontSize:"3rem"
                    }}>+</button>
                </div>
            </div>):(<div>
                <h1 style={{
                    fontStyle:"italic",
                    fontSize:"0.9rem",
                    color:"gray"
                }}>Find your friend with phone number.</h1>
            </div>)}
        </div>
    )
}