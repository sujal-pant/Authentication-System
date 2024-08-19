import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import Input from "../Component/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Auth/authStore";
import PasswordStrengthMeter from "../Component/PassswordStrengthMeter";
import { toast } from "react-hot-toast";

// Import images
import eyeIcon from "../assets/eye.png"; 
import eyeCrossIcon from "../assets/eyecross.png"; 

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const passwordRef = useRef(null); 
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success("Signup successful! Check your email to verify.");
      navigate("/verify-route");
    } catch (error) {
      toast.error("Signup failed. Please try again."); 
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
              required
            />
            <img
              className="p-1 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              width={30}
              src={showPassword ? eyeCrossIcon : eyeIcon} 
              onClick={toggleShowPassword}
              alt="Toggle password visibility"
            />
          </div>
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </motion.button>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {password.length !== 0 && (
            <PasswordStrengthMeter password={password} />
          )}
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
