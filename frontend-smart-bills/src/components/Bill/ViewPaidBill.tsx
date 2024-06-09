import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPaidBill } from "../../reducers/billReducer";
import ViewBillCard from "./ViewBillCard";
export default function ViewPaidBill(){
    const PaidBillList=useAppSelector(state=>state.user.currentUser.paidList);
    const [page, setPage]=React.useState(1);
    const [currList, setCurrPaidList]=React.useState([]);
    const dispatch=useAppDispatch();
    const token=useAppSelector(state=>state.auth.accessToken);
    const element=[];
    const displayListUnSorted:any=useAppSelector(state=>state.bill.paidList);
    const displayList=displayListUnSorted.length>0?[...displayListUnSorted].reverse():[];
    for(let i=1; i<PaidBillList.length/10+1; i++){
        element.push(<h1 className="cursor-pointer hover:scale-125" onClick={()=>setPage(i)} key={i} style={{color:page===i?"blue":"black", textDecoration:page===i?"underline":"none", fontSize:"1.25rem"}}>{i}</h1>)
    }
    const billElement=displayList && displayList.length>0?displayList.map((el:any,id:number)=><ViewBillCard data={el} isPaid={true} key={id}/>):<></>
    React.useEffect(()=>{
        if(page===1){
            setCurrPaidList(PaidBillList.slice(0,10));
        }
        else{
            setCurrPaidList(PaidBillList.slice((page-1)*10, page*10));
        }
    },[PaidBillList, page])
    React.useEffect(()=>{
        if(currList.length>0){
            dispatch(getPaidBill({data:{currList}, token}))
        }
        
    },[currList, dispatch, token])
    return (
        <div className="flex flex-col justify-center items-center" style={{
            height:"fit-content",
        }}>
            <h1 style={{fontSize:"2rem", margin:"20px"}}>View Paid Bill Page</h1>
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