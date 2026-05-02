import React from 'react'
import ThumbsUpLogo from '../Images/ThumbsUpLogo.png'
import BallotLogo from '../Images/BallotLogo.png'

function Body2() {
  return (
    <div className=' w-full h-[55vh] flex items-center justify-between px-[%]'>
        <div className='w-[80vh] h-[50vh] flex flex-col items-center '>
            <div className='w-[50%] h-[30vh] mb-[5vh]'>
                <img src={ThumbsUpLogo} alt="Logo" className='object-contain' />
            </div>
            <h1 className='font-bold text-[5vh] text-blue-950'>Vote with Confidence</h1>
            <p className='text-[20px] text-gray-600 text-center'>Experience a secure and transparent voting process with our online system</p>
        </div>
        <div className='w-[80vh] h-[50vh] flex flex-col items-center '>
            <div className='w-[50%] h-[30vh] mb-[5vh]'>
                <img src={BallotLogo} alt="Logo" className='object-contain' />
            </div>
            <h1 className='font-bold text-[5vh] text-blue-950'>Your <span className='text-amber-500'>Voice</span>, Your <span className='text-amber-500'>Choice</span></h1>
            <p className='text-[20px] text-gray-600 text-center'>Make your voice heard and participate in the democratic process.</p>
        </div>  
    </div>
  )
}

export default Body2