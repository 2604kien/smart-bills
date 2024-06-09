import React from "react";
import defaultAvatar from "../../Logo/defaultAvatar.png";
import { useAppSelector } from "../../app/hooks";

export default function BillUserCard(props:any) {
    const currUser = useAppSelector(state => state.user.currentUser);
    const [formData, setFormData] = React.useState({
        isPaid: props.id === currUser.id,
        amount: props.equal ? props.amount : 0,
        userId: props.id,
        userFullName: props.fullName,
        username: props.username
    });
    const [isClicked, setIsClicked] = React.useState(props.id === currUser.id);

    // Update formData when editAmount changes
    React.useEffect(() => {
        if (props.editAmount) {
            setFormData(prev => ({
                ...prev,
                isPaid: props.isPaid,
                amount: props.editAmount
            }));
            setIsClicked(true);
        }
    }, [props.isPaid, props.editAmount]);

    // Handle equal split amount
    React.useEffect(() => {
        if (props.equal && isClicked) {
            setFormData(prev => ({
                ...prev,
                amount: props.amount
            }));
        }
    }, [props.equal, isClicked, props.amount]);
        //adjust amount based on change in equal to the involve list
    React.useEffect(()=>{
            if(props.equal===true && isClicked===true){
                props.setInvolveList((prev:any)=>{
                    const arr=prev.map((el:{isPaid:boolean, amount:number, userId:number, userFullName:string})=>{
                        if (el.userId===formData.userId){
                            return {
                                ...el,
                                amount:props.amount,
                            }
                        }
                        return el;
                    });
                    return arr;
                })
        }
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formData.amount, formData.userId, isClicked]);
    // Add or remove user from involveList
    React.useEffect(() => {
        if (isClicked) {
            if (!props.involveList.some((el:any) => el.userId === formData.userId)) {
                props.setInvolveList((prev:any) => [...prev, formData]);
            }
        } else {
            props.setInvolveList((prev:any) => prev.filter((el:any) => el.userId !== formData.userId));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClicked, formData]);

    // Handle form data changes
    const handleChange = (e:any) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <div className="w-full h-full" style={{
            display: "grid",
            gridTemplateColumns: "30% 45% 25%",
            padding: "15px",
            border: "1px solid gray",
            maxWidth: "500px",
            minHeight: "20%",
            background: isClicked ? "lightgreen" : "white"
        }}>
            <div className="flex flex-col justify-center items-center">
                <img src={defaultAvatar} alt="avatar" />
            </div>
            <div style={{
                display: "grid",
                gridTemplateRows: "30% 30% 30%"
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
                        border: "1px solid black",
                        background: isClicked ? "lightgrey" : "white",
                        borderRadius: "10px",
                        padding: "3px"
                    }} required />
                    <div className="flex flex-row gap-1">
                        <input onChange={handleChange} id={"isPaid" + props.username} type="checkbox" checked={formData.isPaid} disabled={isClicked} name="isPaid" />
                        <label htmlFor={"isPaid" + props.username}>Is Paid?</label>
                    </div>
                    <div onClick={() => setIsClicked(prev => !prev)} className="cursor-pointer bg-black text-white rounded-xl hover:bg-white hover:text-black duration-300" style={{
                        border: "1px solid black",
                        width: "100%"
                    }}>{!isClicked ? "Add" : "Remove"}</div>
                </form>
            </div>
        </div>
    );
}
