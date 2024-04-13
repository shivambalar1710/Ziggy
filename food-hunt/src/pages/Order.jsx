import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useUserContext } from '../../context/userContext';
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useCartContext } from '../../context/cardContext';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/Logo.svg"
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Order = () => {
    const location = useLocation();
    const { totalPrice } = location.state || { totalPrice: 0 }; // Default to 0 if no state is passed
    const { discountAmount } = location.state || { discountAmount: 0 }; // Default to 0 if no state is passed


    const { cartItems, removeItem, addToCart } = useCartContext();
    const itemsPrice = parseFloat(cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2))
    const taxPrice = parseFloat((itemsPrice * 0.13).toFixed(2))
    const shippingPrice = itemsPrice > 200 ? 0 : 20
    const { user } = useUserContext();
    const stripe = useStripe();

    const handleFinish = async (values) => {
        try {
            const orderItems = cartItems.map(item => ({
                food: item._id,
                qty: item.qty,
            }));
            const res = await axios.post(
                "http://localhost:8001/api/v1/order/order",
                {
                    user: user.user._id,
                    items: orderItems,
                    totalAmount: totalPrice
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.sessionId,
                });

                toast.success(res.data.message);

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Somthing Went Wrrong ");
        }
    };
    return (
        <div className=" h-screen pt-[16vh]">
            <div className=' ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5' >
                <NavLink to="/">
                    <img src={logo} alt="" className="logo mb-6 cursor-pointer text-center" />
                </NavLink>
                <div >
    <div className='ease-in duration-300 max-w-4xl mx-auto shadow-lg rounded-lg bg-white'>
        <div className="px-8 py-5">
            <h2 className="text-2xl font-bold text-center mb-6">Invoice</h2>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-[#2e2e2e]">Sub Total:</span>
                <span className="text-lg font-bold text-[#f54748]">$ {itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-[#2e2e2e]">Discount:</span>
                <span className="text-lg font-bold text-[#f54748]">$ {discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-[#2e2e2e]">Tax:</span>
                <span className="text-lg font-bold text-[#f54748]">$ {taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-[#2e2e2e]">Delivery Fee:</span>
                <span className="text-lg font-bold text-[#f54748]">$ {shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-[#2e2e2e]">Total:</span>
                <span className="text-lg font-bold text-[#f54748]">$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-center">
                <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={handleFinish}>Pay ${totalPrice.toFixed(2)}</button>
            </div>
        </div>
    </div>
</div>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Order