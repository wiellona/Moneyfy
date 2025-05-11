import React from 'react';

const AboutMoneyFy = () => {
  return (
    <div className="about-container bg-gradient-to-br from-purple-400 via-indigo-500 to-purple-700 text-white py-20">
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
        <footer className="text-center mt-12 text-sm text-gray-200">
          <p>© 2023 MoneyFy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutMoneyFy;
