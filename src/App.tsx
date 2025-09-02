import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="bg-red-500">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;