const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, bio, photo } = user
    return (
        <div className="card bg-base-300 w-96 shadow-sm rounded-lg">
            <figure className="px-10 pt-10">
                <div className="overflow-hidden rounded-xl">
                    <img
                        src={photo}
                        alt="Shoes"
                        className="h-50! w-50! object-center"
                    />
                </div>
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