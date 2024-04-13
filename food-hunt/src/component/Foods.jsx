import React, { useEffect } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/cardContext'
import { useUserContext } from '../../context/userContext'
import { motion } from 'framer-motion'
import { MdDelete } from "react-icons/md";
import { useFoodContext } from '../../context/foodContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Foods = ({ curElem }) => {
  const { addToCart } = useCartContext()
  const { user, setUser } = useUserContext()
  const { food, setFood } = useFoodContext()
  useEffect(() => {
    setFood(food);
  }, [food]);

  const handleRemove = async (id) => {
    try {
      console.log(id)
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) {
        return;
      }
      await axios.delete(`http://localhost:8001/api/v1/food/foods/${id}`);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error removing food:', error);
    }
  };


  return (
    <div className="food-card bg-red-500/10  rounded-xl flex flex-col cursor-pointer items-center p-5">
      <div className="relative mb-3">
        <Link to={`/menu/${curElem?._id}`}>
          <motion.img whileHover={{ scale: 1.1 }} src={curElem?.foodImage} alt="" className='h-64' srcset="" />
        </Link>
        <div className="absolute top-2 left-2">
          <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
            <FaHeart className=' absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
          </button>
        </div>
        
        {
          user?.user?.role === 'admin' && <div className="absolute top-2 right-2">
            <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative" onClick={() => handleRemove(curElem._id)}>
              <MdDelete
                className=' absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
            </button>
          </div>
        }

        <div className=" absolute bottom-2 right-2">
          <button className=" shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
            <div className="absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">${curElem?.price}</div>
          </button>
        </div>
      </div >
      <div className="flex gap-4 mb-3 items-center">
        <p className="text-lg text-center font-bold text-[#f54748]">
          {curElem?.name}
        </p>
        <div className="flex text-sm space-x-2 cursor-pointer">
          <span className=" font-normal text-[#fdc55e]">4.3</span>
          <FaStar size={16} className='text-[#fdc55e]' />
          <span className=" font-medium">({curElem?.reviews?.length})</span>
        </div>

      </div>
      <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={() => addToCart(curElem)}> add to cart</button>

      <ToastContainer />
    </div >
  )
}

export default Foods