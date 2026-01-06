import axios from "axios"
import { BASE_API_URL } from '../utils/constant'
import { useEffect, useState } from "react"

const Connections = () => {
    const [connections, setConnections] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchConnections = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_API_URL}/user/view/connection`, {
                withCredentials: true
            })
            setConnections(res?.data?.data)
        } catch (error) {
            console.log("Error fetching connections", error.response.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (loading) {
        return (
            <div className=" flex justify-center my-10">
                Fetching Connections...
            </div>
        )
    }

    if (connections.length === 0) {
        return (
            <div className="flex justify-center my-20">
                No connections found!
            </div>
        )
    }
    console.log(connections)
    return (
        <div className='flex flex-col justify-center my-10'>
            <h1 className='text-center text-4xl font-semibold'>Connections</h1>
            <div className="flex items-center justify-center my-10 ">
                {
                    connections.map((item) => {
                        return <div key={item?._id} className="flex items-center justify-start py-5 px-3 gap-10 rounded-xl bg-base-300 w-[45%]">
                            <img src={item?.photo} alt="photo" className="w-30 h-30 object-fill rounded-full" />
                            <div>
                                <h1 className="font-semibold text-xl">{item?.firstName} {item?.lastName}{", "} {item.age}</h1>
                                <p className="pt-4 text-sm text-gray-400">{item.bio}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Connections