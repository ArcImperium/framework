import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Opening from './Opening.jsx'
import Login from './Login.jsx'

function App() {
  const [names, setNames] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/names")
      .then(res => res.join())
      .then(data => setNames(data))
  }, [])

  function throwError(err) {
    setErrorMessage(err)
    setShowError(true)

    setTimeout(() => {setShowError(false); setErrorMessage("")}, 5000)
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Opening/>}/>
        <Route path="/login" element={<Login names={names} loggedIn={loggedIn} setLoggedIn={setLoggedIn} throwError={throwError}/>}/>
      </Routes>
      {showError && (<div className="error">
        <h1 className="err">Error</h1>
        <h2 className="err-mes">{errorMessage}</h2>
      </div>)}
    </Router>
    </>
  )
}

export default App
