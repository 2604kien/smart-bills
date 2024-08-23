import React from "react";
import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { refresh } from "../../reducers/authReducer";
//Layout page for the whole website
export default function Layout(){
    const dispatch=useAppDispatch();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const token=useAppSelector(state=>state.auth.accessToken);
    //refresh to check if cookie contains valid jwt, if yes then request new accessToken
    React.useEffect(()=>{
        if(!isAuthenticated){
            dispatch(refresh());
        }
    },[dispatch, isAuthenticated]);
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
    }, [dispatch, token, isAuthenticated]);
    return (
        <div className="flex flex-col" style={{height:"inherit", zIndex:"999"}}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}