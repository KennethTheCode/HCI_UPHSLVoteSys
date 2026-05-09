import React, { useState, useEffect } from 'react'

function AdminBody() {
    const [positions, setPositions] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [positionsRes, candidatesRes] = await Promise.all([
                    fetch('http://localhost:8000/positions'),
                    fetch('http://localhost:8000/candidates')
                ]);

                if (!positionsRes.ok) {
                    throw new Error('Failed to fetch positions');
                }
                if (!candidatesRes.ok) {
                    throw new Error('Failed to fetch candidates');
                }

                const positionsData = await positionsRes.json();
                const candidatesData = await candidatesRes.json();

                setPositions(positionsData);
                setCandidates(candidatesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    // Function to get candidates for a specific position
    const getCandidatesForPosition = (positionName) => {
        return candidates.filter(candidate => candidate.position === positionName);
    };

    if (loading) {
        return (
            <div className='mx-83  rounded-[5px] h-[90vh] p-5 flex items-center justify-center'>
                <p className='text-blue-950 text-xl'>Loading positions and candidates...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='mx-83  rounded-[5px] h-[90vh] p-5 flex items-center justify-center'>
                <p className='text-red-500 text-xl'>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='mx-55 bg-gray-200 p-5 rounded-[5px] h-[90vh]  overflow-y-auto flex flex-col items-start justify-center'>
            {positions.length === 0 ? (
                <div className='text-center'>
                    <p className='text-blue-950 text-xl'>No positions found</p>
                </div>
            ) : (
                positions.map((position, index) => {
                    const positionCandidates = getCandidatesForPosition(position.position);
                    return (
                        <div key={position.id || index} className='mb-6'>
                            <h1 className='text-[24px] font-bold mb-3 text-blue-950'>{position.position}</h1>
                            
                            <div className='w-full h-[25vh] overflow-y-auto grid grid-cols-4 gap-4'>
                                
                                {positionCandidates.length === 0 ? (
                                    <div className='col-span-5 text-center py-4'>
                                        <p className='text-gray-500'>No candidates for this position</p>
                                    </div>
                                ) : (
                                    positionCandidates.map((candidate, candidateIndex) => (
                                        <div>
                                            <h1 className='text-gray-500 font-bold text-[9px] mb-2'>id: {candidate.id || 'Unknown id'}</h1>
                                        <div key={candidate.id || candidateIndex} className='shadow-xl bg-white w-[26vh] h-[10vh] rounded-[10px] p-2 flex gap-4'>
                                            <div className='bg-red-500 w-[9vh] h-full rounded-full overflow-hidden flex items-center justify-center'>
                                                <img src={(candidate.img || 'default.png')} alt="" className='h-full w-full object-cover' />
                                            </div>
                                            
                                            <div className='flex flex-col justify-center items-start'>
                                                <h1 className='text-black font-bold text-[15px]'>{candidate.name || 'Unknown Name'}</h1>
                                                <div className='bg-red-300 px-2 py-1 text-center rounded-lg'>
                                                    <p className='text-[12px] text-red-500 font-bold'>{candidate.party || 'No Party'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>

                                    ))
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default AdminBody