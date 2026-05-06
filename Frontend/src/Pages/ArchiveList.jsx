import React, { useState, useEffect } from 'react'
import Navbar2 from '../Components/Navbar2'
import PageHeader2 from '../Components/PageHeader2';
import ControlPanel from '../Components/ControlPanel';

function ArchiveList() {
  const [archivedCandidates, setArchivedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unarchivingId, setUnarchivingId] = useState(null);

  useEffect(() => {
    fetchArchivedCandidates();
  }, []);

  const fetchArchivedCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/archived-candidates');
      if (!response.ok) {
        throw new Error('Failed to fetch archived candidates');
      }
      const data = await response.json();
      setArchivedCandidates(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async (candidateId) => {
    try {
      setUnarchivingId(candidateId);
      const response = await fetch(`http://localhost:8000/candidates/unarchive/${candidateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to unarchive candidate');
      }

      setArchivedCandidates(archivedCandidates.filter(candidate => candidate.id !== candidateId));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUnarchivingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar2 />
        <div className='min-h-[80vh] flex items-center justify-center'>
          <p className='text-blue-950 text-xl'>Loading archived candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />
      <PageHeader2 Header="Archived Candidates" />
      <ControlPanel />

      <div className='mx-56 py-8 h-[90vh] overflow-y-auto'>
        <div className='h-full bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-3xl font-bold text-blue-950 mb-6'>Archived Candidates</h1>
          
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4'>
              Error: {error}
            </div>
          )}

          {archivedCandidates.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500 text-lg'>No archived candidates found.</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-blue-950 text-white'>
                    <th className='px-4 py-3 text-left'>Candidate Name</th>
                    <th className='px-4 py-3 text-left'>Position</th>
                    <th className='px-4 py-3 text-left'>Party</th>
                    <th className='px-4 py-3 text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {archivedCandidates.map((candidate) => (
                    <tr key={candidate.id} className='hover:bg-gray-50 transition-colors'>
                      <td className='border border-gray-300 px-4 py-3 font-semibold text-gray-800'>{candidate.name}</td>
                      <td className='border border-gray-300 px-4 py-3 text-gray-700'>{candidate.position}</td>
                      <td className='border border-gray-300 px-4 py-3 text-gray-700'>{candidate.party}</td>
                      <td className='border border-gray-300 px-4 py-3 text-center'>
                        <button
                          onClick={() => handleUnarchive(candidate.id)}
                          disabled={unarchivingId === candidate.id}
                          className='bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
                        >
                          {unarchivingId === candidate.id ? 'Unarchiving...' : 'Unarchive'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchiveList
