import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const IndexPage = () => {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces(res.data)
    })
  }, [])
  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

      {places.length > 0 && places.map((place, index) => (
        <Link to={'/place/'+place._id} key={index} className=''>

          {/* IMAGE */}
          <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:4000/uploads/` + place.photos?.[0]} alt="" />
            )}
          </div>

          {/* ADDRESS */}
          <h2 className='font-bold'>
            {place.address}
          </h2>

          {/* TITLE */}
          <h3 className='text-sm leading-4'>
            {place.title}
          </h3>

          {/* PRICE */}
          <div className='mt-2'>
            <span className='font-bold'>
              &#8377;{place.price}{" "}
            </span>
            per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage