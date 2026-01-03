import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_API_URL } from '../utils/constant'
import { removeUser } from '../store/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const pathname = window.location.pathname

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_API_URL}/auth/logout`, {}, {
                withCredentials: true
            })
            dispatch(removeUser())
            return navigate("/login")
        } catch (error) {
            console.log("error in logging out user ", error)
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm py-3">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            {pathname !== '/login' && !user && <button className="btn btn-primary mr-8" onClick={() => navigate("/login")}>Login</button>}
            {user && <div className="flex gap-2 items-center    ">
                <p>Welcome {user.firstName}!</p>
                <div className="dropdown dropdown-end mx-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user photo"
                                src={user.photo} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar