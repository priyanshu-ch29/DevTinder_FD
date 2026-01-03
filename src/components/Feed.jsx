import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_API_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector((state) => state.feed)
    const getFeed = async () => {
        try {
            const res = await axios.get(`${BASE_API_URL}/user/view/feed`, {
                withCredentials: true
            })
            dispatch(addFeed(res?.data?.users))
        } catch (error) {
            console.log("error fetching feed ", error)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])

    if (!feed) {
        return (
            <div className='min-h-[70vh] flex justify-center items-center'>
                Loading...
            </div>
        )
    }

    return (
        <div className='min-h-[85vh] flex justify-center items-center'>
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed