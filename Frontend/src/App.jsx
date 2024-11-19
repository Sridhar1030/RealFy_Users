import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserSearch } from "lucide-react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserManagement from "./components/UserManagment";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const loadingMessages = [
    "Still starting...",
    "Almost there...",
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
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-slate-700">
                User Management
              </h1>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/user-management"
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                >
                  Management
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <UserSearch onSearch={fetchUsers} />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-medium text-slate-700 mb-4">
                      Add New User
                    </h2>
                    <UserForm onSubmit={fetchUsers} />
                  </div>

                  {loading ? (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-600"></div>
                        <p className="mt-4 text-slate-600">{loadingMessage}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl font-medium text-slate-700 mb-4">
                        User List
                      </h2>
                      <UserList users={users} />
                    </div>
                  )}
                </div>
              }
            />
            <Route
              path="/user-management"
              element={
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <UserManagement />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;