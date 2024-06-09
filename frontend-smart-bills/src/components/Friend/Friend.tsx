import React from "react";
import FriendPendingCard from "./FriendPendingCard";
import FriendRequestCard from "./FriendRequestCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFriendList } from "../../reducers/friendRequestReducer";
import ActionFriendCard from "./ActionFriendCard";
type Action={
    id:number,
    user:{
        id:number,
        fullName:string,
        phoneNumber:string,
        username:string
    }
}
export default function Friend(){
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const id=useAppSelector(state=>state.user.currentUser.id);
    const friendList=useAppSelector(state=>state.friendRequest.friendList);
    const element=friendList && friendList.length>0?friendList.map((el:Action)=><ActionFriendCard key={el.id} action="list" id={el.id} fullName={el.user.fullName} username={el.user.username} phoneNumber={el.user.phoneNumber} />):<></>
    React.useEffect(()=>{
        if(!isNaN(id) && id>0) {
            dispatch(getFriendList({id, token}))
        };
    },[token, id, dispatch])
    return(
        <div style={{
            display:"grid",
            gridTemplateRows:"35% 65%",
            height:"100%"
        }}>
            <div className="flex flex-col justify-center items-center" style={{
                overflowX:"scroll",
                gap:"30px"
            }}>
                <h1 style={{
                    fontSize:"1.5rem"
                }}>Your Friend List:</h1>
                {friendList && friendList.length>0?(<div style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fill, 500px)",
                    width:"100%",
                }}>
                    {element}
                </div>):(<h1 style={{
                    fontStyle:"italic",
                    fontWeight:"400",
                    color:"gray",
                    marginTop:"20px"
                }}>You have no friend.</h1>)}
            </div>
            <div style={{
                display:"grid",
                gridTemplateColumns:"50% 50%"
            }}>
                <FriendPendingCard/>
                <FriendRequestCard/>
            </div>
        </div>
    )
}