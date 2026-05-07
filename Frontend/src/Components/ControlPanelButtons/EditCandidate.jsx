import { useState } from 'react';

function EditCandidate() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const [form, setForm] = useState({
        candidateId: '',
        candidateName: '',
        candidatePosition: '',
        candidateParty: '',
        candidateImage: ''
    });

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, candidateImage: reader.result });
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const fetchCandidate = async () => {
        if (!form.candidateId.trim()) {
            setError('Please enter a candidate ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`http://localhost:8000/candidates`);
            if (!res.ok) throw new Error('Failed to fetch candidates');
            
            const candidates = await res.json();
            const candidate = candidates.find(c => c.id === form.candidateId);

            if (!candidate) {
                setError('Candidate not found');
                setForm({
                    candidateId: form.candidateId,
                    candidateName: '',
                    candidatePosition: '',
                    candidateParty: ''
                });
            } else {
                setForm({
                    candidateId: candidate.id,
                    candidateName: candidate.name,
                    candidatePosition: candidate.position,
                    candidateParty: candidate.party,
                    candidateImage: candidate.img || ''
                });
                setPreviewUrl(candidate.img || '');
                setError('');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Network error while fetching candidate');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.candidateId.trim()) {
            setError('Candidate ID is required');
            return;
        }

        const updateData = {
            name: form.candidateName,
            position: form.candidatePosition,
            party: form.candidateParty,
            img: form.candidateImage
        };

        try {
            const res = await fetch(`http://localhost:8000/candidates/${form.candidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert('Candidate updated successfully!');
                setShowModal(false);
                setForm({
                    candidateId: '',
                    candidateName: '',
                    candidatePosition: '',
                    candidateParty: '',
                    candidateImage: ''
                });
                setPreviewUrl('');
                window.location.reload();
            } else {
                setError(data.detail || 'Failed to update candidate.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Network error while updating candidate.');
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className='bg-green-500 text-white font-bold px-3 py-1 rounded hover:bg-green-700 transition-colors duration-300'>
                Edit Candidate
            </button>

            {showModal && (
                <div className='fixed inset-0 bg-gray-900/20 flex items-center justify-center'>
                    <div className='bg-white w-[40vh] shadow-xl rounded-lg p-5'>
                        <h1 className='font-bold text-[25px] mb-3'>Edit Candidate</h1>

                        <form onSubmit={handleSubmit}>
                            <div className='flex gap-2 mb-4'>
                                <input
                                    type='text'
                                    name='candidateId'
                                    value={form.candidateId}
                                    onChange={handleInput}
                                    placeholder='Enter Candidate ID...'
                                    className='flex-1 border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                                <button
                                    type='button'
                                    onClick={fetchCandidate}
                                    disabled={loading}
                                    className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50'>
                                    {loading ? 'Loading...' : 'Search'}
                                </button>
                            </div>

                            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

                            <input
                                type='text'
                                name='candidateName'
                                value={form.candidateName}
                                onChange={handleInput}
                                placeholder='Candidate Name...'
                                className='w-full border-b border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />

                            <input
                                type='text'
                                name='candidatePosition'
                                value={form.candidatePosition}
                                onChange={handleInput}
                                placeholder='Candidate Position...'
                                className='w-full border-b border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />

                            <input
                                type='text'
                                name='candidateParty'
                                value={form.candidateParty}
                                onChange={handleInput}
                                placeholder='Candidate Party...'
                                className='w-full border-b border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />

                            <label className='block text-sm font-medium text-gray-700 mb-2'>Candidate Image</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                className='w-full mb-4'
                            />
                            {previewUrl && (
                                <img src={previewUrl} alt='Candidate preview' className='mb-4 h-24 w-full object-cover rounded-lg border border-gray-200' />
                            )}

                            <div className='mt-3'>
                                <button
                                    type='submit'
                                    className='bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300'>
                                    Submit
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setShowModal(false)}
                                    className='bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300 ml-2'>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditCandidate;