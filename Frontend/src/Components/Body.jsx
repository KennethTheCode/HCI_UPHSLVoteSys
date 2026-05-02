import React from 'react'
import Logo from '../Images/logo.png'
import PersLogo from '../Images/perslogo.png'
import SceLogo from '../Images/scelogo.png'
import { useNavigate } from 'react-router-dom'

function Body() {
    const navigate = useNavigate();

  return (
<div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[55vh] flex items-center justify-center'>       
     <div className=' w-[50%]  flex flex-col items-center justify-center text-center'>
            <div className='w-[10vh] flex items-center justify-around mb-1'>
                <img src={PersLogo} alt="Logo" className='h-[5vh] object-contain' />
                <img src={SceLogo} alt="Logo" className='h-[5vh] object-contain' />
            </div> 
            <h1 className='font-bold text-[5vh] text-white font-Oswald'>UPHSL</h1>
            <h1 className='font-bold text-[8vh] text-white font-Oswald'>Online Voting</h1>
            <h1 className='font-bold text-[8vh] text-white font-Oswald'>System</h1>
            <p className='text-[2vh] text-white font-Oswald'>Welcome to the UPHSL Online Voting System, where the voice of the Perpetualites is heard.</p>
            <button onClick={() => navigate('/login')} className='bg-yellow-400 w-[15vh] h-[5vh] mt-7 hover:bg-yellow-500 text-white transition-colors duration-300 font-bold py-2 px-4 rounded'>
                Get Started
            </button>
        </div>

    </div>
  )
}

export default Body