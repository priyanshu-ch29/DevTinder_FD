import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_API_URL } from "../utils/constant";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [photo, setphoto] = useState(user?.photo);
    const [bio, setBio] = useState(user?.bio);
    const [error, setError] = useState({
        firstName: null,
        lastName: null,
        age: null,
        gender: null,
        photo: null,
        bio: null,
        response: null,
    });
    const [loading, setloading] = useState(false);
    const [showToast, setshowToast] = useState(false)

    const handleError = () => {
        let isValid = true;
        const newErrors = {
            firstName: "",
            lastNameastName: "",
        };
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!firstName.trim()) {
            newErrors.firstName = "First Name is required";
            isValid = false;
        }
        if (!lastName.trim()) {
            newErrors.lastName = "Last Name is required";
            isValid = false;
        }
        if (!age) {
            newErrors.age = "Age is required";
            isValid = false;
        }
        if (!gender.trim()) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }
        if (!photo.trim()) {
            newErrors.photo = "Photo URL is required";
            isValid = false;
        }
        if (!bio.trim()) {
            newErrors.bio = "About is required";
            isValid = false;
        }
        setError(newErrors);
        return isValid;
    };
    const handleSave = async () => {
        if (!handleError()) return;
        setloading(true);
        try {
            const res = await axios.patch(
                `${BASE_API_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    bio,
                    photo,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res?.data?.user));
            setshowToast(true)
            setTimeout(() => {
                setshowToast(false)
            }, 2000)
        } catch (error) {
            console.log("Save Profile Error", error.response.data.message);
            setError((prev) => ({
                ...prev,
                response: error?.response?.data?.message,
            }));
        } finally {
            setloading(false);
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center gap-10 my-10 md:my-0">
            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="card bg-base-300 w-80 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name:</legend>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setError((prev) => ({
                                        ...prev,
                                        firstName: null,
                                        response: null,
                                    }));
                                    setFirstName(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.firstName && (
                                <p className="ml-3 text-red-500">{error.firstName}</p>
                            )}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name:</legend>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setError((prev) => ({
                                        ...prev,
                                        lastName: null,
                                        response: null,
                                    }));
                                    setLastName(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.lastName && (
                                <p className="ml-3 text-red-500">{error.lastName}</p>
                            )}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age:</legend>
                            <input
                                type="text"
                                value={age}
                                onChange={(e) => {
                                    setError((prev) => ({ ...prev, age: null, response: null }));
                                    setAge(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.age && <p className="ml-3 text-red-500">{error.age}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender:</legend>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => {
                                    setError((prev) => ({ ...prev, gender: null, response: null }));
                                    setGender(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.gender && (
                                <p className="ml-3 text-red-500">{error.gender}</p>
                            )}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo URL:</legend>
                            <input
                                type="text"
                                value={photo}
                                onChange={(e) => {
                                    setError((prev) => ({ ...prev, photo: null, response: null }));
                                    setphoto(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.photo && <p className="ml-3 text-red-500">{error.photo}</p>}
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About:</legend>
                            <input
                                type="text"
                                value={bio}
                                onChange={(e) => {
                                    setError((prev) => ({ ...prev, bio: null, response: null }));
                                    setBio(e.target.value);
                                }}
                                className="input input-md"
                            />
                            {error.bio && <p className="ml-3 text-red-500">{error.bio}</p>}
                        </fieldset>
                        {error.response && (
                            <p className="text-center text-red-500">{error.response}</p>
                        )}
                        <div className="card-actions justify-center mt-8 mb-4">
                            <button className="btn btn-primary" onClick={handleSave}>
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, bio, photo }} />
                {showToast && <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default EditProfile;
