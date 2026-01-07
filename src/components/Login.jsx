import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_API_URL } from '../utils/constant'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signUpForm, setSignUpForm] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstaName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        response: null
    })

    const handleError = () => {
        let isValid = true
        const newErrors = {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        };
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false
        }
        if (signUpForm && !firstName.trim()) {
            newErrors.firstName = "First Name is required";
            isValid = false
        }
        if (signUpForm && !lastName.trim()) {
            newErrors.lastName = "Last Name is required";
            isValid = false
        }
        if (email && !regex.test(email)) {
            newErrors.email = "Invalid email format";
            isValid = false
        }
        setError(newErrors);
        return isValid
    };
    const handleLogin = async () => {
        if (!handleError()) return
        try {
            const res = await axios.post(`${BASE_API_URL}/auth/login`, {
                email, password
            }, {
                withCredentials: true
            })
            dispatch(addUser(res?.data?.user))
            return navigate("/")
        } catch (error) {
            console.log("Login error", error.response.data.message)
            setError((prev) => ({ ...prev, response: error?.response?.data?.message }))
        }
    }

    const handleSignUp = async () => {
        if (!handleError()) return
        try {
            const res = await axios.post(`${BASE_API_URL}/auth/signup`, {
                email, password, firstName, lastName
            }, {
                withCredentials: true
            })
            dispatch(addUser(res?.data?.user))
            return navigate("/profile")
        } catch (error) {
            console.log("Login error", error.response.data.message)
            setError((prev) => ({ ...prev, response: error?.response?.data?.message }))
        }
    }

    return (
        <div className='flex justify-center items-center my-20'>
            <div className="card bg-base-300 w-80 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{signUpForm ? "Sign Up" : "Login"}</h2>
                    {signUpForm && <label className="floating-label my-2">
                        <span>First Name:</span>
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => {
                                setError((prev) => ({ ...prev, firstName: null, response: null }))
                                setFirstaName(e.target.value)
                            }}
                            className="input input-md"
                        />
                        {
                            error.firstName && <p className='ml-3 text-red-500'>{error.firstName}</p>
                        }
                    </label>}
                    {signUpForm && <label className="floating-label my-2">
                        <span>Last Name:</span>
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => {
                                setError((prev) => ({ ...prev, lastName: null, response: null }))
                                setLastName(e.target.value)
                            }}
                            className="input input-md"
                        />
                        {
                            error.lastName && <p className='ml-3 text-red-500'>{error.lastName}</p>
                        }
                    </label>}
                    <label className="floating-label my-2">
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
                    <label className="floating-label my-2">
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
                        <button className="btn btn-primary" onClick={signUpForm ? handleSignUp : handleLogin}>{signUpForm ? "Sign up" : "Login"}</button>
                    </div>
                    <p className='text-center font-semibold text-md'>
                        {signUpForm ? "already have an account? " : "Don't have an account? "}
                        <span className='cursor-pointer underline' onClick={() => setSignUpForm((prev) => !prev)}>{signUpForm ? "Login" : "SignUp"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login