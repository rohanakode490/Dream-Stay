import React, { useEffect, useState } from 'react'
import AccountNavigation from '../components/AccountNavigation'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg'
import { Link } from 'react-router-dom'
import BookingDates from '../components/BookingDates'

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
                                {/* DISPLAY THE RANGE OF DATES THE PLACE WAS BOOKED */}
                                <BookingDates booking={booking} className='mb-2 mt-3 text-base text-gray-500'/>

                                {/* TOTAL PRICE OF THE PLACE */}
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