import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import LoginBody from '../Components/LoginBody'
import Footer from '../Components/Footer'



function Login() {
  return (
    <div>
        <Navbar />
        <LoginBody />
        <Footer />
    </div>
  )
}

export default Login