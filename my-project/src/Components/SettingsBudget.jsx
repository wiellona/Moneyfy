import React, { useState } from 'react';
import HeaderTransaction from './HeaderTransaction';
import Footer from './Footer';

const budgetsData = [
  {
    id: 1,
    name: "Game",
    remaining: 50000,
    total: 100000,
    spent: 0.5,
    icon: "🎮",
  },
  {
    id: 2,
    name: "Game",
    remaining: 50000,
    total: 100000,
    spent: 0.5,
    icon: "🎮",
  },
  {
    id: 3,
    name: "Game",
    remaining: 50000,
    total: 100000,
    spent: 0.5,
    icon: "🎮",
  },
  {
    id: 4,
    name: "Game",
    remaining: 50000,
    total: 100000,
    spent: 0.5,
    icon: "🎮",
  },
  {
    id: 5,
    name: "Game",
    remaining: 50000,
    total: 100000,
    spent: 0.5,
    icon: "🎮",
  },
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const SettingsBudget = () => {
  const [monthIndex, setMonthIndex] = useState(4); // May
  const [filter, setFilter] = useState('Budget');

  const handlePrevMonth = () => setMonthIndex(prev => (prev === 0 ? 11 : prev - 1));
  const handleNextMonth = () => setMonthIndex(prev => (prev === 11 ? 0 : prev + 1));

  return (
    <>
      <HeaderTransaction />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-200 px-4 py-10">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto mb-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            {/* Dropdown kiri */}
            <div>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="bg-white rounded-xl shadow px-4 py-2 border text-purple-700 font-medium focus:outline-none"
              >
                <option>Budget</option>
                <option>Transactions</option>
                <option>Income</option>
                <option>Expenses</option>
              </select>
            </div>
            {/* Title */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center">Settings</h1>
            </div>
            {/* Kosongkan kanan supaya title tetap di tengah */}
            <div style={{ width: '160px' }}></div>
          </div>
          {/* Month nav */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handlePrevMonth}
              className="text-xl px-4 py-2 rounded border hover:bg-gray-100"
            >&lt;</button>
            <span className="text-2xl font-semibold">{monthNames[monthIndex]}</span>
            <button
              onClick={handleNextMonth}
              className="text-xl px-4 py-2 rounded border hover:bg-gray-100"
            >&gt;</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Budget List */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            {budgetsData.map(budget => (
              <div key={budget.id} className="flex items-center justify-between py-4 border-b last:border-none">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl">
                    {budget.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{budget.name}</p>
                    <p className="text-xs text-gray-500">Remaining Rp {budget.remaining.toLocaleString('id-ID', {minimumFractionDigits: 2})}</p>
                    {/* Progress Bar */}
                    <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-green-400 rounded-full"
                        style={{ width: `${budget.spent * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-700">
                    Rp {budget.remaining.toLocaleString('id-ID', {minimumFractionDigits: 2})}
                    <span className="text-gray-400"> of Rp {budget.total.toLocaleString('id-ID', {minimumFractionDigits: 2})}</span>
                  </p>
                  <p className="text-xs text-gray-400">{Math.round(budget.spent * 100)}% spent</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            {/* Monthly Balance */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Monthly Balance</span>
                <button className="text-purple-600 underline text-sm">Edit</button>
              </div>
              <p className="text-2xl font-bold">Rp 100,000.00</p>
              <div className="flex items-center justify-start mt-1 gap-1 text-green-500">
                <span>▲</span>
                <span>+2.5%</span>
              </div>
            </div>
            {/* Total Balance */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Total Balance</span>
              </div>
              <p className="text-2xl font-bold">Rp 25,430.82</p>
              <div className="flex items-center justify-start mt-1 gap-1 text-green-500">
                <span>▲</span>
                <span>+2.5%</span>
              </div>
            </div>
            {/* Savings Goal */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Savings Goal</span>
                <button className="text-purple-600 underline text-sm">Edit</button>
              </div>
              <p className="text-2xl font-bold">Rp 150,000.00</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-gray-600 text-sm">
                <span>72% achieved</span>
                <span>12 days left</span>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-purple-700">
                Claim Savings
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default SettingsBudget;
