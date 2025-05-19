import React, { useState } from "react";
import MonthlyBalanceCard from "./settings/monthlyBalanceCard";
import TotalBalanceCard from "./settings/totalBalanceCard";
import SavingsGoalCard from "./settings/savingsGoalCard";
import SetBalanceModal from "./settings/SetBalanceModal";
import SetSavingsGoalModal from "./settings/SetSavingsGoalModal";

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
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SettingsBudget = () => {
  const [monthIndex, setMonthIndex] = useState(4); // May
  const [filter, setFilter] = useState("Budget");
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(100000); // contoh, bisa diganti sesuai data
  const [isSavingsGoalModalOpen, setIsSavingsGoalModalOpen] = useState(false);
  const [savingsGoal, setSavingsGoal] = useState(150000);
  const [savingsProgress, setSavingsProgress] = useState(72); // dalam persen
  const [savingsDaysLeft, setSavingsDaysLeft] = useState(12);
  const [totalBalance, setTotalBalance] = useState(25430.82); // contoh, bisa diganti sesuai data

  const handlePrevMonth = () =>
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  const handleNextMonth = () =>
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  const handleOpenBalanceModal = () => setIsBalanceModalOpen(true);
  const handleCloseBalanceModal = () => setIsBalanceModalOpen(false);
  const handleSaveBalance = (newBalance) => {
    setCurrentBalance(Number(newBalance));
    setIsBalanceModalOpen(false);
  };
  const handleOpenSavingsGoalModal = () => setIsSavingsGoalModalOpen(true);
  const handleCloseSavingsGoalModal = () => setIsSavingsGoalModalOpen(false);
  const handleSaveSavingsGoal = ({ targetAmount }) => {
    setSavingsGoal(Number(targetAmount));
    setIsSavingsGoalModalOpen(false);
    // Reset progress jika goal baru
    setSavingsProgress(0);
  };
  const handleClaimSavings = () => {
    setTotalBalance((prev) => prev + savingsGoal);
    setSavingsGoal(0);
    setSavingsProgress(0);
  };

  return (
    <>
      <div className="min-h-screen px-10 py-10">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto mb-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            {/* Dropdown kiri */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
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
            <div style={{ width: "160px" }}></div>
          </div>
          {/* Month nav */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handlePrevMonth}
              className="text-xl px-4 py-2 rounded border hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="text-2xl font-semibold">
              {monthNames[monthIndex]}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-xl px-4 py-2 rounded border hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Budget List */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
            {budgetsData.map((budget) => (
              <div
                key={budget.id}
                className="flex items-center justify-between py-4 border-b last:border-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl">
                    {budget.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{budget.name}</p>
                    <p className="text-xs text-gray-500">
                      Remaining Rp{" "}
                      {budget.remaining.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
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
                    Rp{" "}
                    {budget.remaining.toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                    <span className="text-gray-400">
                      {" "}
                      of Rp{" "}
                      {budget.total.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {Math.round(budget.spent * 100)}% spent
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <MonthlyBalanceCard
              onEditClick={handleOpenBalanceModal}
              balance={currentBalance}
            />
            <TotalBalanceCard />
            <SavingsGoalCard
              onEditClick={handleOpenSavingsGoalModal}
              onClaimClick={handleClaimSavings}
              goal={savingsGoal}
              progress={savingsProgress}
              daysLeft={savingsDaysLeft}
            />
          </div>
        </div>
      </div>
      <SetBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={handleCloseBalanceModal}
        onSave={handleSaveBalance}
        currentBalance={currentBalance}
      />
      <SetSavingsGoalModal
        isOpen={isSavingsGoalModalOpen}
        onClose={handleCloseSavingsGoalModal}
        onSave={handleSaveSavingsGoal}
        currentGoal={savingsGoal}
        progressPercentage={savingsProgress}
        daysLeft={savingsDaysLeft}
      />
    </>
  );
};

export default SettingsBudget;
