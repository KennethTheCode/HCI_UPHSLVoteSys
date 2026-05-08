import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

function Dashboard() {

  const [summary, setSummary] = useState({})
  const [positions, setPositions] = useState([])
  const [selectedPosition, setSelectedPosition] = useState('President')
  const [voteData, setVoteData] = useState([])
  const [totalVotes, setTotalVotes] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 📡 FETCH DATA
  useEffect(() => {
    async function fetchVoteSummary() {
      try {
        const response = await fetch('http://localhost:8000/vote-summary')

        if (!response.ok) {
          throw new Error('Failed to fetch vote summary')
        }

        const data = await response.json()

        setSummary(data.summary || {})
        setTotalVotes(data.total_votes || 0)

        const pos = Object.keys(data.summary || {})
        setPositions(pos)

        // default to President if exists, otherwise first position
        const defaultPosition = pos.includes('President') ? 'President' : pos[0]
        setSelectedPosition(defaultPosition)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVoteSummary()
  }, [])

  // 🔥 UPDATE CHART WHEN POSITION CHANGES
  useEffect(() => {
    if (!summary || !selectedPosition) return

    const positionData = summary[selectedPosition] || []

    const formatted = positionData.map(candidate => ({
      name: candidate.candidate_name,
      votes: candidate.vote_count
    }))

    setVoteData(formatted)
  }, [selectedPosition, summary])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl text-blue-900'>Loading Dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-xl text-red-500'>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='min-h-[40vh] mx-[10vh] py-6'>

      {/* HEADER */}
      <div className='mb-6 text-center'>
        <h1 className='text-3xl font-bold text-blue-950'>
          Election Dashboard
        </h1>

        <p className='text-gray-500 mt-1'>
          Live Voting Results by Position
        </p>

        <p className='text-blue-800 font-semibold mt-2'>
          Total Votes: {totalVotes}
        </p>
      </div>

      {/* POSITION FILTER */}
      <div className='flex justify-center mb-6'>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className='border px-4 py-2 rounded-lg shadow-md text-blue-950 font-semibold'
        >
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

     

      {/* 🔥 CHART */}
      <div className='bg-white rounded-2xl shadow-xl p-6 mt-8'>

        <h2 className='text-xl font-bold text-blue-950 mb-4'>
          {selectedPosition} Leading Votes
        </h2>

        {voteData.length === 0 ? (
          <p className='text-gray-500'>No data for this position</p>
        ) : (
          <div className='w-full h-80'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>

    </div>
  )
}

export default Dashboard