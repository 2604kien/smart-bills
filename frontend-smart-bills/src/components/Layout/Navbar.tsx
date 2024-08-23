import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../Logo/WhiteBackground.png";
import Menu from "./Menu";
import Profile from "./Profile";
import NotificationBox from "./Notifcation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserById } from "../../reducers/userReducer";
//Navbar of the whole website
export default function Navbar(){
    const navigate=useNavigate();
    const location=useLocation();
    //get user by id if login;
    const dispatch=useAppDispatch();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const token=useAppSelector(state=>state.auth.accessToken);
    const id=token&& token.length>0?JSON.parse(atob(token.split('.')[1])).UserInfo.id:Math.random();
    React.useEffect(()=>{
        if(isAuthenticated) dispatch(getUserById({id, token}));
    },[isAuthenticated, dispatch, id, token]);
    const [isClick, setIsClick]=React.useState<boolean>(false);
    const [isProfileClick, setIsProfileClick]=React.useState<boolean>(false);
    const [isNotificationClick, setIsNotificationClick]=React.useState<boolean>(false);
    const hanndleMenuClick=()=>{
        setIsClick(prev=>!prev);
    }
    const hanndleProfileClick=()=>{
        setIsProfileClick(prev=>!prev);
    }
    const hanndleNotificationClick=()=>{
        setIsNotificationClick(prev=>!prev);
    }
    const menuRef=React.useRef<HTMLInputElement>(null);
    const profileRef=React.useRef<HTMLInputElement>(null);
    const notificationRef=React.useRef<HTMLInputElement>(null);
    React.useEffect(()=>{
        let handler=(e:any)=>{
            const element=menuRef.current;
            const element2=profileRef.current;
            const element3=notificationRef.current;
            if(element && !element.contains(e.target)) {
                setIsClick(false);
            }
            if(element2 && !element2.contains(e.target)) {
                setIsProfileClick(false);
            }
            if(element3 && !element3.contains(e.target)) {
                setIsNotificationClick(false);
            }
        }
        document.addEventListener("mousedown", handler);
    },[])
    return(
        <div style={{position:"relative", zIndex:"999"}}>
        <div className="h-20">
        </div>
        <div className="select-none sm:border h-20 border-gray text-black" style={{width:"100vw", top:"0", position:"fixed", borderLeft:"none", borderRight:"none", display:"grid", gridTemplateColumns:"20% 60% 20%"}} >
            <div className="flex duration-300 flex-col justify-center items-center" style={{visibility:location.pathname.includes('bill')?"hidden":"visible",height:"inherit", backgroundColor:"#f0f0f0"}}>
                <img src={Logo} alt="Smartbills-Logo" style={{scale:"0.8"}} className="h-full cursor-pointer brightness-0 hover:brightness-100 duration-150" onClick={()=>navigate('/')}/>
            </div>
            <div className="flex duration-300 flex-col justify-center items-center" style={{width:"100%", backgroundColor:location.pathname.includes("bill")?"white":"#f0f0f0"}}>
                <div className="flex flex-col justify-center items-center w-4/6" style={{position:"relative"}}>
                    <i style={{position:"absolute", left:"8px", borderRadius:"50%", padding:"10px"}} className="cursor-pointer hover:bg-gray-50 hover:opacity-50 duration-300 hover:brightness-75 fa-solid fa-magnifying-glass"></i>
                    <input className="border-gray sm:border-2 rounded-xl " placeholder="Search" style={{width:"100%", textIndent:"35px", padding:"8px"}}/>
                </div>
            </div>
            <div style={{fontSize:"1.5rem", gap:"20px", backgroundColor:location.pathname.includes("bill")?"white":"#f0f0f0", zIndex:"999"}} className="z-10 duration-300 flex flex-row justify-around items-center">
                <i onClick={hanndleNotificationClick} className="fa-solid fa-bell cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i onClick={hanndleProfileClick} className="fa-solid fa-user cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>
                <i onClick={hanndleMenuClick} className="fa-solid fa-bars cursor-pointer hover:brightness-50 duration-150 hover:text-white"></i>

            </div>
        </div>
        <div style={{position:"relative", zIndex:"-1"}}>
            <Menu menuRef={menuRef} handleMenuClick={hanndleMenuClick} isClick={isClick}/>
            <Profile profileRef={profileRef} handleClick={hanndleProfileClick} isClick={isProfileClick}/>
            <NotificationBox notificationRef={notificationRef} handleClick={hanndleNotificationClick} isClick={isNotificationClick}/>
        </div>
        </div>
        
    )
}