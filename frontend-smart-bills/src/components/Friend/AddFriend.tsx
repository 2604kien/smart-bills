import React from "react";
import FriendCard from "./FriendCard";
export default function AddFriend(){
    const [isSelect, setIsSelect]=React.useState(false);
    const handleSelect=()=>{
        setIsSelect(true);
    }
    const handleDeselect=()=>{
        setIsSelect(false);
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Add Friend</h1>
            <form className="flex flex-row justify-center items-center" style={{gap:"20px", position:"relative"}}>
                <input onFocus={handleSelect} onBlur={handleDeselect} className="sm:border-2 indent-2 p-1 rounded-xl" placeholder="Enter phone number."/>
                <button className="sm:border-2 p-1 rounded-xl">Search</button>
                <FriendCard status={isSelect}/>
            </form>
        </div>
    )
}