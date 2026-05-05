import React from 'react'

function VoteList({ selectedVotes }) {
  const voteEntries = Object.entries(selectedVotes);

  return (
    <div className='w-[28vh] px-3'>
        <div className='w-full h-full rounded-lg border border-gray-400'>
            <h1 className='text-blue-950 text-xl font-bold p-3 border-b border-gray-400'>Your Votes</h1>
            <div className='p-3 h-[80vh] overflow-y-auto space-y-3'>
                {voteEntries.length === 0 ? (
                    <div className='p-4 bg-white rounded-lg text-center text-gray-600'>
                        <p className='font-bold text-blue-950'>No selections yet</p>
                        <p className='text-sm'>Click a candidate to preview your vote here before submitting.</p>
                    </div>
                ) : (
                    voteEntries.map(([position, candidate]) => (
                        <div key={position} className='p-3 bg-white shadow-lg rounded-lg'>
                            <div className='flex items-center gap-3'>
                                <div className='border border-gray-400 w-[18%] h-[70px] rounded-full overflow-hidden flex items-center justify-center'>
                                    <img src={candidate.img || 'default.png'} alt={candidate.name} className='h-full w-full object-cover' />
                                </div>
                                <div className='text-left'>
                                    <p className='text-blue-950 font-bold'>{position}</p>
                                    <p className='text-gray-700'>{candidate.name}</p>
                                    <span className='text-gray-500 bg-green-200 px-2 py-1 text-[12px] rounded-lg inline-block mt-1'>
                                        {candidate.party || 'No Party'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default VoteList