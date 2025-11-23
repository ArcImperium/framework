import './Opening.css'
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import fullFramework from './assets/framework_laptop.jpg'

function Opening() {
    const [inOut, setInOut] = useState(null)
    const [inOutNum, setInOutNum] = useState(1)
    const [topNum, setTopNum] = useState(0)
    const [fullIn, setFullIn] = useState(false)
    const [fullOut, setFullOut] = useState(true)

    const nav = useNavigate()

    function goIn() {
        setInOutNum(2)
        setTopNum(-200 / 3)
        setFullOut(false)
        setTimeout(() => {setInOut(null); setFullIn(true)}, 5000)
    }
    function goOut() {
        setInOutNum(1)
        setTopNum(0)
        setFullIn(false)
        setTimeout(() => {setInOut(null); setFullOut(true)}, 5000)
    }

    return(
        <>
        <img src={fullFramework} className={`full-framework ${inOut ? "moving" : ""}`} style={{"--in-out-num": `${inOutNum}`, "--top-num": `${topNum}%`}}/>
        {fullIn && (<div className="framework-box" onClick={() => {nav("/login")}}></div>)}
        {fullOut && (<button className="in-out-btn" onClick={() => {if (inOut !== "in") {setInOut("in"); goIn()}}}>IN</button>)}
        {fullIn && (<button className="in-out-btn" onClick={() => {if (inOut !== "out") {setInOut("out"); goOut()}}}>OUT</button>)}
        </>
    )
}

export default Opening