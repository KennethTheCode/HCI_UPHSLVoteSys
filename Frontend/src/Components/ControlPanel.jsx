import React from 'react'
import { useNavigate } from 'react-router-dom'


function ControlPanel() {
  const navigate = useNavigate();
  return (
    <div className='mx-98 h-[5vh] flex items-center justify-between'>
        <div className='flex gap-3'>
            <button className='bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300'>Add Position</button>
            <button className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>Add Candidate</button>
            <button className='bg-yellow-500 text-white font-bold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300'>Archive Candidate</button>
            <button className='bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300'>Edit Candidate</button>
        </div>
        <div className='flex gap-3'>
            <button className='bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300'>Show Vote summary</button>
            <button className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>Show Leading</button>
            <button className='bg-yellow-500 text-white font-bold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300' onClick={() => navigate('/register')}>
                Register Users
            </button>
        </div>
    </div>
  )
}

export default ControlPanel