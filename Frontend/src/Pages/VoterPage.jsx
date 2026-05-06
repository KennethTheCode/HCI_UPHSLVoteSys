import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar2 from '../Components/Navbar2'
import PageHeader from '../Components/PageHeader'
import PageHeader2 from '../Components/PageHeader2'
import VoterBody from '../Components/VoterBody'
import VoteList from '../Components/VoteList'
import Footer from '../Components/Footer'

function VoterPage() {
  const [selectedVotes, setSelectedVotes] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // ✅ popup states
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')

  const handleSelectCandidate = (positionName, candidate) => {
    setSelectedVotes((prev) => ({
      ...prev,
      [positionName]: candidate,
    }))
  }

  const handleSubmitVotes = async () => {
    const voteEntries = Object.entries(selectedVotes)

    if (voteEntries.length === 0) {
      alert('Please select at least one candidate before submitting your vote.')
      return
    }

    if (!userEmail) {
      alert('User email not found. Please log in again.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('http://localhost:8000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          votes: selectedVotes,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        const summary = voteEntries
          .map(([position, candidate]) => `${position}: ${candidate?.name || candidate}`)
          .join('\n')

        // ✅ show popup instead of alert
        setPopupMessage(`Vote submitted successfully!\n\n${summary}`)
        setShowPopup(true)
        setSelectedVotes({})

        // ✅ redirect after 2 seconds
        setTimeout(() => {
          navigate('/login')
        }, 2000)

      } else {
        alert('Vote submission failed: ' + (data.detail || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error during vote submission:', error)
      alert('An error occurred while submitting your vote.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Navbar2 />
      <PageHeader />
      <PageHeader2 Header={"University Student Council"} />

      <div className='flex'>
        <VoteList selectedVotes={selectedVotes} />
        <VoterBody
          selectedVotes={selectedVotes}
          onSelectCandidate={handleSelectCandidate}
          onSubmitVotes={handleSubmitVotes}
          submitting={submitting}
        />
      </div>

      <Footer />

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[350px] text-center">
            <h2 className="text-xl font-bold text-green-600 mb-3">
              Success
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {popupMessage}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Redirecting to login...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoterPage