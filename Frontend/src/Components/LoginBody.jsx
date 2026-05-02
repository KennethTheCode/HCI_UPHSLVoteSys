import React from 'react'
import Logo from '../Images/logo.png'
import Pen from '../Images/Pen.png'
import { useNavigate } from 'react-router-dom'

function LoginBody() {
    const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 h-[80vh] flex items-center justify-center'>
        <div className='w-[80%] h-[70vh] flex p-8 gap-30'>
            <div className='w-[50%] h-full p-5 flex flex-col justify-center'>
                <div className='w-full h-[7vh] flex'>
                    <img src={Logo} alt="Logo" className='h-[7vh] object-contain' />
                </div>
                    <h1 className='font-bold text-[8vh] text-white font-Oswald'>Welcome to UPHSL Online<br></br>Voting System</h1>
                    <div className='w-[80%]'>
                    <p className='text-[2vh] text-white font-Oswald'>Experience a secure and transparent voting process with our online system</p>
                    <p className='text-[1.5vh] text-gray-300 font-Oswald'>This system is designed to provide a secure and efficient way for students to participate in the electoral process, ensuring that their voices are heard and their votes are counted accurately.</p>
                </div>
            </div>

            <div className='bg-white rounded-[3%] w-[40%] border-2 border-gray-100 shadow-2xl h-full flex flex-col items-center text-center'>
                <div className='h-[25vh] flex items-center justify-center m'>
                    <img src={Pen} alt="Logo" className='h-full object-contain' />
                </div>
                <h1 className='mb-5 font-bold text-[5vh] text-blue-900 font-Oswald'>Vote Wisely!</h1>
                <input className='w-[70%] bg-gray-100 border-b-3 border-gray-300  h-[1vh] p-5 placeholder:text-gray-500' placeholder='Username'></input>
                <input className='mt-10 w-[70%] bg-gray-100 border-b-3 border-gray-300  h-[1vh] p-5 placeholder:text-gray-500' placeholder='Password'></input>
                <button onClick={() => navigate('/admin')} className='text-[15px] text-white font-Oswald bg-yellow-400 w-[70%] h-[5vh] mt-7 hover:bg-yellow-500 text-white transition-colors duration-300 font-bold py-2 px-4 rounded'>
                    Login
                </button>    
            </div>
        </div>
        
    </div>
  )
}

export default LoginBody