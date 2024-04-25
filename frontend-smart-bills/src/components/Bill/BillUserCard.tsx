import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png"
import { useAppSelector } from "../../app/hooks";
export default function BillUserCard(props:{ amount:number, setInvolveList:any, involveList:any, equal: boolean, id:number, fullName:string, username:string, phoneNumber:string}){
    const currUser=useAppSelector(state=>state.user.currentUser);
    const [formData, setFormData]=React.useState<{isPaid:boolean, amount:number, userId:number, userFullName:string}>({
        isPaid:false,
        amount:props.equal?props.amount:0,
        userId:props.id===currUser.id?currUser.id:props.id,
        userFullName:props.fullName===currUser.fullName? currUser.fullName:props.fullName,
    });
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        setIsClicked(prev=>!prev);
    }
    //adjust amount based on change in equal to display.
    React.useEffect(()=>{
        if(props.equal===true && isClicked===true){
            setFormData(prev=>{
                return {
                    ...prev,
                    amount:props.amount
                }
            })
        }
    },[props.equal])
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
    },[props.equal, formData.amount]);
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
    const [isClicked, setIsClicked]=React.useState(false);
    React.useEffect(()=>{
        if(!props.involveList.includes(formData) && isClicked===true){
            props.setInvolveList((prev:any)=>{
                return [
                    ...prev,
                    formData,
                ]
            })
        }
        else if(isClicked===false){
            props.setInvolveList((prev:any)=>{
                const arr=prev.filter((el:any)=>el.userId!==formData.userId)
                return arr;
            })
        }
    },[isClicked]);
    return(
        <div className="w-full h-full" style={{
            display:"grid",
            gridTemplateColumns:"30% 45% 25%",
            padding:"15px",
            border:"1px solid gray",
            maxWidth:"500px",
            height:"fit-content",
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
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3">
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
                        <button className="bg-black text-white rounded-xl hover:bg-white hover:text-black duration-300" style={{
                            border:"1px solid black",
                            width:"100%"
                        }}>{!isClicked?"Add":"Remove"}</button>
                    </form>
                </div>
            <div className="flex flex-col justify-center items-center ">
                
            </div>
        </div>
    )
}