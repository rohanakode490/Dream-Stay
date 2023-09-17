import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    // LOGOUT FUNCTION 
    const logout = async () => {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    // LOADING PAGE 
    if (!ready) {
        return 'Loading...'
    }

    // IF NOT LOGGED IN. CHECK IN UserContext.jsx for 'ready'. 
    // '!redirect' => if clicked on 'logout' then redirect to index page and not to login page
    if (ready && !user && !redirect) { 
        return <Navigate to={'/login'} />
    }

    // HIGHLIGHT THE CURRENT LINK 
    const activeClass = (type = null) => {
        let classes = 'p-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes
    }

    if (redirect) {
        <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className='w-full flex justify-center mt-4 gap-2 mb-8'>
                <Link className={activeClass('profile')} to={'/account'}>My Profile</Link>
                <Link className={activeClass('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className={activeClass('places')} to={'/account/places'}>My Accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Log Out</button>
                </div>
            )}
        </div>
    )
}

export default Account