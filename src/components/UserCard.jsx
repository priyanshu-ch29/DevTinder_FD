import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../store/feedSlice"
import { BASE_API_URL } from "../utils/constant"
import axios from "axios"

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, age, gender, bio, photo } = user
    const dispatch = useDispatch()

    const handleSendRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/request/send/${status}/${_id}`, {}, {
                withCredentials: true
            })
            dispatch(removeUserFromFeed(_id))
        } catch (error) {
            console.log("Error sending request", error.response.message)
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm rounded-lg">
            <figure>
                <img src={photo} alt="photo" className="rounde-t-lg w-full h-65" />
            </figure>
            <div className="card-body items-start text-center px-10">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p className="text-left">{bio}</p>
            </div>
            <div className="card-actions flex justify-center items-center mb-5">
                <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignored</button>
                <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
            </div>
        </div>
    )
}

export default UserCard