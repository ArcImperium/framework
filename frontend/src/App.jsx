import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Opening from './Opening.jsx'
import Login from './Login.jsx'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Opening/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
