import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Layout from './components/Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Profile from './pages/Profile'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Profile />} />
            <Route path='/account/places' element={<PlacesPage />} />
            <Route path='/account/places/new' element={<PlacesFormPage />} />
            <Route path='/account/places/:id' element={<PlacesFormPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
