import React, { useState, useEffect } from 'react'

function AdminVotingToggle() {
  const [status, setStatus] = useState('ACTIVE')
  const [loading, setLoading] = useState(true)

  // GET CURRENT STATUS
  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch('http://localhost:8000/voting-status')
      const data = await res.json()
      setStatus(data.status)
      setLoading(false)
    }

    fetchStatus()
  }, [])

  // TOGGLE STATUS
  const toggleStatus = async () => {
    const newStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

    setStatus(newStatus) // instant UI update

    await fetch('http://localhost:8000/voting-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
  }

  if (loading) return <p>Loading status...</p>

  return (
    <div className='bg-white shadow-xl rounded-2xl p-6 w-80'>

      <h2 className='text-xl font-bold text-blue-950 mb-4'>
        Admin Voting Control
      </h2>

      {/* STATUS DISPLAY */}
      <div className='mb-4'>
        <p className='text-gray-600'>Current Status:</p>

        <span className={`px-4 py-1 rounded-full text-white font-bold
          ${status === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600'}
        `}>
          {status}
        </span>
      </div>

      {/* TOGGLE BUTTON */}
      <button
        onClick={toggleStatus}
        className={`w-full py-2 rounded-lg text-white font-semibold transition
          ${status === 'ACTIVE'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
          }
        `}
      >
        {status === 'ACTIVE' ? 'Deactivate Voting' : 'Activate Voting'}
      </button>

    </div>
  )
}

export default AdminVotingToggle