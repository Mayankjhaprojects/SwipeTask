import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login"; // Normal user login
import LoginPage from "./pages/LoginPage"; // Admin login

// User-related pages
import UserProfilePage from './pages/user'; // Shows another user's public profile
import EditProfileForm from "./pages/UserProfile"; // Edit own profile
import HomePage from "./pages/HomePage"; // User's dashboard
import SwapRequests from "./pages/RequestInfo"; // User sees swap requests
import SwapRequestForm from "./pages/SwapRequest"; // User sends swap request

// Admin pages
import AdminPage from "./pages/Adminpage"; // Admin dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginadmin" element={<LoginPage />} />

        {/* User Pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/user" element={<UserProfilePage />} />
        <Route path="/editprofile" element={<EditProfileForm />} />
        <Route path="/requests" element={<SwapRequests />} />
        <Route path="/swaprequest" element={<SwapRequestForm />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Future: 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
