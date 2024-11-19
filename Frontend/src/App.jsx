import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserSearch from './components/UserSearch';
import UserList from './components/UserList';

const API_URL = 'http://localhost:3000/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingMessages = [
    "Still starting...",
    "Render is almost there...",
    "Hold tight, we're working on it...",
    "Hang on, just a little bit more...",
    "Preparing the view, please wait...",
  ];

  const fetchUsers = async () => {
    setLoading(true);
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          User CRUD Operations
        </h1>

        <UserSearch onSearch={fetchUsers} />
        <UserForm onSubmit={fetchUsers} />

        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">{loadingMessage}</p>
          </div>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </div>
  );
};

export default App;
