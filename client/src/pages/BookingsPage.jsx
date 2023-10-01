import React, { useEffect, useState } from 'react'
import AccountNavigation from '../components/AccountNavigation'
import axios from 'axios'

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
            <div>
                {bookings.length > 0 && bookings.map((booking, index) => (
                    <div key={index}>
                        {booking.checkIn}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage