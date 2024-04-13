import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Shared/Navbar'
import Home from './pages/Home'
import Footer from './Shared/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyOtp from './pages/VerifyOtp'
import Addfood from './pages/admin/Addfood'
import Menu from './pages/Menu'
import FoodPage from './pages/FoodPage'
import Proifle from './pages/Proifle'
import ViewCart from './pages/ViewCart'
import Order from './pages/Order'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from './pages/Success'
import MyOrder from './pages/MyOrder'
import AllOrder from './pages/admin/AllOrder'
import { InfinitySpin } from 'react-loader-spinner'
import AddCouponForm from './pages/admin/AddCouponForm'
function App() {
  const [count, setCount] = useState(0)
  const stripePromise = loadStripe('pk_test_51LM2J1SIiDyURhxDNv1N4eG5FI9FdphG6ukPj3hrrSo6UWrgbl6o0nJqOwemWcbqjlKNBR8nqhl6rnfzz8VK2Sjx00y47ErW1D');

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      {
        loading ? (<div className="h-screen">
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-32">

            < InfinitySpin
              visible={true}
              width="200"
              className="text-center mx-auto"
              color="red"
              ariaLabel="infinity-spin-loading"
            />

          </div>
        </div>) : (<>


          <Navbar />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home setSearchValue={setSearchValue} /></ProtectedRoute>} />
            <Route path='/home' element={<><Home setSearchValue={setSearchValue} /></>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verifyOtp' element={
              <ProtectedRoute>
                <VerifyOtp />
              </ProtectedRoute>
            } />
            <Route path='/addfood' element={<ProtectedRoute><Addfood /></ProtectedRoute>} />
            <Route path='/menu' element={<>< Menu searchQuery={searchValue} setSearchQuery={setSearchValue} /></>} />
            <Route path='/profile' element={<ProtectedRoute><Proifle /></ProtectedRoute>} />
            <Route path='/menu/:id' element={<><FoodPage /></>} />
            <Route path='/viewcart' element={<><ViewCart /></>} />
            <Route path='/order' element={<ProtectedRoute> <Elements stripe={stripePromise}><Order /></Elements></ProtectedRoute>} />
            <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
            <Route path='/my-order' element={<ProtectedRoute><MyOrder /></ProtectedRoute>} />
            <Route path='/all-order' element={<ProtectedRoute><AllOrder /></ProtectedRoute>} />
            <Route path='/add-discount' element={<ProtectedRoute><AddCouponForm /></ProtectedRoute>} />

          </Routes>

          <Footer />

        </>)
      }

    </>
  )
}

export default App
