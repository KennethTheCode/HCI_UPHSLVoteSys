import React, { useState, useEffect } from 'react'

function AddCandidate() {
    const [showModal, setShowModal] = useState(false)
    const [positions, setPositions] = useState([])
    const [previewUrl, setPreviewUrl] = useState('')
    const [form, setForm] = useState({
        name: '', 
        position: '',
        party: '',
        img: ''
    });

    useEffect(() => {
        async function fetchPositions() {
            try {
                const res = await fetch('http://localhost:8000/positions')
                if (!res.ok) throw new Error('Failed to load positions')
                const data = await res.json()
                setPositions(data)
            } catch (error) {
                console.error('Error loading positions:', error)
            }
        }

        fetchPositions()
    }, [])

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setForm({ ...form, img: reader.result })
            setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert('Candidate added successfully!');
                setForm({
                    name: '',
                    position: '',
                    party: '',
                    img: ''
                });
                setPreviewUrl('')
                setShowModal(false);
                window.location.reload();
            } else {
                alert('Failed to add candidate.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button className='bg-blue-500 text-white font-bold px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-300' onClick={() => setShowModal(true)}>
                Add Candidate
            </button>
            {showModal && (
                <div className='fixed inset-0 bg-gray-900/20 bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-5 rounded-lg shadow-lg w-[30vh]'>
                        <h2 className='text-xl font-bold mb-4'>Add Candidate</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                onChange={handleInput}
                                name='name'
                                value={form.name}
                                type="text"
                                placeholder='Candidate Name...'
                                className='border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4'
                            />

                            <select
                                onChange={handleInput}
                                name='position'
                                value={form.position}
                                className='border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4'
                                required
                            >
                                <option value='' disabled>Select position...</option>
                                {positions.length === 0 ? (
                                    <option value='' disabled>No positions available</option>
                                ) : (
                                    positions.map((position) => (
                                        <option key={position.id} value={position.position}>
                                            {position.position}
                                        </option>
                                    ))
                                )}
                            </select>

                            <input
                                onChange={handleInput}
                                name='party'
                                value={form.party}
                                type="text"
                                placeholder='Party...'
                                className='border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4'
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

                            <button type="submit" className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>Submit</button>
                            <button type='button' onClick={() => setShowModal(false)} className='bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300 ml-2'>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddCandidate