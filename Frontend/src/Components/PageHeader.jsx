import React from 'react'
import Ballot1 from '../Images/Ballot1.png'
import Logo2 from '../Images/Logo2.png'


function PageHeader() {
  return (
    <div className='flex justify-center  items-center h-[25vh]'>
        <div className='w-[70%] h-[15vh] p-5 border border-gray-300 rounded-[10px] flex'>
            <div className='w-[50%] h-full flex'>
                <div className='w-[20%] h-full flex items-center justify-center'>
                    <img src={Ballot1} alt="Ballot1" className='w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='font-bold text-[5vh] text-blue-950 font-Oswald'>Voting Precint:</h1> 
                    <p className='text-[2vh] font-Oswald'>College of Science</p>
                </div>
            </div>

            <div className='w-[50%] h-full flex'>
                <div className='w-[20%] h-full flex items-center justify-center'>
                    <img src={Logo2} alt="Logo2" className='mt-4 w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='font-bold text-[5vh] text-blue-950 font-Oswald'>Voter ID:</h1> 
                    <p className='text-[2vh] font-Oswald'>c23-0154-209</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageHeader