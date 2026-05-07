import React from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar({ onGuideClick }) {
  const navigate = useNavigate();

  const handleGuideClick = () => {
    if (onGuideClick) {
      onGuideClick()
    }
  }

  return (
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[10vh] flex items-center justify-between pl-[13%] pr-[15%] border-b-10 border-yellow-400'>
        <div className='h-[8vh] w-[40vh]'>
            <img src={Logo} alt="Logo" className='h-full w-full object-contain' />
        </div>
        <div className='h-[8vh] w-[50vh] flex items-center justify-center gap-9 text-white font-bold text-[18px] rounded'>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer' onClick={() => navigate('/')}>Home</p>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer' onClick={handleGuideClick}>Guide</p>
            <div className='w-[10vh] border-l border-white flex justify-end flex items-center justify-end gap-1'>
            <span className="mt-1 material-symbols-outlined">
                person
            </span>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer'onClick={() => navigate('/login')}>Log In</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar