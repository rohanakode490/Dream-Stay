import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Location from '../components/Location';
import PhotoGallery from '../components/PhotoGallery';
import BookingDates from '../components/BookingDates';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id)

        if (foundBooking) {
          setBooking(foundBooking)
        }
      })
    }
  }, [])

  if (!booking) {
    return '';
  }

  return (
    <div className='my-8'>
      {/* TITLE */}
      <h1 className='text-3xl'>{booking.place.title}</h1>
      {/* LOCATION/ADDRESS */}
      <Location className='my-2 '>{booking.place.address}</Location>

      {/* DATES */}
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
        <div >
          <h2 className='text-2xl mb-4'>Your Booking Information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className='bg-primary p-6 text-white rounded-2xl'>
          <div className=""> Total Price:Total price: </div>
          <div className="text-3xl"> &#8377; {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(booking.price)} {/* number with commas */}</div>
        </div>
      </div>

      {/* PHOTOS */}
      <PhotoGallery place={booking.place} />
    </div>
  )
}

export default BookingPage