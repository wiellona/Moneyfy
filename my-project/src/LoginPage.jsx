import React, { useState } from 'react';
import './LoginPageStyle.jsx'; // Mengimpor file styling
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './LoginPageStyle.jsx';
import LoginPageStyle from './LoginPageStyle.jsx';
 
const LoginPage = () => {
  // State untuk menangani tampilan modal register
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Fungsi untuk membuka modal register
  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  // Fungsi untuk menutup modal register
  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div>
      <Header /> {/* Menampilkan Header */}
    <div className="login-container">
      <div className="form-container">
        {/* Teks Judul */}
        <h2 className="form-title font-semibold text-3xl text-center mb-4">
          Welcome to MoneyFy
        </h2>
        <p className="form-subtitle text-center text-gray-500 mb-6">
          Sign in to manage your finances
        </p>

        {/* Form Login */}
        <form className="form space-y-4">
          {/* Email Address */}
          <div className="input-group">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1 font-semibold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="block text-gray-700 text-sm mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="forgot-password text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button Log In and Register */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="submit-btn w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Log In
            </button>
            <button
              type="button"
              className="register-btn w-full py-2 text-white bg-indigo-600 font-bold rounded-md hover:bg-indigo-700 focus:outline-none"
              onClick={openRegisterModal}
            >
              Register
            </button>
          </div>
        </form>

        {/* Pendaftaran dan Login Link */}
        <div className="auth-links flex justify-center text-sm text-gray-500 mt-4">
          <p className="signup-prompt text-center">
            Don’t have an account?{' '}
            <a href="#" className="signup-link text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Modal Register */}
      {isRegisterOpen && (
        <div className="modal-overlay" onClick={closeRegisterModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-center mb-4">Register</h2>
            <p className="text-center text-gray-500 mb-6">
              Looks like you are the first one here, create an account below to start using MoneyFy
            </p>
            <form className="space-y-4">
              {/* Name */}
              <div className="input-group">
                <label htmlFor="name" className="block text-gray-700 text-sm mb-1 font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email Address */}
              <div className="input-group">
                <label htmlFor="new-email" className="block text-gray-700 text-sm mb-1 font-semibold">
                  Email Address
                </label>
                <input
                  id="new-email"
                  type="email"
                  placeholder="Enter your email"
                  className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <label htmlFor="new-password" className="block text-gray-700 text-sm mb-1 font-semibold">
                  Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter your password"
                  className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Button to Submit Register */}
              <button
                type="submit"
                className="submit-btn w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Register
              </button>
            </form>

            {/* Close Modal */}
            <button
              className="close-modal py-2 px-4 mt-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              onClick={closeRegisterModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer /> {/* Menampilkan Footer */}
    <LoginPageStyle />
    </div>
    
  );
};


export default LoginPage;
