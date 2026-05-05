import React from 'react'
import Test from './Pages/Test'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Register from './Pages/Register'
import VoterPage from './Pages/VoterPage'
import VoteSummary from './Components/VoteSummary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className='bg-gray-100'>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/voter" element={<VoterPage />} />
          <Route path="/vote-summary" element={<VoteSummary />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App