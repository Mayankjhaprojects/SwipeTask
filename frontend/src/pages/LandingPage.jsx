// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import SplashCursor from "../components/ui/SplashCursor";  

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
      
      {/* Splash Cursor */}
      <SplashCursor />

      {/* Login Button Top Left */}
      <button
        onClick={() => navigate("/loginadmin")}
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
      >
         Login as Admin  
      </button>

      {/* Main Center Content */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Skill Swap Platform</h1>
      <p className="mb-6 text-center px-4 max-w-md text-lg">
        Exchange skills with others. Learn, grow, and connect with passionate people.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg font-semibold"
      >
        Get Started
      </button>
      <button
        onClick={() => navigate("/register")}
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded text-lg font-semibold"
      >
        Register
      </button>
    </div>
  );
};

export default LandingPage;