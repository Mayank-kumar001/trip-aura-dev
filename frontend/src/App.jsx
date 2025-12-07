import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeComponent from "./components/HomeComponent";
import TripauraAgentComponent from "./components/TripauraAgentComponent";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword"; // integrated OTP page
import VerifyEmail from "./pages/Auth/VerifyEmail"; // after signup

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomeComponent />} />
        <Route path="/agent" element={<TripauraAgentComponent />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Forgot + OTP integrated page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Email verification after signup */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
