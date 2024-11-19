import { useState } from "react";

const UserManagement = () => {
    const [searchName, setSearchName] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateData, setUpdateData] = useState({
        name: "",
        email: "",
        age: "",
        weight: "",
        height: "",
        healthGoals: "",
    });

    // Search users by name
    const handleSearch = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/users/search/name?name=${searchName}`  // Fix URL here
            );
            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error searching users:", error);
            alert("An error occurred while searching users.");
        }
    };


    // Delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }
            alert("User deleted successfully.");
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    };

    // Update user
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3000/users/${selectedUser.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData),
                }
            );
            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }
            alert("User updated successfully.");
            setSelectedUser(null);
            setUpdateData({
                name: "",
                email: "",
                age: "",
                weight: "",
                height: "",
                healthGoals: "",
            });
            handleSearch(); // Refresh the user list
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the user.");
        }
    };

    // Handle input changes for update form
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            {/* Search Section */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search by name"
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Search
                </button>
            </div>

            {/* User List */}
            <div>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 border border-gray-300 rounded mb-4 flex justify-between"
                    >
                        <div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Weight:</strong> {user.weight}</p>
                            <p><strong>Height:</strong> {user.height}</p>
                            <p><strong>Health Goals:</strong> {user.healthGoals}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setUpdateData(user);
                                }}
                                className="bg-yellow-500 text-white p-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Form */}
            {selectedUser && (
                <form onSubmit={handleUpdate} className="mt-6 p-4 border rounded">
                    <h3 className="text-lg font-bold mb-4">
                        Update User: {selectedUser.name}
                    </h3>
                    <input
                        type="text"
                        name="name"
                        value={updateData.name}
                        onChange={handleUpdateChange}
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded w-full mb-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={updateData.email}
                        onChange={handleUpdateChange}
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        name="age"
                        value={updateData.age}
                        onChange={handleUpdateChange}
                        placeholder="Age"
                        className="p-2 border border-gray-300 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        name="weight"
                        value={updateData.weight}
                        onChange={handleUpdateChange}
                        placeholder="Weight"
                        className="p-2 border border-gray-300 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        name="height"
                        value={updateData.height}
                        onChange={handleUpdateChange}
                        placeholder="Height"
                        className="p-2 border border-gray-300 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        name="healthGoals"
                        value={updateData.healthGoals}
                        onChange={handleUpdateChange}
                        placeholder="Health Goals"
                        className="p-2 border border-gray-300 rounded w-full mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserManagement;
