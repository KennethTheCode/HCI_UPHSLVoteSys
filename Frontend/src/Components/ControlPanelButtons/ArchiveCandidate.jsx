import React, { useState } from 'react'

function ArchiveCandidate() {
    const [showModal, setShowModal] = useState(false)
    const [candidateId, setCandidateId] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!candidateId.trim()) {
            setMessage('Please enter a candidate ID.')
            return
        }

        setLoading(true)
        setMessage('')

        try {
            const res = await fetch(`http://localhost:8000/candidates/archive/${candidateId}`, {
                method: 'POST'
            })
            const data = await res.json()

            if (res.ok) {
                alert('Candidate archived successfully!')
                setCandidateId('')
                setShowModal(false)
                window.location.reload()
            } else {
                setMessage(data.detail || 'Failed to archive candidate.')
            }
        } catch (error) {
            console.error('Error:', error)
            setMessage('Network error while archiving candidate.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button className='bg-yellow-500 text-white font-bold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300'
                onClick={() => setShowModal(true)}>
                Archive Candidate
            </button>
            {showModal && (
                <div className='bg-gray-900/20 fixed inset-0 flex items-center justify-center'>
                    <div className='bg-white p-5 rounded-lg shadow-md w-[30%]'>
                        <h2 className='text-xl font-bold mb-4'>Archive Candidate</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                name='candidateId'
                                value={candidateId}
                                onChange={(e) => setCandidateId(e.target.value)}
                                className='w-full border-b border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Candidate ID'
                                required
                            />
                            {message && <p className='text-sm text-red-500 mb-4'>{message}</p>}
                            <p className='mb-4'>Are you sure you want to archive this candidate?</p>
                            <div className='flex justify-end gap-3'>
                                <button type='button' className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300' onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type='submit' disabled={loading} className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300'>
                                    {loading ? 'Archiving...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ArchiveCandidate