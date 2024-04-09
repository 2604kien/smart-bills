import React from "react";
import { Outlet, useLocation} from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refresh } from "../../reducers/authReducer";
import BillCard from "./BillCard";
export default function Layout(){
    const dispatch=useAppDispatch();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const token=useAppSelector(state=>state.auth.accessToken);
    const location=useLocation();
    //refresh to check if cookie contains valid jwt, if yes then request new accessToken
    React.useEffect(()=>{
        if(!isAuthenticated){
            dispatch(refresh());
        }
    },[]);
    //refresh if the current accessToken expire.
    React.useEffect(()=>{
        const tokenExpirationThreshold :number = 3 * 60;
        let exp = token && token.length > 0 ? JSON.parse(atob(token.split('.')[1])).exp : 0;
        const intervalId = setInterval(() => {
            if ((exp - Date.now() / 1000 < tokenExpirationThreshold)&&isAuthenticated) {
                // Dispatch the refreshAccessToken action
                dispatch(refresh());
            }
        }, 13 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [dispatch, token]);
    return (
        <div className="flex flex-col" style={{height:"inherit", zIndex:"999"}}>
            <Navbar/>
            {location.pathname.includes("bill")?<BillCard/>:<></>}
            <Outlet/>
        </div>
    )
}