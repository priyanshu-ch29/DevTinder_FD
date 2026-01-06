const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, bio, photo } = user
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
                <button className="btn btn-primary">Ignored</button>
                <button className="btn btn-secondary">Interested</button>
            </div>
        </div>
    )
}

export default UserCard