import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
    <div className="landing-page bg-white text-black">
      {/* Header */}
      {/* <header className="flex justify-between items-center py-6 px-8">
        <div className="text-3xl font-bold">MoneyFy</div>
        <nav className="space-x-6">
          <a href="#about" className="hover:text-purple-300">About us</a>
          <a href="/" className="hover:text-purple-300">Our Features</a>
          <a href="#footer" className="hover:text-purple-300">Contact Us</a>
          <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Register</a>
          <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Login</a>
        </nav>
      </header> */}

      {/* Main Content */}
      <div className="text-center py-20 px-8">
        <h1 className="text-5xl font-extrabold mb-6">
          Track. Save. <span className="text-purple-600">Spend smarter.</span>
        </h1>
        <p className="text-xl mb-6 text-gray-700">
          Moneyfy shows where your cash goes, helps you save more, and spend like a boss 😎. No stress, just smart moves. 💸
        </p>
        <button className="bg-purple-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-purple-700">
          Get started
        </button>
      </div>

      {/* Dashboard Image Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <img src="https://via.placeholder.com/800x400.png" alt="Dashboard" className="w-full rounded-lg shadow-lg" />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mb-12">
        <div className="stat-box bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">1M+</h3>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>
        <div className="stat-box bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">50M+</h3>
          <p className="text-sm text-gray-600">Transactions Tracked</p>
        </div>
        <div className="stat-box bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">$500M+</h3>
          <p className="text-sm text-gray-600">User Savings</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-6">
        <p className="text-gray-600">© 2024 MoneyFy. All rights reserved.</p>
      </footer>
    </div>

    <div id="about" className="about-container bg-gradient-to-br from-purple-400 via-indigo-500 to-purple-700 text-white py-20">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* About Section */}
        <h2 className="text-4xl font-extrabold text-white mb-4">About MoneyFy</h2>
        <p className="text-lg mb-8 text-gray-200">
          We’re on a mission to revolutionize personal finance management, making it simple, smart, and accessible for everyone.
        </p>

        {/* Why Choose MoneyFy Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="feature-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Smart Tracking</h3>
            <p className="text-gray-600">Automatically categorize and track your expenses with AI-powered insights.</p>
          </div>
          <div className="feature-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Goal Setting</h3>
            <p className="text-gray-600">Set and achieve your financial goals with personalized saving plans.</p>
          </div>
          <div className="feature-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Bank-Grade Security</h3>
            <p className="text-gray-600">Your financial data is protected with the highest security standards.</p>
          </div>
        </div>

        {/* Our Team Section */}
        <h3 className="text-3xl font-extrabold mb-6 text-white">Our Team</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="team-member text-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <p className="font-semibold text-white">Sarah Johnson</p>
            <p className="text-sm text-gray-200">CEO & Founder</p>
          </div>
          <div className="team-member text-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <p className="font-semibold text-white">Michael Chen</p>
            <p className="text-sm text-gray-200">CTO</p>
          </div>
          <div className="team-member text-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <p className="font-semibold text-white">Emma Davis</p>
            <p className="text-sm text-gray-200">Head of Design</p>
          </div>
          <div className="team-member text-center">
            <div className="w-48 h-48 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <p className="font-semibold text-white">Alex Thompson</p>
            <p className="text-sm text-gray-200">Head of Product</p>
          </div>
        </div>

        {/* Footer Section */}
        
        {/* <footer id="footer" className="text-center mt-12 text-sm text-gray-200">
          <p>© 2024 MoneyFy. All rights reserved.</p>
        </footer>
      </div>
    </div>
    <footer className="px-10 py-8 mt-8 border-t">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <h5 className="font-bold mb-2">MoneyFy</h5>
            <p className="text-xs text-gray-500">Your smart financial companion for better money management</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Company</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Resources</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Legal</h5>
            <ul className="text-sm flex flex-col gap-1">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t text-xs text-gray-500">
          <p>© 2025 MoneyFy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer> */}
    </div>
    
    </div>
    <Footer />
    </div>
  );
};

export default LandingPage;
