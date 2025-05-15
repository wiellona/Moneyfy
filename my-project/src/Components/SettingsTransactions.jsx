import React, { useState } from 'react';
import HeaderTransaction from './HeaderTransaction';
import Footer from './Footer';

const transactionsData = [
  {
    id: 1,
    type: 'Netflix Subscription',
    date: '2024-01-15',
    amount: -14.99,
    icon: '🎬',
  },
  {
    id: 2,
    type: 'Salary Deposit',
    date: '2024-01-14',
    amount: 3500.0,
    icon: '💰',
  },
  {
    id: 3,
    type: 'Grocery Store',
    date: '2024-01-13',
    amount: -127.53,
    icon: '🛒',
  },
  {
    id: 4,
    type: 'Freelance Payment',
    date: '2024-01-12',
    amount: 850.0,
    icon: '💵',
  },
  {
    id: 5,
    type: 'Electric Bill',
    date: '2024-01-11',
    amount: -85.2,
    icon: '⚡',
  },
];

const SettingsTransactions = () => {
  const [monthIndex, setMonthIndex] = useState(4); // May = 4 (0-based)
  const [filter, setFilter] = useState('Transactions');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const filteredTransactions = transactionsData.filter(
    (t) => new Date(t.date).getMonth() === monthIndex
  );

  return (
    <>
      <HeaderTransaction />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 px-4 py-10">
        {/* TOP BAR */}
        <div className="max-w-7xl mx-auto mb-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            {/* Dropdown kiri */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white rounded-xl shadow px-4 py-2 border text-purple-700 font-medium focus:outline-none"
              >
                <option>Transactions</option>
                <option>Income</option>
                <option>Expenses</option>
                <option>Budget</option>
              </select>
            </div>
            {/* Spacer center title */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-3xl font-bold text-center">Settings</h1>
            </div>
            {/* Kosongkan kanan untuk center */}
            <div style={{ width: '160px' }}></div>
          </div>
          {/* Month navigation */}
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

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Transactions List */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            {filteredTransactions.length === 0 ? (
              <p className="text-gray-500 text-center">No transactions this month.</p>
            ) : (
              filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center py-4 border-b last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white text-lg">
                      {t.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{t.type}</p>
                      <p className="text-sm text-gray-500">{t.date}</p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {t.amount >= 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
                  </div>
                </div>
              ))
            )}
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
              <p className="text-green-500 mt-1">+2.5%</p>
            </div>
            {/* Total Balance */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold">Rp 125,430.82</p>
              <p className="text-green-500 mt-1">+2.5%</p>
            </div>
            {/* Savings Goal */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Savings Goal</span>
                <button className="text-purple-600 underline text-sm">Edit</button>
              </div>
              <p className="text-3xl font-bold">$35000.00</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: '72%' }}></div>
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
      <Footer />
    </>
  );
};

export default SettingsTransactions;
