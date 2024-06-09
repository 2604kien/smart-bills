import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ActionFriendCard from "./ActionFriendCard";
import { getFriendRequest } from "../../reducers/friendRequestReducer";
type Action={
    id:number,
    receiver:{
        id:number,
        fullName:string,
        phoneNumber:string,
        username:string
    }
}
export default function FriendRequestCard(){
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const id=useAppSelector(state=>state.user.currentUser.id);
    const friendRequestList=useAppSelector(state=>state.friendRequest.friendRequestList);
    const element=friendRequestList.length>0?friendRequestList.map((el:Action)=><ActionFriendCard key={el.id+Math.random()} id={el.id} action="request" fullName={el.receiver.fullName} username={el.receiver.username} phoneNumber={el.receiver.phoneNumber}/>):(
        <div>
            <h1 style={{fontStyle:"italic", fontWeight:"200", color:"gray"}}>You have not send any request.</h1>
        </div>
    )
    React.useEffect(()=>{
        if(token.length>0 && id>0) dispatch(getFriendRequest({id, token}));
    },[token, id, dispatch])
    return (
        <div className="w-full h-full flex flex-col justify-center items-center sm:border-2">
            <div className="w-4/6 h-4/5 justify-center items-center sm:border" style={{
                display:"grid",
                gridTemplateRows:"100px repeat(auto-fill, 320px)",
                overflowY:"scroll"
            }}>
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <h1 style={{fontSize:"1.5rem"}}>Your Friend Request:</h1>
                </div>
                <div>
                    {element}
                </div>
            </div>
        </div>
    )
}