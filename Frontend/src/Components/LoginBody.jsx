import {React, useState} from 'react'
import Logo from '../Images/logo.png'
import Pen from '../Images/Pen.png'
import { useNavigate } from 'react-router-dom'

function LoginBody() {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                const userData = data.user;
                localStorage.setItem('userEmail', userData.email);
                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Login successful!');
                
                // Redirect to admin page if admin user
                if (userData.email === 'admin@gmail.com') {
                    navigate('/admin');
                } else {
                    navigate('/voter');
                }
            } else {
                alert('Login failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to login.');

        }

    }
  return (
    <div className='bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 h-[80vh] flex items-center justify-center'>
        <div className='w-[80%] h-[70vh] flex p-8 gap-30'>
            <div className='w-[50%] h-full p-5 flex flex-col justify-center'>
                <div className='w-full h-[7vh] flex'>
                    <img src={Logo} alt="Logo" className='h-[7vh] object-contain' />
                </div>
                    <h1 className='font-bold text-[8vh] text-white font-Oswald'>Welcome to UPHSL Online<br></br>Voting System</h1>
                    <div className='w-[80%]'>
                    <p className='text-[2vh] text-white font-Oswald'>Experience a secure and transparent voting process with our online system</p>
                    <p className='text-[1.5vh] text-gray-300 font-Oswald'>This system is designed to provide a secure and efficient way for students to participate in the electoral process, ensuring that their voices are heard and their votes are counted accurately.</p>
                </div>
            </div>

            <div className='bg-white rounded-[3%] w-[40%] border-2 border-gray-100 shadow-2xl h-full flex flex-col items-center text-center'>
                <div className='h-[25vh] flex items-center justify-center m'>
                    <img src={Pen} alt="Logo" className='h-full object-contain' />
                </div>
                <h1 className='mb-5 font-bold text-[5vh] text-blue-900 font-Oswald'>Vote Wisely!</h1>
                <form onSubmit={handleSubmit}>
                    <input
                    className='w-full bg-gray-100 border-b-3 border-gray-300  h-[1vh] p-5 placeholder:text-gray-500' 
                    placeholder='Email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleInput}
                    required
                    />
                    <input
                    className='mt-10 w-full bg-gray-100 border-b-3 border-gray-300  h-[1vh] p-5 placeholder:text-gray-500'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={form.password}
                    onChange={handleInput}
                    required
                    />
                    <button type='submit' className='text-[15px] text-white font-Oswald bg-yellow-400 w-full h-[5vh] mt-7 hover:bg-yellow-500 text-white transition-colors duration-300 font-bold py-2 px-4 rounded'>
                        Login
                    </button>  
                </form>  
            </div>
        </div>
        
    </div>
  )
}

export default LoginBody