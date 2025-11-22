import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Opening from './Opening.jsx'

function App() {
  const [showOpen, setShowOpen] = useState(true)

  return (
    <>
    <Router>
      {showOpen && (<Opening setShowOpen={setShowOpen}/>)}
      <Routes>
        <Route path="/" element={<></>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
