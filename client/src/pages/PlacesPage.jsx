import React, { Children, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PerksLabels from '../components/PerksLabels'
import axios from 'axios';

const PlacesPage = ({ selected, onChange }) => {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('')
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

  // ADDING PHOTOS THROUGH LINK
  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })

    setAddedPhotos(prev => { return [...prev, filename] })
    setPhotoLink('')
  }

  // ADDING PHOTOS FROM DEVICES
  const uploadPhoto = (ev) => { //async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }

    axios.post('/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      const { data: filename } = response;
      setAddedPhotos(prev => {
        return [...prev, filename]
      })
    })

    // const { data: filename } = await axios.post('/upload', data, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // })

    // setAddedPhotos(prev => { return [...prev, filename] })
  }

  return (
    <div>
      {action !== "new" && (
        <div className='text-center'>
          <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Places
          </Link>
        </div>
      )}

      {/* Adding new places */}
      {action === "new" && (
        <form>
          {/* TITLE OF PLACE */}
          {preInput('Title', 'Title for your place, short and catchy')}
          <input type="text" placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />

          {/* ADDRESS OF THE PLACE TO ADD */}
          {preInput('Address', 'Address to this place')}
          <input type="text" placeholder='Address' value={address} onChange={ev => setAddress(ev.target.value)} />

          {/* PHOTOS FOR REFERENCE */}
          {preInput('Photos', 'The More the Merrier')}

          {/* PHOTOS USING LINK */}
          <div className='flex gap-2'>
            <input
              type="text"
              placeholder='Add using a link ...'
              value={photoLink}
              onChange={ev => setPhotoLink(ev.target.value)}
            />
            <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add&nbsp;Photos</button>
          </div>
          {/* PHOTOS FROM DEVICE */}
          <div className='mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
            {/* DISPLAY THE PREVIEW OF THE PHOTOS */}
            {addedPhotos.length > 0 && addedPhotos.map((link) => (
              <div key={link} className='h-32 flex'>
                <img className='rounded-2xl w-full object-cover ' src={'http://localhost:4000/uploads/' + link} alt="" />
              </div>
            ))}
            <label className='h-32 cursor-pointer flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
              <input type="file" multiple className='hidden' onChange={uploadPhoto} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              Upload from device
            </label>
          </div>

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
      )}
    </div>
  )
}

export default PlacesPage