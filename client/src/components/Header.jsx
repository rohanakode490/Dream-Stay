import React, { useContext } from 'react'
import { logo } from '../assets/index'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {
    const {user} = useContext(UserContext)
    return (
        <>
            <header className='flex justify-between items-center -mt-7'>
                {/* logo  */}
                <Link to='/' className="flex items-center">
                    <img src={logo} alt="logo" className='h-32 w-32' />
                    {/* <span className='font-bold text-xl'>Dream Stay</span> */}
                </Link>

                {/* search bar  */}
                <div className='flex justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 my-7 shadow-md shadow-gray-300 -ml-1'>
                    <div>Anywhere</div>
                    <div className='border border-l border-gray-300'></div>
                    <div>Any Week</div>
                    <div className='border border-l border-gray-300'></div>
                    <div>Add Guests</div>
                    <button className='bg-primary text-white p-1 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>

                {/* Profile */}
                <Link to={user?'/account':'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 my-7'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {/* profile logo */}
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                </Link>
            </header>
        </>
    )
}

export default Header