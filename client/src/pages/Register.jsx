import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = (e) => {
        e.preventDefault();
        axios.post('/register', {
            name,
            email,
            password
        })
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form action="" className='max-w-md mx-auto' onSubmit={registerUser}>
                    {/* Name */}
                    <input type="text"
                        placeholder='Name...'
                        value={name}
                        onChange={e => { setName(e.target.value) }} />

                    {/* email */}
                    <input type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    {/* password */}
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member?
                        {" "}<Link to={'/login'} className='underline text-black'>LogIn</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register