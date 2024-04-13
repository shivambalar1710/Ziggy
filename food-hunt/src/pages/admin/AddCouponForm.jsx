import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const AddCouponForm = () => {
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountAmount: '',
        expirationDate: '',
        minOrderAmount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8001/api/v1/coupons', formData);
            toast('Coupon added successfully!');
            setFormData({
                code: '',
                discountType: 'percentage',
                discountAmount: '',
                expirationDate: '',
                minOrderAmount: ''
            });
        } catch (error) {
            console.error('Error adding coupon:', error);
            toast('Error adding coupon. Please try again.');
        }
    };

    return (
        <div className="pt-[16vh] pb-[10vh]">
            <div className="max-w-md mx-auto  bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Coupon</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code:</label>
                        <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Discount Type:</label>
                        <select id="discountType" name="discountType" value={formData.discountType} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            <option value="percentage">Percentage</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount:</label>
                        <input type="number" id="discountAmount" name="discountAmount" value={formData.discountAmount} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700">Minimum Amount:</label>
                        <input type="number" id="minOrderAmount" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date:</label>
                        <input type="date" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 p-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                    </div>
                    <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100">Add Coupon</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddCouponForm;
