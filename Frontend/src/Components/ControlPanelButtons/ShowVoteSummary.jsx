import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function ShowVoteSummary() {
    const navigate = useNavigate();
  return (
            <button className='bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-700 transition-colors duration-300' onClick={() => navigate('/vote-summary')}>
                Show Vote summary
            </button>
  )
}

export default ShowVoteSummary