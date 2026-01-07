import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../utils/constant"

const Requests = () => {
    const [connectionsRequests, setConnectionsRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchConnectionRequest = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_API_URL}/user/request/recieved`, {
                withCredentials: true
            })
            setConnectionsRequests(res?.data?.data)
        } catch (error) {
            console.log("Error fetching connections", error.response.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchConnectionRequest()
    }, [])

    const handleRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/request/review/${status}/${_id}`, {}, {
                withCredentials: true
            })
            const conn = connectionsRequests.filter(r => r._id !== _id)
            setConnectionsRequests(conn)
        } catch (error) {
            console.log("Error in request", error.response.message)
        }
    }


    if (loading) {
        return (
            <div className=" flex justify-center my-10">
                Fetching Connection Request...
            </div>
        )
    }

    if (connectionsRequests.length === 0) {
        return (
            <div className="flex justify-center my-20">
                No connection request found!
            </div>
        )
    }
    console.log(connectionsRequests)
    return (
        <div className='flex flex-col justify-center my-10'>
            <h1 className='text-center text-4xl font-semibold'>Connection Requests</h1>
            <div className="flex flex-col gap-10 items-center justify-center my-10 ">
                {
                    connectionsRequests.map((item) => {
                        const { photo, firstName, lastName, age, bio } = item?.fromUserId
                        return <div key={item?._id} className="flex items-center justify-start py-5 px-3 gap-10 rounded-xl bg-base-300 w-[45%]">
                            <img src={photo} alt="photo" className="w-30 h-30 object-cover rounded-full" />
                            <div>
                                <h1 className="font-semibold text-xl">{firstName} {lastName}{", "} {age}</h1>
                                <p className="pt-4 text-sm text-gray-400">{bio}</p>
                            </div>
                            <div>
                                <div className="card-actions flex justify-center items-center">
                                    <button className="btn btn-primary" onClick={() => handleRequest("rejected", item?._id)}>Rejected</button>
                                    <button className="btn btn-secondary" onClick={() => handleRequest("accepted", item?._id)}>Accepted</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Requests