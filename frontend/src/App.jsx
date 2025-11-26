import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Opening from './Opening.jsx'
import Login from './Login.jsx'
import Levels from './Levels.jsx'

function App() {
  const [names, setNames] = useState([])
  const [loggedIn, setLoggedIn] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/names")
      .then(res => res.json())
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
        <Route path="/login" element={<Login names={names} setLoggedIn={setLoggedIn} throwError={throwError}/>}/>
        <Route path="/levels/:id" element={<Levels names={names} setNames={setNames} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
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
