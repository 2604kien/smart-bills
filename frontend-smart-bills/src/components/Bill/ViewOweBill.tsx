import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOweBill } from "../../reducers/billReducer";
import ViewBillCard from "./ViewBillCard";
export default function ViewOweBill(){
    const oweBillList=useAppSelector(state=>state.user.currentUser.oweList);
    const [page, setPage]=React.useState(1);
    const [currOweList, setCurrOweList]=React.useState([]);
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const element=[];
    const displayList:any=useAppSelector(state=>state.bill.oweList);
    for(let i=1; i<oweBillList.length/10+1; i++){
        element.push(<h1 className="cursor-pointer hover:scale-125" onClick={()=>setPage(i)} key={i} style={{color:page===i?"blue":"black", textDecoration:page===i?"underline":"none", fontSize:"1.25rem"}}>{i}</h1>)
    }
    const billElement=displayList.data && displayList.data.length>0?displayList.data.map((el:any,id:number)=><ViewBillCard data={el} key={id}/>):<></>
    React.useEffect(()=>{
        if(page===1){
            setCurrOweList(oweBillList.slice(0,10));
        }
        else{
            setCurrOweList(oweBillList.slice((page-1)*10, page*10));
        }
    },[oweBillList, page])
    React.useEffect(()=>{
        if(currOweList.length>0){
            dispatch(getOweBill({data:{currOweList}, token}))
        }
        
    },[currOweList])
    console.log(displayList);
    return (
        <div className="flex flex-col justify-center items-center" style={{
            height:"fit-content",
        }}>
            <h1 style={{fontSize:"2rem", margin:"20px"}}>View Owe Bill Page</h1>
            {billElement}
            <div style={{
                marginBottom:"30px"
            }}>
                <h1 style={{
                    textDecoration:"underline"
                }}>Page</h1>
                <div className="flex flex-row justify-center items-center gap-5">{element}</div>
            </div>
        </div>
    )
}