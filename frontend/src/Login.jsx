import './Login.css'
import {useState} from "react"

function Login({names, loggedIn, setLoggedIn, throwError}) {
    const [create, setCreate] = useState(false)

    const [user, setUser] = useState(null)
    const [pass, setPass] = useState(null)

    const [showPass, setShowPass] = useState(false)

    function loginAccount() {
        const realUser = names.findIndex(list => list[1] === user)
        const realPass = names[realUser][2]

        if (pass === realPass) {
            setLoggedIn(true)
        }
        else {
            throwError("Username or Password is incorrect")
        }
    }

    async function createAccount() {
        const existUser = names.includes(user)

        if (!existUser) {
            const res = await fetch("http://localhost:4000/names", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user,
                    pass
                }) 
            })
            setCreate(false)
        }
    }

    return(
        <>
        <div className="login">
            {!create && (<h1 className="title">LOGIN</h1>)}
            {create && (<h1 className="title">CREATE ACCOUNT</h1>)}
            <div className="userpass-wrap">
                <h2 className="userpass-text">USERNAME: </h2>
                <input type="text" className="userpass" value={user} onChange={(e) => {setUser(e.target.value)}}/>
                <div className="show-pass none"></div>
            </div>
            <div className="userpass-wrap">
                <h2 className="userpass-text">PASSWORD: </h2>
                {!showPass && (<input type="password" className="userpass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>)}
                {showPass && (<input type="text" className="userpass" value={pass} onChange={(e) => {setPass(e.target.value)}}/>)}
                <button className="show-pass" onClick={() => {setShowPass(prev => !prev)}}>👀</button>
            </div>
            {!create && (<h3 className="go-to-create" onClick={() => {setCreate(true)}}>CREATE AN ACCOUNT</h3>)}
            {create && (<h3 className="go-to-create" onClick={() => {setCreate(false)}}>BACK TO LOGIN</h3>)}
            {!create && (<button className="log-btn" onClick={() => {loginAccount()}}>LOGIN</button>)}
            {create && (<button className="log-btn" onClick={() => {createAccount()}}>CREATE</button>)}
        </div>
        </>
    )
}

export default Login