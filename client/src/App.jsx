import './App.css'
import { logo } from './assets/index'

function App() {
  return (
    <>
      <div>
        <header className='p-4 flex justify-between'>
          <a href='/' className="flex items-center gap-1">
            <img src={logo} alt="logo" className='h-24 w-24' />
            <span className='font-bold text-xl'>DreamStay</span>
          </a>

          <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 my-7 shadow-md shadow-gray-300'>
            <div>Anywhere</div>
            <div className='border border-l border-gray-300'></div>
            <div>Any Week</div>
            <div className='border border-l border-gray-300'></div>
            <div>Add Guests</div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </header>
      </div>
    </>
  )
}

export default App
