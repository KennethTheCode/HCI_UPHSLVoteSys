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
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full px-4 sm:px-8 lg:px-[13%] py-4 sm:py-0 flex flex-col sm:flex-row items-center justify-between border-b-10 border-yellow-400'>
        <div className='w-full sm:w-auto max-w-[220px] mb-3 sm:mb-0'>
            <img src={Logo} alt="Logo" className='h-[4rem] w-full object-contain' />
        </div>
        <div className='w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-9 text-white font-bold text-[16px] sm:text-[18px] rounded'>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer' onClick={() => navigate('/')}>Home</p>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer' onClick={handleGuideClick}>Guide</p>
            <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer'>Privacy Statement</p>
            <div className='w-auto border-l border-white pl-3 flex items-center gap-1'>
              <span className="mt-1 material-symbols-outlined">
                  person
              </span>
              <p className='hover:text-gray-200 transition-colors duration-300 cursor-pointer' onClick={() => navigate('/login')}>Log In</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar