import React from "react";
import FriendCard from "./FriendCard";
import axios from "axios";
import { backEndServer } from "../../server/server";
import { useAppSelector } from "../../app/hooks";
export default function AddFriend(){
    const [isSelect, setIsSelect]=React.useState(false);
    const [phoneNumber, setPhoneNumber]=React.useState("");
    const token=useAppSelector(state=>state.auth.accessToken);
    const [data, setData]=React.useState({});
    const handleSelect=()=>{
        setIsSelect(true);
    }
    const handleDeselect=()=>{
        setIsSelect(false);
    }
    const handleFindFriend= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const config={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
        try{
            const response= await axios.get(backEndServer+`user/phone/${phoneNumber}`,config);
            setData(response.data.data);
        }
        catch(error:any){
            setData({});
            if(error.message.includes(404)) alert(error.response.data.message);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Add Friend</h1>
            <form onSubmit={handleFindFriend} onFocus={handleSelect}  onBlur={handleDeselect} className="flex flex-row justify-center items-center" style={{ background:"white",gap:"20px", position:"relative"}}>
                <input style={{width:"400px"}} onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} className="sm:border-2 indent-2 p-1 rounded-xl" placeholder="Enter phone number."/>
                <button className="hover:brightness-50 duration-300 sm:border-2 p-1 rounded-xl">Search</button>
                <FriendCard data={data} status={isSelect}/>
            </form>
        </div>
    )
}