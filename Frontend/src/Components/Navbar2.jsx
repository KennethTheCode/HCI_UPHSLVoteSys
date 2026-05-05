import React from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar2() {
const navigate = useNavigate();
  return (
 <div className='flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[5vh] pl-[13%] pr-[15%] border-b-10 border-yellow-400'>
        <div className='h-[8vh] w-[40vh] flex items-center justify-center gap-7 text-white font-bold text-[2vh] rounded'>
            <p className='hover:text-gray-200 transition-colros duration-300' onClick={() => navigate('/admin')}>Home</p>
            <p className='hover:text-gray-200 transition-colros duration-300'>Guide</p>
            <p className='hover:text-gray-200 transition-colros duration-300'>Privacy Statement</p>
            <div className='w-[9vh] border-l border-white flex justify-end'>
                <span className="material-symbols-outlined">
                    person
                </span>
                <p className='hover:text-gray-200 transition-colors duration-300' onClick={() => navigate('/login')}>Log Out</p>
            </div>
        </div>
    </div>  )
}

export default Navbar2