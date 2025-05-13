import React, { useState } from "react";
import { ChevronRight, Calendar, ArrowLeft } from "lucide-react";
import Headers from "./Header";
import Footer from "./Footer";

const SetBudget = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ amount, category, startDate, endDate });
    // Handle budget submission logic here
  };

  // Mock data for budget overview
  const budgetOverviews = [
    {
      id: 1,
      category: "Game",
      remaining: 50000,
      total: 100000,
      percentage: 50,
    },
    {
      id: 2,
      category: "Game",
      remaining: 50000,
      total: 100000,
      percentage: 50,
    },
    {
      id: 3,
      category: "Game",
      remaining: 50000,
      total: 100000,
      percentage: 50,
    },
  ];

  return (
    <div>
        <Headers />
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Header */}
      {/* <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MoneyFy</h1>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-700">
                About us
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-700">
                Our Features
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-700">
                Contact Us
              </a>
            </nav>
            <a href="#" className="text-gray-700 hover:text-purple-700">
              Settings
            </a>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Logout
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button and Title */}
        <div className="mb-6">
          <button className="p-2 rounded-full hover:bg-gray-100 mb-4">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-center">Set Budget</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="game">Game</option>
                    <option value="shopping">Shopping</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>

          {/* Budget Overview */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Budget Overview</h2>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                View All
              </a>
            </div>

            <div className="space-y-4">
              {budgetOverviews.map((budget) => (
                <div
                  key={budget.id}
                  className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 p-2 rounded-lg">
                        <svg
                          className="h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 10H7C5.89543 10 5 10.8954 5 12V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V12C19 10.8954 18.1046 10 17 10Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 10V6C14 4.89543 13.1046 4 12 4H12C10.8954 4 10 4.89543 10 6V10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{budget.category}</p>
                        <p className="text-sm text-gray-500">
                          Remaining Rp {budget.remaining.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${budget.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rp {budget.remaining.toLocaleString()} of Rp{" "}
                      {budget.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">MoneyFy</h2>
              <p className="text-gray-600 text-sm">
                Your smart financial companion for better money management
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © 2025 MoneyFy. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
    <Footer />
    </div>
  );
};

export default SetBudget;