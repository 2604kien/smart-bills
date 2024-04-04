import React from "react";
import MenuItem from "./MenuItem";
export default function Menu(props:{handleMenuClick:()=>void}){
    const classArray:string[]=["fa-solid fa-house","fa-solid fa-table", "fa-solid fa-gear"]
    const nameArray:string[]=["Home","Dashboard", "Setting"];
    const navigateArray:string[]=["/", "/dashboard", "/setting"];
    const element=classArray.map((el,i)=><MenuItem item={classArray[i]} itemName={nameArray[i]} navigation={navigateArray[i]} handleMenuClick={props.handleMenuClick}/>)
    return(
        <div style={{position:"fixed", right:"0px", width:"300px", height:"400px", borderBottomLeftRadius:"15px",borderBottomRightRadius:"15px", backgroundColor:"#f0f0f0", boxShadow:"0px 1px 5px 1px rgba(0,0,0,0.5)", display:"grid", gridTemplateColumns:"30% 30% 30%", padding:"20px", gap:"20px"}}> 
            {element}
        </div>
    )
}