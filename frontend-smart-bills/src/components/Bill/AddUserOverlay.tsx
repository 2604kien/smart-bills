import React from "react";
export default function AddUserOverlay(props:{userRef:React.RefObject<HTMLInputElement>, setOverlay:(x:boolean)=>void}){
    return(
        <div ref={props.userRef} style={{
            background:"rgba(0,0,0,0.5)",
            height:"50vh",
            width:"100%",
            position:"absolute",
            left:"0"
        }}>
            <button onClick={()=>props.setOverlay(false)}>X</button>
            
        </div>
    )
}