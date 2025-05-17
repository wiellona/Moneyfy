import React, { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setPassword("");
    setEmail("");
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    console.log({ email, password });
    toast.loading("Logging in...");
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/user/login?email=${email}&password=${password}`
      );
      if (response.status !== 200) throw new Error("Login failed");
      console.log(response.data);
      toast.dismiss();
      toast.success("Login successful");

      login(response.data.payload);
      navigate("/dashboard", { state: { userData: response.data } });
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Login failed. Please try again.");
    } finally {
      // Add a delay of 2 seconds before dismissing the toast
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    console.log({ name, email, password });
    toast.loading("Registering...");
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/user/register?email=${email}&password=${password}&name=${name}`
      );

      console.log(response);
      toast.dismiss();
      toast.success("Registration successful, please login");
      setActiveTab("login");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Registration failed. Please try again.");
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-8 w-[350px] shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome to MoneyFy
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to manage your finances
        </p>

        {/* Tab Buttons */}
        <div className="flex mb-6 rounded-md bg-gray-100">
          <button
            className={`flex-1 py-3 font-semibold rounded-md ${
              activeTab === "login"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-semibold rounded-md ${
              activeTab === "register"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Content Form */}
        {activeTab === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm mb-1 font-semibold"
              >
                Email Address
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm mb-1 font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                required
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-indigo-800 text-xs hover:underline block mb-5 font-medium"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-900 focus:outline-none"
            >
              Log In
            </button>
          </form>
        )}

        {activeTab === "register" && (
          <>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Looks like you are the first one here, create an account below to
              start using MoneyFy
            </p>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm mb-1 font-semibold"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="new-email"
                  className="block text-gray-700 text-sm mb-1 font-semibold"
                >
                  Email Address
                </label>
                <input
                  id="new-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-gray-700 text-sm mb-1 font-semibold"
                >
                  Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-900 focus:outline-none"
              >
                Register
              </button>
            </form>
          </>
        )}

        <div className="text-center text-gray-500 text-sm mt-6">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-indigo-800 hover:underline"
                onClick={() => handleTabChange("register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => handleTabChange("login")}
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
