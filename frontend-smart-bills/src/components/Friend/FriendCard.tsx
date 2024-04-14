import React from "react";
export default function FriendCard(props:{status:boolean}){
    return(
        <div style={{
            width:"100%",
            height:"300px",
            position:"absolute",
            top:"130%",
            left:"0",
            borderRadius:"15px",
            visibility:props.status?"visible":"hidden",
            transition: "all 0.5s ease",
            boxShadow:props.status?"0px 1px 5px 1px rgba(0,0,0,0.5)":""
        }}>

        </div>
    )
}