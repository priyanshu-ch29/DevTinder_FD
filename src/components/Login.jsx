import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_API_URL } from '../utils/constant'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        email: null,
        password: null,
        response: null
    })

    const handleError = () => {
        let isValid = true
        const newErrors = {
            email: "",
            password: ""
        };
        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false
        }
        setError(newErrors);
        return isValid
    };
    const handleLogin = async () => {
        if (!handleError()) return
        try {
            const res = await axios.post(`${BASE_API_URL}auth/login`, {
                email, password
            }, {
                withCredentials: true
            })
            dispatch(addUser(res?.data?.user))
            return navigate("/")
        } catch (error) {
            console.log("Login error", error.response.data.message)
            setError((prev) => ({ ...prev, response: error.response.data.message }))
        }
    }

    return (
        <div className='min-h-[70vh] flex justify-center items-center'>
            <div className="card bg-base-300 w-80 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <label className="floating-label my-4">
                        <span>Email:</span>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setError((prev) => ({ ...prev, email: null, response: null }))
                                setEmail(e.target.value)
                            }}
                            className="input input-md"
                        />
                        {
                            error.email && <p className='ml-3 text-red-500'>{error.email}</p>
                        }
                    </label>
                    <label className="floating-label">
                        <span>Password:</span>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setError((prev) => ({ ...prev, password: null, response: null }))
                                setPassword(e.target.value)
                            }}
                            className="input input-md"
                        />
                        {
                            error.password && <p className='ml-3 text-red-500'>{error.password}</p>
                        }
                    </label>
                    {error.response && <p className='text-center text-red-500'>{error.response}</p>}
                    <div className="card-actions justify-center mt-8 mb-4">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login