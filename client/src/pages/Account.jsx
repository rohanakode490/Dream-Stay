import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';

const Account = () => {
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return 'Loading...'
    } 

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    const {subpage} = useParams();

    return (
        <div>
            <nav className='w-full flex justify-center mt-4 gap-2'>
                <Link className='p-2 px-6 bg-primary text-white rounded-full' to={'/account'}>My Profile</Link>
                <Link className='p-2 px-6' to={'/account/bookings'}>My Bookings</Link>
                <Link className='p-2 px-6' to={'/account/places'}>My Accommodations</Link>
            </nav>
        </div>
    )
}

export default Account