import React, { useState } from 'react'
import PerksLabels from '../components/PerksLabels';
import PhotoUploader from '../components/PhotoUploader';
import axios from 'axios';
import AccountNavigation from '../components/AccountNavigation';

const PlacesFormPage = () => {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)

    const inputHeader = (header) => {
        return (
            <h2 className='text-2xl mt-4'>{header}</h2>
        )
    }

    const inputDescription = (desc) => {
        return (
            <p className='text-gray-500 text-sm'>{desc}</p>
        )
    }

    const preInput = (header, desc) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(desc)}
            </>
        )
    }

    // ADDIGN NEW PLACES OR HANDLESUBMIT 
    const addNewPlace = async (e) => {
        e.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests }
        await axios.post('/places', placeData);
    }

    return (
        <div>
            <AccountNavigation />
            <form onSubmit={addNewPlace}>
                {/* TITLE OF PLACE */}
                {preInput('Title', 'Title for your place, short and catchy')}
                <input type="text" placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />

                {/* ADDRESS OF THE PLACE TO ADD */}
                {preInput('Address', 'Address to this place')}
                <input type="text" placeholder='Address' value={address} onChange={ev => setAddress(ev.target.value)} />

                {/* PHOTOS FOR REFERENCE */}
                {preInput('Photos', 'The More the Merrier')}

                {/* UPLOAD PHOTOS */}
                <PhotoUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

                {/* DESCRIPTION OF THE PLACE */}
                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {/* PERKS OF THE PLACE */}
                {preInput('Perks', 'Select all perks of your place')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <PerksLabels selected={perks} onChange={setPerks} />
                </div>

                {/* MORE INFORMATION OF THE PLACE */}
                {preInput('Extra Informtation', 'house rules, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {/* CHECK IN AND CHECK OUT TIME AND MAX GUESTS IT CAN AFFORD */}
                {preInput('Check In and Check Out time', 'Add Check in and Check Out time, remenber to have some time window for cleaning the room between guests')}
                <div className='grid gap-1 sm:grid-cols-3'>
                    <div>
                        <h3>Check In Time</h3>
                        <input
                            className='mt-2 -mb-1'
                            type="text"
                            placeholder='14'
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Check Out Time</h3>
                        <input
                            className='mt-2 -mb-1'
                            type="text"
                            placeholder='23'
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Max number of guests</h3>
                        <input
                            className='mt-2 -mb-1'
                            type="number"
                            placeholder='20'
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}
                        />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage