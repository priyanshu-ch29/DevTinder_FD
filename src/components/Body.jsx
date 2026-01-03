import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_API_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((store) => store.user)
    const fetchUser = async () => {
        if (user) return
        try {
            const res = await axios.get(`${BASE_API_URL}/profile/view`, {
                withCredentials: true
            })
            dispatch(addUser(res?.data?.user))
        } catch (error) {
            if (error?.response?.status === 401) {
                navigate("/login")
            }
            console.log("Error in fetching user", error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body