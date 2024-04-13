import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const { user } = useUserContext()
    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };
    const combinedOtp = parseInt(otp.join(''));
    console.log(combinedOtp)
    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = user?.user?.email;

        const dataOtp = { email, combinedOtp };

        fetch("http://localhost:8001/api/v1/user/verifyotp", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(dataOtp),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {

                    toast.success(data.message);
                    navigate("/");
                    location.reload()


                } else {
                    toast.error(data.message);
                }
            });
    };


    return (

        <div className="relative pt-[18vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {user?.user?.email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleOnSubmit}>
                            <div className="flex flex-col space-y-16">


                                <div className="flex justify-center items-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="w-12 h-12 mx-2 border border-gray-300 rounded text-center text-xl"
                                        />
                                    ))}
                                </div>


                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp