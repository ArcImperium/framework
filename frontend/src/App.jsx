import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Opening from './Opening.jsx'
import Login from './Login.jsx'

function App() {
  const [names, setNames] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4000/names")
      .then(res => res.join())
      .then(data => setNames(data))
  }, [])

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Opening/>}/>
        <Route path="/login" element={<Login names={names} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
