import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)

    // form after check-in and check-out are filled
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    let numberOfNights=0;
    if(checkIn && checkOut){
        numberOfNights =differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            {/* PRICE DISPLAY */}
            <div className="text-2xl text-center">
                Price: &#8377;{place.price} / per night
            </div>
            {/* CHECK IN, CHECK OUT AND MAX GUESTS INPUT */}
            <div className="border rounded-2xl mt-4">
                <div className="grid grid-cols-2">
                    <div className='py-3 px-4'>
                        <label>Check in:</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check out:</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of Guests:</label>
                    <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                </div>
                {/* FORM AFTER CHECKIN AND CHECKOUT IS FILLED */}
                <div className='py-3 px-4 border-t'>
                    <label>Number of Guests:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    
                    <label>Phone Number:</label>
                    <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
            </div>
            <button className="primary mt-4">
                Book this place
                {numberOfNights>0 && (
                    <div>
                        &#8377; {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(numberOfNights * place.price)} {/* number with commas */}
                    </div>
                )}
            </button>
        </div>
    )
}

export default BookingWidget