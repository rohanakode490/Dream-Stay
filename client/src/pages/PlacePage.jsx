import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import PhotoGallery from '../components/PhotoGallery'
import Location from '../components/Location'

const PlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null)


    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(res => {
            setPlace(res.data)
        })
    }, [id])

    // IF NOT RECIEVED ANY DATA 
    if (!place) return ' '



    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
            {/* TITLE */}
            <h1 className='text-3xl'>
                {place.title}
            </h1>
            {/* ADDRESS LINK */} 
            <Location>{place.address}</Location>
            <PhotoGallery place={place} />
            <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    {/* DESCRIPTION */}
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        <div className='whitespace-pre-wrap'>
                            {place.description}
                        </div>
                    </div>

                    {/* CHECKIN CHECKOUT MAXGUESTS */}
                    <b>Check-in: </b>{place.checkIn}<br />
                    <b>Check-out: </b>{place.checkOut}<br />
                    <b>Max number of guests: </b>{place.maxGuests}
                    {/* EXTRA INFO */}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <h2 className='font-semibold text-2xl'>Extra Info</h2>
                <div className='mb-4 mt-2 text-sm text-gray-500 leading-5 whitespace-pre-wrap'>{place.extraInfo}</div>
            </div>
        </div>
    )
}

export default PlacePage