import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useFoodContext } from '../../context/foodContext'
import axios from 'axios'
import Foods from './Foods'
import { InfinitySpin } from 'react-loader-spinner'

const NewFoods = () => {
    const [newfood, setNewFoood] = useState([])
    const { food, setFood } = useFoodContext()
    const [loading, setLoading] = useState(true)
    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8001/api/v1/food/getNewFoods`)
            if (res.data.success) {
                setLoading(false)
                setNewFoood(res.data.data.food)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(newfood)
    useEffect(() => {
        getFoods()
    }, [newfood])
    return (
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                    New <span className="text-[#f54748]">Foods</span>
                </div>
                {
                    loading ? (<div className="text-center mx-auto w-32">

                        < InfinitySpin
                            visible={true}
                            width="200"
                            className="text-center mx-auto"
                            color="red"
                            ariaLabel="infinity-spin-loading"
                        />

                    </div>) : (<div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {
                            newfood?.map(curElem => <Foods curElem={curElem} />)
                        }
                    </div>)
                }

            </div>
        </div>
    )
}

export default NewFoods