import React from "react"
import ReactDOM from "react-dom"
import "../../css/Loading.css"
export default function Loading(){
    return ReactDOM.createPortal(
        <div className="overlay">
            <span className="loader"></span>
        </div>,
        document.body
    )
}