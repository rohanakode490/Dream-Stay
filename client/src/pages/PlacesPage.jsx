import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacesPage = () => {
  const { action } = useParams()
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
          <h2 className='text-2xl mt-4'>Title</h2>
          <p className='text-gray-500 text-sm'>Title for your place, short and catchy</p>
          <input type="text" placeholder='Title' />

          {/* ADDRESS OF THE PLACE TO ADD */}
          <h2 className='text-2xl mt-4'>Address</h2>
          <p className='text-gray-500 text-sm'>Address to this place</p>
          <input type="text" placeholder='Address' />

          {/* PHOTOS FOR REFERENCE */}
          <h2 className='text-2xl mt-4'>Photos</h2>
          <p className='text-gray-500 text-sm'>The More the Merrier</p>
          {/* PHOTOS USING LINK */}
          <div className='flex gap-2'>
            <input type="text" placeholder='Add using a link ...' />
            <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photos</button>
          </div>
          {/* PHOTOS FROM DEVICE */}
          <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
            <button className='flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              Upload from device
            </button>
          </div>

          {/* DESCRIPTION OF THE PLACE */}
          <h2 className='text-2xl mt-4'>Description</h2>
          <p className='text-gray-500 text-sm'>Description of the place</p>
          <textarea />

          {/* PERKS OF THE PLACE */}
          <h2 className='text-2xl mt-4'>Perks</h2>
          <p className='text-gray-500 text-sm'>Select all perks of your place</p>
          <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer'>
              <input type='checkbox' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
              <span>Wifi</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer'>
              <input type='checkbox' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span>Free Parking Spot</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer'>
              <input type='checkbox' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span>TV</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer'>
              <input type='checkbox' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              <span>Pets Allowed</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer'>
              <input type='checkbox' />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>Private Entrance</span>
            </label>
          </div>

          {/* MORE INFORMATION OF THE PLACE */}
          <h2 className='text-2xl mt-4'>Extra Informtation</h2>
          <p className='text-gray-500 text-sm'>house rules, etc.</p>
          <textarea />

          {/* CHECK IN AND CHECK OUT TIME AND MAX GUESTS IT CAN AFFORD */}
          <h2 className='text-2xl mt-4'>Check In and Check Out time</h2>
          <p className='text-gray-500 text-sm'>Add Check in and Check Out time, remenber to have some time window for cleaning the room between guests</p>
          <div className='grid gap-1 sm:grid-cols-3'>
            <div>
              <h3>Check In Time</h3>
              <input className='mt-2 -mb-1' type="text" placeholder='14:00' />
            </div>
            <div>
              <h3>Check Out Time</h3>
              <input className='mt-2 -mb-1' type="text" placeholder='14:00' />
            </div>
            <div>
              <h3>Max number of guests</h3>
              <input className='mt-2 -mb-1' type="text" placeholder='20'/>
            </div>
          </div>

          <button className='primary my-4'>Save</button>

        </form>
      )}
    </div>
  )
}

export default PlacesPage