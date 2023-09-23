import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from '../components/AccountNavigation';

const Profile = () => {
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

    if (redirect) {
        <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNavigation />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Log Out</button>
                </div>
            )}
            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    )
}

export default Profile