import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ActionFriendCard from "./ActionFriendCard";
import { getPendingRequest } from "../../reducers/friendRequestReducer";
type Action={
    id:number,
    sender:{
        id:number,
        fullName:string,
        phoneNumber:string,
        username:string
    }
}
export default function FriendPendingCard(){
    const dispatch=useAppDispatch();
    const id=useAppSelector(state=>state.user.currentUser.id);
    const token=useAppSelector(state=>state.auth.accessToken);
    const friendPendingList=useAppSelector(state=>state.friendRequest.friendPendingList);
        const element=friendPendingList.length>0?friendPendingList.map((el:Action)=><ActionFriendCard key={el.id+Math.random()} id={el.id} action="pending" fullName={el.sender.fullName} username={el.sender.username} phoneNumber={el.sender.phoneNumber}/>):(
        <div>
            <h1 style={{fontStyle:"italic", fontWeight:"200", color:"gray"}}>You have no pending request.</h1>
        </div>
    )
    React.useEffect(()=>{
        if(token.length>0 && id>0) dispatch(getPendingRequest({id, token}));
    },[token, id, dispatch])
    return (
        <div className="w-full h-full flex flex-col justify-center items-center sm:border-2">
            <div className="w-4/6 h-4/5 justify-center items-center sm:border" style={{
                display:"grid",
                gridTemplateRows:"100px repeat(auto-fill, 320px)",
                overflowY:"scroll"
            }}>
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <h1 style={{fontSize:"1.5rem"}}>Pending Request:</h1>
                </div>
                <div>
                    {element}
                </div>
            </div>
        </div>
    )
}