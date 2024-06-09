import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png"
import { useAppSelector } from "../../app/hooks";
export default function BillUserCard(props:{ amount:number, isPaid?:boolean, editAmount?:number, setInvolveList:any, involveList:any, equal: boolean, id:number, fullName:string, username:string, phoneNumber:string, included?: any}){
    const currUser=useAppSelector(state=>state.user.currentUser);
    const [formData, setFormData]=React.useState<{isPaid:boolean, amount:number, userId:number, userFullName:string}>({
        isPaid:props.id===currUser.id?true:false,
        amount:props.equal?props.amount:0,
        userId:props.id===currUser.id?currUser.id:props.id,
        userFullName:props.fullName===currUser.fullName? currUser.fullName:props.fullName,
    });

    const [isClicked, setIsClicked]=React.useState(props.id===currUser.id?true:false);

    //adjust amount based on change in equal to display.
    React.useEffect(()=>{
        const check=props.involveList.filter((el:any)=>el.userId===props.id)
        if(check.length>0){
            setFormData(prev=>{
                return{
                    ...check[0],
                    isPaid: true,
                    userId: currUser.id
                }
            });
            setIsClicked(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id, currUser.id])
    React.useEffect(()=>{
        if(props.equal===true && isClicked===true){
            setFormData(prev=>{
                return {
                    ...prev,
                    amount:props.amount
                }
            })
        }
    },[props.equal, isClicked, props.amount])
    //adjust amount based on change in equal to the involve list
    React.useEffect(()=>{
        if(props.equal===true && isClicked===true){
            props.setInvolveList((prev:any)=>{
                const arr=prev.map((el:{isPaid:boolean, amount:number, userId:number, userFullName:string})=>{
                    if (el.userId===formData.userId){
                        return {
                            ...el,
                            amount:formData.amount,
                        }
                    }
                    return el;
                });
                return arr;
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData.amount, formData.userId, isClicked]);
    const handleChange=(e:any)=>{
        const {name, type, value, checked}=e.target;
        if(type==="checkbox"){
            setFormData(prev=>{
                return {
                    ...prev,
                    [name]:checked
                }
            })
        }
        else setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    React.useEffect(() => {
        if (isClicked === true) {
          if (!props.involveList.some((el: any) => el.userId === formData.userId)) {
            props.setInvolveList((prev: any) => [
              ...prev,
              formData,
            ]);
          }
        } else if (isClicked === false) {
          props.setInvolveList((prev: any) => {
            const arr = prev.filter((el: any) => el.userId !== formData.userId);
            return arr;
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isClicked, formData]);
    return(
        <div className="w-full h-full" style={{
            display:"grid",
            gridTemplateColumns:"30% 45% 25%",
            padding:"15px",
            border:"1px solid gray",
            maxWidth:"500px",
            minHeight:"20%",
            background:isClicked?"lightgreen":"white"
        }}>
            <div className="flex flex-col justify-center items-center">
                <img src={defaultAvatar} alt="avatar"/>
            </div>
            <div style={{
                display:"grid",
                gridTemplateRows:"30% 30% 30%"
            }}>
                <div className="flex flex-col justify-center items-center">
                    <h1>{props.fullName}</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>Username: {props.username}</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>Phone: {props.phoneNumber}</h1>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                    <form id="billForm" className="flex flex-col justify-center items-center gap-3">
                        <input type="number" readOnly={isClicked} onChange={handleChange} placeholder="$ Amount" name="amount" value={formData.amount} className="w-5/6" style={{
                            border:"1px solid black",
                            background:isClicked?"lightgrey":"white",
                            borderRadius:"10px",
                            padding:"3px"
                        }} required/>
                        <div className="flex flex-row gap-1">
                            <input onChange={handleChange} id={"isPaid"+props.username} type="checkbox" checked={formData.isPaid} disabled={isClicked} name="isPaid"/>
                            <label htmlFor={"isPaid"+props.username}>Is Paid?</label>
                        </div>
                        <div onClick={()=>setIsClicked(prev=>!prev)} className="cursor-pointer bg-black text-white rounded-xl hover:bg-white hover:text-black duration-300" style={{
                            border:"1px solid black",
                            width:"100%"
                        }}>{!isClicked?"Add":"Remove"}</div>
                    </form>
                </div>
            <div className="flex flex-col justify-center items-center ">
                
            </div>
        </div>
    )
}