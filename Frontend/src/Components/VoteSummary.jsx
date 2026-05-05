import React, { useState, useEffect } from 'react'
import Navbar2 from './Navbar2'
import PageHeader2 from './PageHeader2'
import Footer from './Footer'

function VoteSummary() {
  const [summary, setSummary] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVoteSummary() {
      try {
        const response = await fetch('http://localhost:8000/vote-summary');
        if (!response.ok) {
          throw new Error('Failed to fetch vote summary');
        }
        const data = await response.json();
        setSummary(data.summary);
        setTotalVotes(data.total_votes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVoteSummary();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar2 />
        <PageHeader2 Header="Vote Summary" />
        <div className='min-h-[60vh] flex items-center justify-center'>
          <p className='text-blue-950 text-xl'>Loading vote summary...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar2 />
        <PageHeader2 Header="Vote Summary" />
        <div className='min-h-[60vh] flex items-center justify-center'>
          <p className='text-red-500 text-xl'>Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />
      <PageHeader2 Header="Vote Summary" />
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <h2 className='text-2xl font-bold text-blue-950 mb-4'>Election Results</h2>
          <p className='text-lg text-gray-700 mb-6'>Total Votes Cast: <span className='font-bold text-blue-600'>{totalVotes}</span></p>

          {Object.keys(summary).length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500 text-xl'>No votes have been cast yet.</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {Object.entries(summary).map(([position, candidates]) => (
                <div key={position} className='border border-gray-200 rounded-lg p-6'>
                  <h3 className='text-xl font-bold text-blue-950 mb-4 border-b border-gray-300 pb-2'>
                    {position}
                  </h3>
                  <div className='space-y-3'>
                    {candidates.map((candidate, index) => (
                      <div key={candidate.candidate_id} className='flex items-center justify-between bg-gray-50 p-4 rounded-lg'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold'>
                            {index + 1}
                          </div>
                          <div>
                            <p className='font-semibold text-gray-800'>{candidate.candidate_name}</p>
                            <p className='text-sm text-gray-600'>ID: {candidate.candidate_id}</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-2xl font-bold text-blue-600'>{candidate.vote_count}</p>
                          <p className='text-sm text-gray-600'>votes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VoteSummary