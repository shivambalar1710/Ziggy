import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/Logo.svg"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate()
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        const userData = { email, password };
        fetch("http://localhost:8001/api/v1/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    toast.success(data.message);

                    form.reset();

                    navigate("/");
                } else {
                    toast.error(data.message);
                }
            });
    };
    return (
        <div className="login">
            <div className=" h-screen pt-[16vh]">
                <form className=' ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5' onSubmit={handleOnSubmit}>
                    <NavLink to="/">
                        <img src={logo} alt="" className="logo mb-6 cursor-pointer text-center" />
                    </NavLink>
                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input type="email" placeholder='Enter your email' name='email' className=' shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 text-sm mb-2' htmlFor='email'>
                            Password
                        </label>
                        <input type="password" placeholder='**********' name='password' className=' shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type='submit'>Sign In</button>

                    <Link to="/register" className=' text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded'>
                        Create an Account
                    </Link>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Login