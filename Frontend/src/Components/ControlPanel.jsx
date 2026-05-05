import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AddPosition from './ControlPanelButtons/AddPosition'
import AddCandidate from './ControlPanelButtons/AddCandidate';
import ArchiveCandidate from './ControlPanelButtons/ArchiveCandidate';
import EditCandidate from './ControlPanelButtons/EditCandidate';
import ShowVoteSummary from './ControlPanelButtons/ShowVoteSummary';

function ControlPanel() {
  const navigate = useNavigate();

  return (
    <div className='mx-83 h-[5vh] flex items-center justify-between'>
        <div className='flex gap-3'>
            <AddPosition />
            <AddCandidate />
            <ArchiveCandidate />
            <EditCandidate />
        </div>
        <div className='flex gap-3'>
            <ShowVoteSummary />
            <button className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>Show Leading</button>
            <button className='bg-yellow-500 text-white font-bold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300' onClick={() => navigate('/register')}>
                Register Users
            </button>
        </div>
    </div>
  )
}

export default ControlPanel