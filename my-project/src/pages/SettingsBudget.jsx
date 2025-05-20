// filepath: c:\Wiellona\UI\Kuliah\Sem 4\SBD\Finpro\Moneyfy\my-project\src\pages\SettingsBudget.jsx
import React, { useState, useEffect, useContext } from "react";
import SavingsGoalCard from "./settings/savingsGoalCard";
import SetSavingsGoalModal from "./settings/SetSavingsGoalModal";
import MonthlyBalanceCard from "./settings/monthlyBalanceCard";
import TotalBalanceCard from "./settings/totalBalanceCard";
import SetBalanceModal from "./settings/SetBalanceModal";
import { UserContext } from "../context/AuthContext";
import axios from "axios";

const SettingsBudget = () => {
  const { user } = useContext(UserContext);
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [isSavingsGoalModalOpen, setIsSavingsGoalModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loadingGoal, setLoadingGoal] = useState(true);
  const [budgetsData, setBudgetsData] = useState([]);
  const [loadingBudgets, setLoadingBudgets] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);

  // Tambahkan state untuk filter bulan dan tahun
  const [filter, setFilter] = useState("Budget");
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Daftar nama bulan
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

  // Handler navigasi bulan/tahun
  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((prev) => prev - 1);
    } else {
      setMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((prev) => prev + 1);
    } else {
      setMonthIndex((prev) => prev + 1);
    }
  };

  // Fetch savings goal sesuai bulan & tahun
  useEffect(() => {
    if (!user?.user_id) return;
    setLoadingGoal(true);
    const month = monthIndex + 1; // 1-based
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${
          user.user_id
        }?month=${month}&year=${year}`
      )
      .then((res) => setSavingsGoal(res.data.payload[0] || null))
      .catch((err) => setSavingsGoal(null))
      .finally(() => setLoadingGoal(false));
  }, [user, monthIndex, year]);

  // Fetch budgets data by user ID, month, and year
  useEffect(() => {
    if (!user?.user_id) return;

    setLoadingBudgets(true);
    const month = monthIndex + 1; // Konversi ke 1-based untuk API

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/budgets/user/${
          user.user_id
        }?month=${month}&year=${year}`
      )
      .then((response) => {
        if (response.data.success) {
          const budgets = response.data.data.map((budget) => ({
            id: budget.budget_id,
            name: budget.category_name,
            total: budget.amount,
            spent: budget.spent_amount || 0,
            remaining: budget.amount - (budget.spent_amount || 0),
            icon: budget.category_icon || "", // Default icon jika tidak ada
            category_id: budget.category_id,
          }));
          setBudgetsData(budgets);
        } else {
          setBudgetsData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setBudgetsData([]);
      })
      .finally(() => setLoadingBudgets(false));
  }, [user, monthIndex, year]);

  // Fetch current month's balance
  useEffect(() => {
    if (!user?.user_id) return;

    const month = monthIndex + 1;
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/budgets/balance/${
          user.user_id
        }?month=${month}&year=${year}`
      )
      .then((response) => {
        if (response.data.success) {
          setCurrentBalance(response.data.data.balance || 0);
        } else {
          setCurrentBalance(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
        setCurrentBalance(0);
      });
  }, [user, monthIndex, year]);

  const handleOpenSavingsGoalModal = () => setIsSavingsGoalModalOpen(true);
  const handleCloseSavingsGoalModal = () => setIsSavingsGoalModalOpen(false);

  const handleOpenBalanceModal = () => setIsBalanceModalOpen(true);
  const handleCloseBalanceModal = () => setIsBalanceModalOpen(false);

  const handleSaveSavingsGoal = async ({ targetAmount, endDate }) => {
    if (!user?.user_id) return;
    try {
      if (savingsGoal?.goal_id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/saving-goals/${savingsGoal.goal_id}`,
          {
            target_amount: targetAmount,
            end_date: endDate,
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/saving-goals`, {
          user_id: user.user_id,
          title: "Main Savings Goal",
          target_amount: targetAmount,
          current_amount: 0,
          start_date: new Date().toISOString().slice(0, 10),
          end_date: endDate,
        });
      }
      // Fetch ulang
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${user.user_id}`
      );
      setSavingsGoal(res.data.payload[0] || null);
      setIsSavingsGoalModalOpen(false);
    } catch (err) {
      // handle error
    }
  };

  const handleClaimSavings = async () => {
    if (!user?.user_id || !savingsGoal?.goal_id) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/saving-goals/${savingsGoal.goal_id}`,
        {
          current_amount: 0,
        }
      );
      // Fetch ulang
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${user.user_id}`
      );
      setSavingsGoal(res.data.payload[0] || null);
    } catch (err) {
      // handle error
    }
  };

  const handleSaveBalance = async (newBalance) => {
    if (!user?.user_id) return;
    try {
      const month = monthIndex + 1;
      await axios.post(`${import.meta.env.VITE_API_URL}/budgets/balance`, {
        user_id: user.user_id,
        month: month,
        year: year,
        balance: parseFloat(newBalance),
      });

      // Update local state
      setCurrentBalance(parseFloat(newBalance));
      setIsBalanceModalOpen(false);
    } catch (err) {
      console.error("Error saving balance:", err);
    }
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
              {monthNames[monthIndex]} {year}
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
            <h2 className="text-xl font-semibold mb-4">Budget List</h2>

            {loadingBudgets ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : budgetsData.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No budgets found for this month
              </p>
            ) : (
              budgetsData.map((budget) => (
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
                          style={{
                            width: `${(budget.spent / budget.total) * 100}%`,
                          }}
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
                      {Math.round((budget.spent / budget.total) * 100)}% spent
                    </p>
                  </div>
                </div>
              ))
            )}
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
              goal={savingsGoal?.current_amount || 0}
              progress={
                savingsGoal
                  ? (savingsGoal.current_amount / savingsGoal.target_amount) *
                    100
                  : 0
              }
              daysLeft={
                savingsGoal
                  ? Math.max(
                      0,
                      Math.ceil(
                        (new Date(savingsGoal.end_date) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )
                  : 0
              }
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
        currentGoal={savingsGoal?.target_amount || 0}
        progressPercentage={
          savingsGoal
            ? (savingsGoal.current_amount / savingsGoal.target_amount) * 100
            : 0
        }
        daysLeft={
          savingsGoal
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(savingsGoal.end_date) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : 0
        }
      />
    </>
  );
};

export default SettingsBudget;
