import React, { useEffect, useState } from 'react'
import Ballot1 from '../Images/Ballot1.png'
import Logo2 from '../Images/Logo2.png'

function PageHeader() {
  const [userEmail, setUserEmail] = useState('')
  const [program, setProgram] = useState('')

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData)
        setUserEmail(userData.email || '')
        setProgram(userData.program || '')
        return
      } catch (error) {
        console.error('Failed to parse userData from localStorage', error)
      }
    }

    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setUserEmail(storedEmail)
    }
  }, [])

  return (
    <div className='flex justify-center items-center h-[25vh]'>
      <div className='w-[70%] h-[15vh] p-5 border border-gray-300 rounded-[10px] flex'>
        <div className='w-[50%] h-full flex'>
          <div className='w-[20%] h-full flex items-center justify-center'>
            <img src={Ballot1} alt='Ballot1' className='w-full h-full object-contain' />
          </div>
          <div>
            <h1 className='font-bold text-[5vh] text-blue-950 font-Oswald'>Voting Precinct:</h1>
            <p className='text-[2vh] font-Oswald'>{program || 'Unknown'}</p>
          </div>
        </div>

        <div className='w-[50%] h-full flex items-center'>
          <div className='w-[20%] h-full flex items-center justify-center'>
            <img src={Logo2} alt='Logo2' className='mt-4 w-full h-full object-contain' />
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='font-bold text-[3vh] text-blue-950 font-Oswald'>Current User</h1>
            <p className='text-[2vh] font-Oswald'>{userEmail || 'Not signed in'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader