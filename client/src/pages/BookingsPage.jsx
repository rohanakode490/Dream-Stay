import React, { useEffect, useState } from 'react'
import AccountNavigation from '../components/AccountNavigation'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from 'react-router-dom'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then((res) => {
            setBookings(res.data)
        })
    }, [])

    return (
        <div>
            <AccountNavigation />
            <div className='flex flex-col gap-2'>
                {bookings.length > 0 && bookings.map((booking, index) => (
                    <Link to={`/account/bookings/${booking._id}`} key={index} className='m-2 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                        {/* PLACE IMAGE */}
                        <div className='w-48'>
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            {/* PLACE TITLE */}
                            <h2 className='text-xl font-semibold'>{booking.place.title}</h2>
                            <div className='text-xl'>
                                <div className="flex gap-1 items-center mb-2 mt-3 text-base text-gray-500">
                                    {/* CHECK-IN AND CHECK-OUT TIME */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                                    </svg>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights:
                                    {/* CALENDAR ICON */}
                                    <div className='flex gap-1 items-center ml-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        {/* RANGE OF DATES */}
                                        <div className='flex gap-1'>
                                            <div>
                                                {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                                            </div>
                                            -&gt;
                                            <div>
                                                {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-1 items-center text-xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                                    </svg>
                                    Total price: &#8377; {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(booking.price)} {/* number with commas */}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage