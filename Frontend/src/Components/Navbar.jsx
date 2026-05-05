import React from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[10vh] flex items-center justify-between pl-[13%] pr-[15%] border-b-10 border-yellow-400'>
        <div className='h-[8vh] w-[40vh]'>
            <img src={Logo} alt="Logo" className='h-full w-full object-contain' />
        </div>
        <div className='h-[8vh] w-[40vh] flex items-center justify-center gap-9 text-white font-bold text-[2vh] rounded'>
            <p className='hover:text-gray-200 transition-colros duration-300'>Home</p>
            <p className='hover:text-gray-200 transition-colros duration-300'>Guide</p>
            <p className='hover:text-gray-200 transition-colros duration-300'>Privacy Statement</p>
            <div className='w-[7vh] border-l border-white flex justify-end'>
            <span className="material-symbols-outlined">
                person
            </span>
            <p onClick={() => navigate('/login')}>Log In</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar