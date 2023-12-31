import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const Login = () => {

  // form values 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // redirect to home page 
  const [redirect, setRedirect] = useState(false)

  // grab the context 
  const {setUser} = useContext(UserContext)

  // submit the login details to the database 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('/login', { email, password }) //this data obj -> data as stored in mongodb 
      setUser(data)
      alert("Login Succesful")
      setRedirect(true)
    } catch (error) {
      alert("Login Failed")
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>

        {/* Form  */}
        <form action="" className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          {/* Email id  */}
          <input type="email"
            placeholder='your@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)} />

          {/* Password  */}
          <input type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />

          <button className='primary'>Login</button>

          {/* Option for Registration  */}
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?
            {" "}<Link to={'/register'} className='underline text-black'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
