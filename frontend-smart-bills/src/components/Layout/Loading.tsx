import React from "react"
import ReactDOM from "react-dom"
import "../../css/Loading.css"
export default function Loading(){
    return ReactDOM.createPortal(
        <div className="overlay">
            <h3>Server may be slow sometimes, please be patient...</h3>
            <span className="loader"></span>
        </div>,
        document.body
    )
}