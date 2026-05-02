import React from 'react'

function RegForm() {
  return (
            <div className='gap-10 bg-white shadow-xl w-[25vh] h-full p-3 flex items-center flex-col justify-center'>
                <h1 className='text-blue-950 text-center font-bold text-[25px]'> Register Users</h1>
                <form>
                    <div className='flex flex-col gap-7 mt-5'>
                        <input type="text" placeholder='Email...' className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="text" placeholder='Program...' className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="password" placeholder='Password...' className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <button type="submit" className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>Register</button>
                    </div>
                </form>
            </div>
  )
}

export default RegForm