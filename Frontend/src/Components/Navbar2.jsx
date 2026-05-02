import React from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar2() {
  return (
 <div className='flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[5vh] pl-[13%] pr-[15%] border-b-10 border-yellow-400'>
        <div className='h-[8vh] w-[40vh] flex items-center justify-center gap-7 text-white font-bold text-[2vh] rounded'>
            <p>Home</p>
            <p>Guide</p>
            <p>Privacy Statement</p>
            <div className='w-[9vh] border-l border-white flex justify-end'>
                <span className="material-symbols-outlined">
                    person
                </span>
                <p onClick={() => navigate('/login')}>Log Out</p>
            </div>
        </div>
    </div>  )
}

export default Navbar2