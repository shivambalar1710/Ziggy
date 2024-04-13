import React, { useEffect, useState } from 'react';
import { useFoodContext } from '../../context/foodContext';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from '../../context/cardContext';
import { InfinitySpin } from 'react-loader-spinner';

const Menu = ({ searchQuery }) => {
    const { food, setFood } = useFoodContext();
    const [active, setActive] = useState(0);
    const [value, setValue] = useState('all');
    const [loading, setLoading] = useState(true);
    const catagory = [
        {
            id: 0,
            name: 'All',
            value: 'all'
        },
        {
            id: 1,
            name: 'Canadian Comfort Food',
            value: 'Canadian Comfort Food'
        },
        {
            id: 2,
            name: 'Asian Fusion',
            value: 'Asian Fusion'
        },
        {
            id: 3,
            name: 'Italian Delights',
            value: 'Italian Delights'
        },
        {
            id: 4,
            name: 'Healthy & Organic',
            value: 'Healthy & Organic'
        },
        {
            id: 5,
            name: 'World Street Food',
            value: 'World Street Food'
        },
        {
            id: 6,
            name: 'Exotic Drinks',
            value: 'Exotic Drinks'
        },
    ];

    const handleBtn = (btn) => {
        setActive(btn.id);
        setValue(btn.value);
    };

    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8001/api/v1/food/getAllFoods?category=${value}&search=${searchQuery}`);
            if (res.data.success) {
                let filteredFood = res.data.data.food;
                if (searchQuery) {
                    filteredFood = filteredFood.filter(item =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                setLoading(false);
                setFood(filteredFood);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFoods();
    }, [value, searchQuery]);

    const { addToCart } = useCartContext();

    return (
        <div className="pt-[16vh]">
            <div className="container mx-auto py-8">
                <div className="p-5 mb-14">
                    <div className="flex flex-wrap justify-center mb-8 gap-5">
                        {catagory?.map((btn) => (
                            <motion.button
                                key={btn.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={active === btn.id ? "bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" : "bg-white active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[#F54748]"}
                                onClick={() => handleBtn(btn)}
                            >
                                {btn.name}
                            </motion.button>
                        ))}
                    </div>
                    {loading ? (
                        <div className="text-center mx-auto w-32">
                            <InfinitySpin
                                visible={true}
                                width="200"
                                className="text-center mx-auto"
                                color="red"
                                ariaLabel="infinity-spin-loading"
                            />
                        </div>
                    ) : (
                        <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                            {food?.map((curElem) => (
                                <AnimatePresence key={curElem._id} mode="wait">
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="food-card bg-red-500/10  rounded-xl flex flex-col cursor-pointer items-center p-5"
                                    >
                                        <div className="relative mb-3">
                                            <Link to={`/menu/${curElem._id}`}>
                                                <motion.img
                                                    whileHover={{ scale: 1.1 }}
                                                    src={curElem.foodImage}
                                                    alt=""
                                                    className='h-64'
                                                />
                                            </Link>
                                            <div className="absolute top-2 left-2">
                                                <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
                                                    <FaHeart className=' absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                                                </button>
                                            </div>
                                            <div className=" absolute bottom-2 right-2">
                                                <button className=" shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
                                                    <div className="absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">${curElem.price}</div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mb-3 items-center">
                                            <p className="text-lg text-center font-bold text-[#f54748]">
                                                {curElem.name}
                                            </p>
                                            <div className="flex text-sm space-x-2 cursor-pointer">
                                                <span className=" font-normal text-[#fdc55e]">4.3</span>
                                                <FaStar size={16} className='text-[#fdc55e]' />
                                                <span className=" font-medium">({curElem.reviews.length})</span>
                                            </div>
                                        </div>
                                        <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={() => addToCart(curElem)}> add to cart</button>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
