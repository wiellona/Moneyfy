import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8">
        <div className="text-3xl font-bold">MoneyFy</div>
        <nav className="space-x-6">
          <a href="#" className="hover:text-purple-300">About us</a>
          <a href="#" className="hover:text-purple-300">Our Features</a>
          <a href="#" className="hover:text-purple-300">Contact Us</a>
          <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Register</a>
          <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Login</a>
        </nav>
      </header>

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
  );
};

export default LandingPage;
