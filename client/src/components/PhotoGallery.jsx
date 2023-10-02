import React, { useState } from 'react'

const PhotoGallery = ({ place }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    //SHOW ALL THE PHOTOS ON CLICK OF THE BUTTON
    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='p-8 grid gap-4 bg-black'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>

                    <div className='grid gap-3 grid-cols-2'>
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div key={photo} >
                                <img className='w-full object-cover' src={"http://localhost:4000/uploads/" + photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='relative rounded-3xl overflow-hidden'>
                <div className='grid gap-2 grid-cols-[2fr_1fr]'>
                    {/* PHOTOS */}
                    <div>
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="photos0" className="w-full h-full cursor-pointer" />
                        )}
                    </div>
                    <div className='grid'>
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} src={`http://localhost:4000/uploads/${place.photos[1]}`} alt="photos1" className="object-cover cursor-pointer" />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} src={`http://localhost:4000/uploads/${place.photos[2]}`} alt="photos2" className=" object-cover relative top-2 cursor-pointer" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show more photos
                </button>
            </div>
        </div>
    )
}

export default PhotoGallery