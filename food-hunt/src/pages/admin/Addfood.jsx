import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import logo from "../../assets/Logo.svg"
const Addfood = () => {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post('http://localhost:8001/api/v1/all/upload-image', formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            if (uploading === false) {
                toast.success('Successfully uploaded')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const coupon = form.coupon.value;
        const location = form.location.value;
        const ingredients = form.ingredients.value;
        const description = form.description.value;
        const nutrition = form.nutrition.value;
        const allergen = form.allergen.value;
        const foodImage = image?.url
        const foodData = { name, price, foodImage, category, location, description, coupon, ingredients, nutrition, allergen };

        const res = await axios.post("http://localhost:8001/api/v1/food/addfood", { name, price, foodImage, category, location, description, coupon, ingredients, nutrition, allergen }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (res.data.success) {
            toast.success(res.data.message)
            form.reset();
        } else {
            toast.error(res.data.message)
        }
    }
    return (
        <div className="addfood">
            <div className="w-full mx-auto pt-[16vh] pb-10">
                <form className=' ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handleSubmit}>
                    <NavLink to="/">
                        <img src={logo} alt="" className="logo mx-auto mb-6 cursor-pointer text-center" />
                    </NavLink>
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">


                        <input type="text" placeholder='Enter food Name' name='name' className=' shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />


                        <input type="file" name='myFile' accept=' .jpeg, .png, .jpg' className="file-input file-input-bordered  bg-red-500 text-white file-input-md w-full" onChange={handleImage} />

                        <input type='number' placeholder='Enter price' name='price' className=' shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' step={0.01}/>

                        <select className="select bg-red-500 text-white select-md w-full max-w-xs" name="category">
                            <option disabled selected>category</option>
                            <option>Canadian Comfort Food</option>
                            <option>Asian Fusion</option>
                            <option>Italian Delights</option>
                            <option>Healthy & Organic</option>
                            <option>World Street Food</option>
                            <option>Exotic Drinks</option>
                        </select>
                        <input type='text' placeholder='Discount Coupon' name='coupon' className=' shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' placeholder='Enter location' name='location' className=' shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='ingredients' placeholder="Ingredients"></textarea>
                        <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='description' placeholder="Description"></textarea>
                        <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='nutrition' placeholder="nutrition"></textarea>
                        <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='allergen' placeholder="Allergen"></textarea>
                    </div>
                    <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5" type='submit'>Add food</button>

                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Addfood