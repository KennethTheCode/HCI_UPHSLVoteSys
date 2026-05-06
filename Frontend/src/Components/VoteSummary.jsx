import React, { useState, useEffect } from 'react'
import Navbar2 from './Navbar2'
import PageHeader2 from './PageHeader2'
import Footer from './Footer'

function VoteSummary() {
  const [summary, setSummary] = useState({});
  const [positionOrder, setPositionOrder] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWinners, setShowWinners] = useState(false);

  useEffect(() => {
    async function fetchVoteSummary() {
      try {
        const response = await fetch('http://localhost:8000/vote-summary');
        if (!response.ok) {
          throw new Error('Failed to fetch vote summary');
        }
        const data = await response.json();
        setSummary(data.summary);
        setPositionOrder(data.order || Object.keys(data.summary));
        setTotalVotes(data.total_votes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVoteSummary();
  }, []);

  const exportWinnersToCSV = () => {
    if (!positionOrder.length || !Object.keys(summary).length) return;

    const winners = positionOrder
      .filter(position => summary[position])
      .map(position => {
        const candidates = summary[position];
        const winner = candidates.reduce((prev, current) => (prev.vote_count > current.vote_count) ? prev : current);
        return {
          position,
          candidate_name: winner.candidate_name,
          candidate_id: winner.candidate_id,
          vote_count: winner.vote_count
        };
      });

    // Create CSV content
    const headers = ['Position', 'Winner Name', 'Candidate ID', 'Vote Count'];
    const csvContent = [
      headers.join(','),
      ...winners.map(winner => [
        `"${winner.position}"`,
        `"${winner.candidate_name}"`,
        `"${winner.candidate_id}"`,
        winner.vote_count
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `election_winners_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className='px-56 py-8'>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <h2 className='text-2xl font-bold text-blue-950 mb-4'>Election Results</h2>
          <p className='text-lg text-gray-700 mb-6'>Total Votes Cast: <span className='font-bold text-blue-600'>{totalVotes}</span></p>
          <div className='flex gap-4 mb-6'>
            <button
              onClick={() => setShowWinners(!showWinners)}
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {showWinners ? 'Hide Winners' : 'Show Winners'}
            </button>
            <button
              onClick={exportWinnersToCSV}
              disabled={!positionOrder.length || !Object.keys(summary).length}
              className='bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded'
            >
              Export Winners to CSV
            </button>
          </div>

          {showWinners && Object.keys(summary).length > 0 && (
            <div className='bg-green-50 border border-green-200 rounded-lg p-6 mb-6'>
              <h2 className='text-2xl font-bold text-green-800 mb-4'>🏆 Election Winners</h2>
              <div className='space-y-4'>
                {positionOrder.filter(position => summary[position]).map((position) => {
                  const candidates = summary[position];
                  const winner = candidates.reduce((prev, current) => (prev.vote_count > current.vote_count) ? prev : current);
                  return (
                    <div key={position} className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'>
                      <div>
                        <p className='font-bold text-gray-800'>{position}</p>
                        <p className='text-green-600 font-semibold'>{winner.candidate_name}</p>
                        <p className='text-sm text-gray-600'>ID: {winner.candidate_id}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-2xl font-bold text-green-600'>{winner.vote_count}</p>
                        <p className='text-sm text-gray-600'>votes</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {Object.keys(summary).length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500 text-xl'>No votes have been cast yet.</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {positionOrder.filter(position => summary[position]).map((position) => {
                const candidates = summary[position];
                return (
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
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VoteSummary