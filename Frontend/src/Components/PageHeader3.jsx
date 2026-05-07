import React from 'react'

function PageHeader3({Header}) {
  return (
    <div className='h-[10vh] mx-[12%] '>
        <h1 className='mb-2 font-bold text-[3vh] text-blue-950 font-Oswald'>{Header}</h1> 
        <div className='bg-gradient-to-r from-blue-950 via-blue-800 to-white h-[7px]'>
        </div>
    </div>
  )
}

export default PageHeader3