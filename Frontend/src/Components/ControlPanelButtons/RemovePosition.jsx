import React, { useEffect, useState } from 'react'

function RemovePosition() {
  const [showModal, setShowModal] = useState(false)
  const [positions, setPositions] = useState([])
  const [selectedPositionId, setSelectedPositionId] = useState('')
  const [selectedPositionName, setSelectedPositionName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!showModal) return

    async function fetchPositions() {
      try {
        const res = await fetch('http://localhost:8000/positions')
        if (!res.ok) {
          throw new Error('Failed to load positions')
        }
        const data = await res.json()
        setPositions(data)
      } catch (error) {
        console.error('Error loading positions:', error)
        setPositions([])
      }
    }

    fetchPositions()
  }, [showModal])

  const handleRemove = async (e) => {
    e.preventDefault()
    if (!selectedPositionId) {
      alert('Please select a position to remove.')
      return
    }

    const confirmed = window.confirm(
      `Remove position "${selectedPositionName}"? This will also delete related candidates and votes.`
    )
    if (!confirmed) return

    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/positions/${selectedPositionId}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (res.ok) {
        alert(data.message || 'Position removed successfully!')
        setShowModal(false)
        window.location.reload()
      } else {
        alert(data.detail || 'Failed to remove position.')
      }
    } catch (error) {
      console.error('Error removing position:', error)
      alert('An error occurred while removing the position.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className='bg-purple-500 text-white font-bold px-3 py-1 rounded hover:bg-purple-700 transition-colors duration-300'
        onClick={() => setShowModal(true)}>
        Remove Position
      </button>
      {showModal && (
        <div className='fixed inset-0 bg-gray-900/20 flex items-center justify-center'>
          <div className='bg-white p-5 rounded-lg shadow-lg w-[30vh]'>
            <h2 className='text-xl font-bold mb-4'>Remove Position</h2>
            <form onSubmit={handleRemove}>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Select position</label>
              <select
                className='border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={selectedPositionId}
                onChange={(e) => {
                  const selectedId = e.target.value
                  setSelectedPositionId(selectedId)
                  const selected = positions.find((pos) => pos.id === selectedId)
                  setSelectedPositionName(selected?.position || '')
                }}
              >
                <option value='' disabled>
                  {positions.length === 0 ? 'No positions available' : 'Choose a position...'}
                </option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.position}
                  </option>
                ))}
              </select>
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='bg-gray-500 text-white font-bold px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-300'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading || !positions.length}
                  className='bg-red-500 text-white font-bold px-3 py-2 rounded hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemovePosition