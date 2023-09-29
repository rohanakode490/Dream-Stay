import axios from 'axios'
import React, { useEffect, useState } from 'react'

const IndexPage = () => {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces([...res.data, ...res.data, ...res.data, ...res.data, ...res.data])
    })
  }, [])

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map((place, index) => (
        <div key={index} className=''>

          {/* IMAGE */}
          <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {place.photos?.[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:4000/uploads/` + place.photos?.[0]} alt="" />
            )}
          </div>

          {/* TITLE */}
          <h2 className='text-sm truncate leading-4'>
            {place.title}
          </h2>

          {/* ADDRESS */}
          <h3 className='font-bold'>
              {place.address}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default IndexPage