import React from 'react';
import Header from './Components/Header';
import iqbalImage from './assets/M. Iqbal.jpg';
import wieloImage from './assets/Wielo.jpeg';
import neylaImage from './assets/Neyla.jpeg';
import ikhsanImage from './assets/ikhsan.jpeg';

import AboutUsSection from './Components/AboutUsSection';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="landing-page text-black">
        {/* Hero Section */}
        <div className="text-center py-20 px-8 flex flex-col justify-center items-center bg-gradient-to-b from-purple-300 via-white to-purple-400">
          <h1 className="text-5xl font-extrabold mb-6">
            Track. Save. <span className="text-purple-600">Spend smarter.</span>
          </h1>
          <p className="text-xl mb-6 text-gray-700">
            Moneyfy shows where your cash goes, helps you save more, and spend like a boss 😎. No stress, just smart moves. 💸
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-full text-xl hover:bg-purple-800 mt-6">
            Get started
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 mb-12 bg-gradient-to-b from-purple-300 via-white to-purple-400 py-6 rounded-lg shadow-lg">
          <div className="stat-box bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">1M+</h3>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>
          <div className="stat-box bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">50M+</h3>
            <p className="text-sm text-gray-600">Transactions Tracked</p>
          </div>
          <div className="stat-box bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">$500M+</h3>
            <p className="text-sm text-gray-600">User Savings</p>
          </div>
        </div>
      </div>

      {/* About MoneyFy Section */}
      <div id="about" className="about-container bg-white text-black py-10">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            <span className="text-black">About </span>
            <span className="text-purple-600">MoneyFy</span>
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            We’re on a mission to revolutionize personal finance management, making it simple, smart, and accessible for everyone.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <AboutUsSection />

      {/* Why Choose Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl font-extrabold mb-6">
            Why Choose <span className="text-purple-600">MoneyFy</span>
          </h3>
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
          <h3 className="text-3xl font-extrabold mb-6 text-purple-600">Our Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="team-member text-center">
              <img src={wieloImage} alt="Wielo" className="w-48 aspect-square object-cover rounded-full mx-auto mb-4" />
              <p className="font-semibold text-purple-600">Wiellona Darlene Oderia Saragih</p>
              <p className="text-sm text-gray-600">CEO & Founder</p>
            </div>
            <div className="team-member text-center">
              <img src={ikhsanImage} alt="ikhsan" className="w-48 aspect-square object-cover rounded-full mx-auto mb-4" />
              <p className="font-semibold text-purple-600">M. Ikhsan Kurniawan</p>
              <p className="text-sm text-gray-600">CTO</p>
            </div>
            <div className="team-member text-center">
              <img src={neylaImage} alt="Neyla" className="w-48 aspect-square object-cover rounded-full mx-auto mb-4" />
              <p className="font-semibold text-purple-600">Neyla Shakira</p>
              <p className="text-sm text-gray-600">Head of Design</p>
            </div>
            <div className="team-member text-center">
              <img src={iqbalImage} alt="M. Iqbal Alfajri" className="w-48 aspect-square object-cover rounded-full mx-auto mb-4" />
              <p className="font-semibold text-purple-600">M. Iqbal Alfajri</p>
              <p className="text-sm text-gray-600">Head of Product</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
