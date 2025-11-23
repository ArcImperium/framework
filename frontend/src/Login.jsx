import './Login.css'
import {useState} from "react"

function Login() {
    const [create, setCreate] = useState(false)

    const [user, setUser] = useState(null)
    const [pass, setPass] = useState(null)

    return(
        <>
        <div className="login">
            {!create && (<h1 className="title">LOGIN</h1>)}
            {create && (<h1 className="title">CREATE ACCOUNT</h1>)}
            <div className="userpass-wrap">
                <h2 className="userpass-text">USERNAME: </h2>
                <input type="text" className="userpass" value={user} onChange={(e) => {setUser(e.target.value)}}/>
            </div>
            <div className="userpass-wrap">
                <h2 className="userpass-text">PASSWORD: </h2>
                <input type="password" className="userpass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
            </div>
            {!create && (<h3 className="go-to-create" onClick={() => {setCreate(true)}}>CREATE AN ACCOUNT</h3>)}
            {create && (<h3 className="go-to-create" onClick={() => {setCreate(false)}}>BACK TO LOGIN</h3>)}
            {!create && (<button className="log-btn">LOGIN</button>)}
            {create && (<button className="log-btn">CREATE</button>)}
        </div>
        </>
    )
}

export default Login