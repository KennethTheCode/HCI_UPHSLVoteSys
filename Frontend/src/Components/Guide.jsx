import React from 'react'
import Step1 from '../Images/Step1.jpeg'
import Step2 from '../Images/Step2.jpeg'
import Step3 from '../Images/Step3.jpeg'
import Step4 from '../Images/Step4.jpeg'


function Guide() {
  return (
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900  w-full  p-5 flex items-center flex-col gap-10'>
      <div className='w-[90vh] h-[60vh] bg-white p-3 text-center shadow-2xl rounded-lg'>
          <h1 className='text-2xl font-bold text-blue-950 mb-4'>Step 1: Login to the Voting System</h1>
          <div className='w-full h-[50vh] flex items-center justify-center'>
            <img src={Step1} alt="Logo" className='object-fit' />        
          </div>
      </div>
      <div className='w-[90vh] h-[60vh] bg-white p-3 text-center shadow-2xl rounded-lg'>
          <h1 className='text-2xl font-bold text-blue-950 mb-4'>Step 2: Analyze and choose your candidates</h1>
          <div className='w-full h-[50vh] flex items-center justify-center'>
            <img src={Step2} alt="Logo" className='object-fit' />        
          </div>
      </div>
      <div className='w-[90vh] h-[60vh] bg-white p-3 text-center shadow-2xl rounded-lg'>
          <h1 className='text-2xl font-bold text-blue-950 mb-4'>Step 3: Review and submit your votes</h1>
          <div className='w-full h-[50vh] flex items-center justify-center'>
            <img src={Step3} alt="Logo" className='object-fit' />        
          </div>
      </div>
      <div className='w-[90vh] h-[60vh] bg-white p-3 text-center shadow-2xl rounded-lg'>
          <h1 className='text-2xl font-bold text-blue-950 mb-4'>Step 4: A short summary of your votes</h1>
          <div className='w-full h-[50vh] flex items-center justify-center'>
            <img src={Step4} alt="Logo" className='object-fit' />        
          </div>
      </div>
    </div>
  )
}

export default Guide