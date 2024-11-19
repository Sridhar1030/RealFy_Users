import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserSearch from "./components/UserSearch";
import UserList from "./components/UserList";
import UserManagement from "./components/UserManagment";

const API_URL = "http://localhost:3000/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const loadingMessages = [
    "Still starting...",
    "Render is almost there...",
    "Hold tight, we're working on it...",
    "Hang on, just a little bit more...",
    "Preparing the view, please wait...",
  ];

  const fetchUsers = async () => {
    setLoading(true);
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingMessage(randomMessage);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            User CRUD Operations
          </h1>
          {/* Navigation Links */}
          <div className="flex justify-center mb-8 gap-4">
            <Link
              to="/"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Home
            </Link>
            <Link
              to="/user-management"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              User Management
            </Link>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <UserSearch onSearch={fetchUsers} />
                  <UserForm onSubmit={fetchUsers} />
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                      <p className="mt-4 text-lg text-gray-600">
                        {loadingMessage}
                      </p>
                    </div>
                  ) : (
                    <UserList users={users} />
                  )}
                </>
              }
            />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
