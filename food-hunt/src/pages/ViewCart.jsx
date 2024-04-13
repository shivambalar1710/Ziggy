import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartContext } from "../../context/cardContext";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from 'axios';

const ViewCart = () => {
    const { cartItems, removeItem, addToCart } = useCartContext();
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 200 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;
    const { user } = useUserContext();

    const [couponCode, setCouponCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [coupons, setCoupons] = useState([]);

    const fetchDiscountCoupons = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/v1/coupons");
            const fetchedCoupons = response.data.coupons;
            setCoupons(fetchedCoupons);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    useEffect(() => {
        fetchDiscountCoupons();
    }, []);

    const applyCoupon = (coupon) => {
        if (coupon && itemsPrice >= coupon.minOrderAmount) {
            let appliedDiscount = 0;
            if (coupon.discountType === "percentage") {
                appliedDiscount = (coupon.discountAmount / 100) * itemsPrice;
            } else {
                appliedDiscount = coupon.discountAmount;
            }
            setDiscountAmount(appliedDiscount);
        }
    };

    const handleApplyCoupon = () => {
        const selectedCoupon = coupons.find(coupon => coupon.code === couponCode);
        if (selectedCoupon) {
            applyCoupon(selectedCoupon);
        } else {
            // Handle case when the entered coupon code is not valid
            console.log("Invalid coupon code");
        }
    };
    const totalItemQuantity = cartItems.reduce((total, item) => total + item.qty, 0);
    return (
        <>
            <div className="pt-14">
                <div
                    className={
                        cartItems.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"
                    }
                >
                    <div className="container mx-auto py-6">
                        <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold text-2xl">My Cart</h1>
                                <h2 className="font-semibold text-2xl">
                                {totalItemQuantity} Item{totalItemQuantity !== 1 ? 's' : ''}
                                                                </h2>
                            </div>
                            <div className="flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Product Details
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    category
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    Price
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    Total
                                </h3>
                            </div>
                            {cartItems.map((food) => {
                                return (
                                    <FavoriteFoods
                                        key={food.id}
                                        food={food}
                                        removeItem={removeItem}
                                        Length={cartItems.length + food.length}
                                    />
                                );
                            })}

                            <div
                                className={
                                    cartItems.length === 0
                                        ? "mx-auto hidden  items-end justify-center px-6 flex-col"
                                        : "mx-auto  flex items-end justify-center px-6 flex-col"
                                }
                            >
                                <div className="text-right  mb-2 font-semibold text-blue-900">
                                    Shipping : {shippingPrice.toFixed(2)}
                                </div>
                                <div
                                    className="input bg-white input-bordere-none flex flex-col lg:flex-row p-1 rounded-xl lg:justify-between items-center"
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="bg-gray-100 py-3"
                                    />
                                    <button
                                        className="hover:bg-red-600 hover:border-red-600 border-red-500 btn-sm bg-red-500 text-white"
                                        onClick={handleApplyCoupon}
                                    >
                                        Apply
                                    </button>
                                </div>
                                <div className="text-right  mb-2 font-semibold text-blue-900">
                                    Total Price : {totalPrice.toFixed(2) - discountAmount.toFixed(2)}
                                </div>
                                <Link to="/order" state={{ totalPrice: totalPrice - discountAmount, discountAmount }}>
                                    <button className="btn flex-end text-white hover:bg-red-600 hover:border-red-600 border-red-500 btn-sm bg-red-500">
                                        Check out
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCart;




const FavoriteFoods = ({ food }) => {
    const { cartItems, removeItem, addToCart } = useCartContext();

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img className="h-20" src={food.foodImage} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{food.name}</span>
                    <span className="flex items-center space-x-4">
                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"
                            onClick={() => removeItem(food)}
                        >
                            <AiOutlineMinus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                        </div>
                        <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium">
                            {food.qty}
                        </span>
                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"
                            onClick={() => addToCart(food)}
                        >
                            <AiOutlinePlus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                        </div>
                    </span>

                    {/* <div
						className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
						onClick={() => removeItem(food)}
					>
						Remove
					</div> */}
                </div>
            </div>
            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="font-bold text-sm">{food.category}</span>
            </div>
            <span className="text-center  w-1/5 font-semibold text-sm">
                {food.price} X {food.qty}
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
                {food.qty * food.price}
            </span>
        </div>
    );
};