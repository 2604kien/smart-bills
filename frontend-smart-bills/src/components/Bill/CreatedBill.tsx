import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCreatedBill } from "../../reducers/billReducer";
import ViewCreatedCard from "./ViewCreatedCard";
export default function CreatedBill(){
    const createdBillList=useAppSelector(state=>state.user.currentUser.createdBillList);
    const [page, setPage]=React.useState(1);
    const [currList, setCurrCreatedList]=React.useState([]);
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const element=[];
    const displayListUnSorted:any=useAppSelector(state=>state.bill.createdList);
    const displayList=displayListUnSorted.length>0?[...displayListUnSorted].reverse():[];
    for(let i=1; i<createdBillList.length/10+1; i++){
        element.push(<h1 className="cursor-pointer hover:scale-125" onClick={()=>setPage(i)} key={i} style={{color:page===i?"blue":"black", textDecoration:page===i?"underline":"none", fontSize:"1.25rem"}}>{i}</h1>)
    }
    const billElement=displayList && displayList.length>0?displayList.map((el:any,id:number)=><ViewCreatedCard data={el} key={id}/>):<></>
    React.useEffect(()=>{
        if(page===1){
            setCurrCreatedList(createdBillList.slice(0,10));
        }
        else{
            setCurrCreatedList(createdBillList.slice((page-1)*10, page*10));
        }
    },[page, createdBillList])
    React.useEffect(()=>{
        if(currList.length>0){
            dispatch(getCreatedBill({data:{currList}, token}))
        }
        
    },[currList])
    return (
        <div className="flex flex-col justify-center items-center" style={{
            height:"fit-content",
        }}>
            <h1 style={{fontSize:"2rem", margin:"20px"}}>View Created Bill Page</h1>
            {billElement}
            <div style={{
                marginBottom:"30px"
            }}>
                <h1 style={{
                }}>Page</h1>
                <div className="flex flex-row justify-center items-center gap-5">{element}</div>
            </div>
        </div>
    )
}