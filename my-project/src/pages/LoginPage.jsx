import React, { useState } from "react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // "login" atau "register"

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
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-semibold rounded-md ${
              activeTab === "register"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Content Form */}
        {activeTab === "login" && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm mb-1 font-semibold"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <form className="space-y-4">
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
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Don’t have an account?{" "}
              <button
                className="text-indigo-800 hover:underline"
                onClick={() => setActiveTab("register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setActiveTab("login")}
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
