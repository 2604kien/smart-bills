import React from "react";
export default function NotificationBox(props:{notificationRef:React.RefObject<HTMLInputElement> ,isClick:boolean, handleClick:()=>void}){
    
    return (
        <div ref={props.notificationRef} className={props.isClick?"open":"close" } style={{ transition:"all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)", visibility:props.isClick?"visible":"hidden",position:"fixed",overflow:"hidden", padding:"20px", right:"0px", height:"300px", width:"390px", borderBottomLeftRadius:"15px",borderBottomRightRadius:"15px", textAlign:"center", backgroundColor:"#f0f0f0", boxShadow:"0px 1px 5px 1px rgba(0,0,0,0.5)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}> 
            <h1>Notification is under development at the moment.</h1>
        </div>
    )
}