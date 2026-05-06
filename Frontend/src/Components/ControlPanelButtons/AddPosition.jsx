import React, { useState } from 'react'

function AddPosition() {
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({
        position: '',
        image: ''
    });
    const [previewUrl, setPreviewUrl] = useState('')

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setForm({ ...form, image: reader.result })
            setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/positions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('Position added successfully!');
                setForm({
                    position: '',
                    image: ''
                });
                setPreviewUrl('')
                setShowModal(false);
            } else {
                alert('Failed to add position.');
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button
                className='bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-700 transition-colors duration-300'
                onClick={() => {
                    setShowModal(true);
                }}>
                Add Position
            </button>
            {showModal && (
                <div className='fixed inset-0 bg-gray-900/20 flex items-center justify-center'>
                    <div className='bg-white p-5 rounded-lg shadow-lg w-[30vh]'>
                        <h2 className='text-xl font-bold mb-4'>Add Position</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='position'
                                placeholder='Position Name...'
                                className='border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4'
                                value={form.position}
                                onChange={handleInput}
                                required
                            />
                          
                            <button type='submit' className='bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300'>Submit</button>
                            <button
                                type='button'
                                onClick={() => setShowModal(false)}
                                className='bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300 ml-2'>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddPosition