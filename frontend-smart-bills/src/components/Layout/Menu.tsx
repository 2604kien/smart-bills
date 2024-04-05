import React from "react";
import MenuItem from "./MenuItem";
export default function Menu(props:{menuRef:React.RefObject<HTMLInputElement> ,isClick:boolean, handleMenuClick:()=>void}){
    const classArray:string[]=["fa-solid fa-house","fa-solid fa-table", "fa-solid fa-gear", "fa-solid fa-newspaper", "fa-solid fa-receipt"]
    const nameArray:string[]=["Home","Dashboard", "Setting","News", "Bills"];
    const navigateArray:string[]=["/", "/dashboard", "/setting","news","bills"];
    const element=classArray.map((el,i)=><MenuItem key={i} item={classArray[i]} itemName={nameArray[i]} navigation={navigateArray[i]} handleMenuClick={props.handleMenuClick}/>)
    return(
        <div ref={props.menuRef} className={props.isClick?"open":"close"} style={{ transition:"all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)", visibility:props.isClick?"visible":"hidden",position:"fixed",overflow:"hidden", right:"0px", height:"fit-content", width:"390px", borderBottomLeftRadius:"15px",borderBottomRightRadius:"15px", backgroundColor:"#f0f0f0", boxShadow:"0px 1px 5px 1px rgba(0,0,0,0.5)", display:"grid", gridTemplateColumns:"30% 30% 30%", gridTemplateRows:"20% 20% 20% 20%", gap:"20px", rowGap:"40px"}}> 
            {element}
        </div>
    )
}