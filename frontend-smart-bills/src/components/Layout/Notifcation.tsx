import React from "react";
export default function Notification(props:{notificationRef:React.RefObject<HTMLInputElement> ,isClick:boolean, handleClick:()=>void}){
    return (
        <div ref={props.notificationRef} className={props.isClick?"open":"close"} style={{ transition:"all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)", visibility:props.isClick?"visible":"hidden",position:"fixed",overflow:"hidden", right:"0px", height:"300px", width:"300px", borderBottomLeftRadius:"15px",borderBottomRightRadius:"15px", backgroundColor:"#f0f0f0", boxShadow:"0px 1px 5px 1px rgba(0,0,0,0.5)", display:"grid", gridTemplateColumns:"30% 30% 30%", gridTemplateRows:"20% 20% 20% 20%", gap:"20px", rowGap:"40px"}}> 

        </div>
    )
}