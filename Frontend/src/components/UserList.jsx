const UserList = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center text-gray-700">
                No users found matching your search criteria.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="space-y-2">
                        <p className="font-bold text-lg">{user.name}</p>
                        <p className="text-gray-600">UserID: {user.id}</p>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Age: {user.age}</p>
                        <p className="text-gray-600">Weight: {user.weight} kg</p>
                        <p className="text-gray-600">Height: {user.height} cm</p>
                        <p className="text-gray-600">Health Goals: {user.healthGoals}</p>
                        <p className="text-gray-600">
                            Created At: {new Date(user.createdAt._seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
