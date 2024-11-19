import { useState } from 'react';

const UserForm = ({ onSubmit }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        weight: '',
        height: '',
        healthGoals: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            alert(`User ${data.name} created successfully!`);
            onSubmit();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
            <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                placeholder="Age"
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                name="weight"
                value={userData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                name="height"
                value={userData.height}
                onChange={handleChange}
                placeholder="Height"
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="healthGoals"
                value={userData.healthGoals}
                onChange={handleChange}
                placeholder="Health Goals"
                className="p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default UserForm;
