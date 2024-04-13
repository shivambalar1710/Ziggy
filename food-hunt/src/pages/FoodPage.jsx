import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/cardContext'; // Adjust path as necessary
import PageNavigation from '../component/PageNavigation'; // Adjust path as necessary

const FoodPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [foodDetails, setFoodDetails] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartContext();
    const totalPrice = quantity * foodDetails.price; // Assuming price is a number

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/v1/food/getFood/${id}`);
                if (response.data.success) {
                    setFoodDetails(response.data.data.food);
                }
            } catch (error) {
                console.error("Failed to fetch food details:", error);
            }
        };
        fetchFoodDetails();
    }, [id]);

    const handleAddToCart = () => {
        addToCart({ ...foodDetails, qty: {quantity} });
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    const handleCheckout = () => {
        navigate('/order'); // Redirect to the checkout page
    };

   
    return (
        <div className="pt-[16vh]">
            <div className="container mx-auto">
                <PageNavigation title={foodDetails.name} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4">
                        <img src={foodDetails.foodImage} alt={foodDetails.name} className="w-full h-[25rem]" />
                    </div>
                    <div className="p-8">
                        <h1 className="text-2xl mb-2 font-bold">{foodDetails.name}</h1>
                        <h2 className="text-xl mb-2">Price: ${foodDetails.price}</h2>
                        <p className="mb-6">{foodDetails.description}</p>
                        <p className="mb-6">{foodDetails.ingredients}</p>
                        
                        <p className="mb-6">{foodDetails.nutrition}</p>
                        <p className="mb-6">{foodDetails.allergen}</p>




                        <div className="flex items-center mb-6">
                            <button className="bg-red-500 p-2 rounded-full text-white" onClick={decrementQuantity}>
                                <AiOutlineMinus size={20} />
                            </button>
                            <span className="mx-4 text-lg">{quantity}</span>
                            <button className="bg-red-500 p-2 rounded-full text-white" onClick={incrementQuantity}>
                                <AiOutlinePlus size={20} />
                            </button>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-[#f54748] rounded-full px-8 py-2 text-white" onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                            <button className="bg-green-500 rounded-full px-8 py-2 text-white" onClick={handleCheckout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;
