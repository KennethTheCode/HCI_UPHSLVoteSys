import {createContext, useState} from 'react'


function RegForm() {
    const [form, setForm] = useState({
        email: '',
        program: '',
        password: '',
    });

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('User registered successfully!');
                setForm({
                    email: '',
                    program: '',
                    password: '',
                });
                window.location.reload();

            } else {
                alert('Failed to register user.');
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);

        }
    }
   return (
            <div className='gap-10 bg-white shadow-xl w-[25vh] h-full p-3 flex items-center flex-col pt-15'>
                <h1 className='text-blue-950 text-center font-bold text-[25px]'> Register Users</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-7 mt-5'>
                        <input 
                        type="email" 
                        name="email" 
                        value={form.email}
                        placeholder='Email...' 
                        className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        onChange={handleInput} />

                        <input 
                        type="text" 
                        name="program" 
                        value={form.program}
                        placeholder='Program...' 
                        className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        onChange={handleInput} />

                        <input 
                        type="password" 
                        name="password" 
                        value={form.password}
                        placeholder='Password...' 
                        className='border-b border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        onChange={handleInput} />

                        <button 
                        type="submit" 
                        className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>
                            Register
                        </button>
                    </div>
                </form>
            </div>
  )
}

export default RegForm