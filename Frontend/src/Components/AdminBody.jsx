import React from 'react'
import Candidate1 from '../Images/Candidates/Candidate1.png'

function AdminBody() {
  return (
    <div className='mx-98 bg-gray-300 rounded-[5px] h-[50vh] p-5'>
        <div className='bg-white w-[26vh] h-[10vh] rounded-[10px] p-2 flex gap-4'>
            <div className='bg-red-500 w-[9vh] h-full rounded-full overflow-hidden flex items-center justify-center'>
                <img src={Candidate1} alt="Candidate" className='h-full w-full object-cover' />
            </div>  
            <div className='flex flex-col justify-center items-start'>
                <h1 className='text-black font-bold text-[15px]'>BUGAYONG, Marianne</h1>
                <div className='bg-red-300 px-2 py-1 text-center rounded-lg'>
                    <p className='text-[12px] text-red-500 font-bold'>SINAGTALA</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminBody