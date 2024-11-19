import { useState } from 'react';

const UserSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
            <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
            {searchTerm && (
                <button
                    type="button"
                    onClick={() => {
                        setSearchTerm('');
                        onSearch('');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Clear
                </button>
            )}
        </form>
    );
};

export default UserSearch;
