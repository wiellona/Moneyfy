import axios from "axios";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import {
  SkeletonCard,
  SkeletonCategoryItem,
  SkeletonChart,
  SkeletonTransaction,
} from "../Components/Skeleton";
import DeleteModal from "../Components/DeleteModal";
import DropdownMore from "../Components/DropdownMore";
import EditTransactionModal from "../Components/EditTransactionModal";

const Dashboard = ({ user }) => {
  const [userData, setUserData] = useState({
    name: user.name,
    user_id: user.user_id,
    email: user.email,
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyIncomePercent: 0,
    monthlyExpenses: 0,
    monthlyExpensesPercent: 0,
    incomeVsExpenses: [],
    spendingByFilter: [],
    recentTransactions: [],
    savingsGoal: [],
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterBy, setFilterBy] = useState("month");
  const [loading, setLoading] = useState({
    balance: true,
    monthlySummary: true,
    incomeVsExpenses: true,
    spendingByFilter: true,
    recentTransactions: true,
    savingsGoal: true,
    budgetOverview: true,
  });

  useEffect(() => {
    const getTotalBalance = async () => {
      setLoading((prev) => ({ ...prev, balance: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/user/total/${user.user_id}`
        );
        if (response.status === 200) {
          setUserData((prev) => ({
            ...prev,
            totalBalance: response.data.payload.totalBalance,
          }));
        }
      } catch (error) {
        console.error("Error fetching total balance:", error);
      } finally {
        setLoading((prev) => ({ ...prev, balance: false }));
      }
    };

    getTotalBalance();
  }, []);

  useEffect(() => {
    const getMonthlySummary = async () => {
      setLoading((prev) => ({ ...prev, monthlySummary: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions/summary/${
            user.user_id
          }?period=month`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            monthlyIncome: response.data.data.total_income,
            monthlyIncomePercent: response.data.data.income_percentage_change,
            monthlyExpenses: response.data.data.total_expense,
            monthlyExpensesPercent:
              response.data.data.expense_percentage_change,
          }));
        }
      } catch (error) {
        console.error("Error fetching monthly summary:", error);
      } finally {
        setLoading((prev) => ({ ...prev, monthlySummary: false }));
      }
    };

    getMonthlySummary();
  }, []);

  useEffect(() => {
    const getSavingsGoal = async () => {
      setLoading((prev) => ({ ...prev, savingsGoal: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/saving-goals/user/${user.user_id}`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            savingsGoal: response.data.payload,
          }));
        }
        console.log("Savings goal data:", response.data);
      } catch (error) {
        console.error("Error fetching savings goal:", error);
      } finally {
        setLoading((prev) => ({ ...prev, savingsGoal: false }));
      }
    };

    getSavingsGoal();
  }, []);

  useEffect(() => {
    const getIncomeVsExpenses = async () => {
      setLoading((prev) => ({ ...prev, incomeVsExpenses: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions/income-vs-expenses/${
            user.user_id
          }?year=${selectedYear}`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            incomeVsExpenses: response.data.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching income vs expenses:", error);
      } finally {
        setLoading((prev) => ({ ...prev, incomeVsExpenses: false }));
      }
    };

    getIncomeVsExpenses();
  }, [selectedYear, user]);

  useEffect(() => {
    const getSpendingByFilter = async () => {
      setLoading((prev) => ({ ...prev, spendingByFilter: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions/user/${
            user.user_id
          }/type/expense?timeframe=${filterBy}`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            spendingByFilter: response.data.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching spending by filter:", error);
      } finally {
        setLoading((prev) => ({ ...prev, spendingByFilter: false }));
      }
    };

    getSpendingByFilter();
  }, [filterBy, user]);

  useEffect(() => {
    const getRecentTransactions = async () => {
      setLoading((prev) => ({ ...prev, recentTransactions: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions/user/${
            user.user_id
          }?timeframe=${filterBy}`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            recentTransactions: response.data.data,
          }));
        }
        console.log("Recent transactions :", response.data);
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
      } finally {
        setLoading((prev) => ({ ...prev, recentTransactions: false }));
      }
    };

    getRecentTransactions();
  }, [user, filterBy, setFilterBy]);

  useEffect(() => {
    const getBudgetOverview = async () => {
      setLoading((prev) => ({ ...prev, budgetOverview: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/budgets/user/${
            user.user_id
          }/progress?timeframe=${filterBy}`
        );
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            budgetOverview: response.data.data,
          }));
        }
        console.log("Budget overview data:", response.data);
      } catch (error) {
        console.error("Error fetching budget overview:", error);
      } finally {
        setLoading((prev) => ({ ...prev, budgetOverview: false }));
      }
    };
    getBudgetOverview();
  }, [user, filterBy, setFilterBy]);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(Math.abs(amount));
  };

  // Format percentage with + or - sign
  const formatPercentage = (percentage) => {
    return percentage >= 0
      ? `+${percentage?.toFixed(2)}%`
      : `${percentage?.toFixed(2)}%`;
  };

  const filteredSpendingByCategory = userData?.spendingByFilter?.reduce(
    (acc, item) => {
      const existingItem = acc.find(
        (i) => i.category_name === item.category_name
      );

      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        acc.push({ ...item });
      }

      return acc;
    },
    []
  );

  const totalSpending = filteredSpendingByCategory?.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const goalsPercent = userData?.savingsGoal[0]?.current_amount
    ? (userData?.savingsGoal[0]?.current_amount /
        userData?.savingsGoal[0]?.target_amount) *
      100
    : 0;

  const savingsGoalDaysLeft = userData?.savingsGoal[0]?.end_date
    ? Math.ceil(
        (new Date(userData?.savingsGoal[0]?.end_date) - new Date()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="">
      <DeleteModal />
      <EditTransactionModal />
      {/* Dashboard Content */}
      <div className="px-4 sm:px-6 md:px-10 py-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">Dashboard</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <h3 className="text-lg">
            Hello, {user.name}! <span>👋</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-white px-2 py-2 rounded text-indigo-700"
                onClick={() => {
                  const dropdown = document.getElementById("timeframeDropdown");
                  dropdown.classList.toggle("hidden");
                }}
              >
                <span className="text-sm text-indigo-700">
                  {filterBy === "week" ? "This Week" : "This Month"}
                </span>
                <ChevronDown size={16} />
              </button>
              <div
                id="timeframeDropdown"
                className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md py-1 z-10 hidden"
              >
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setFilterBy("week");
                    document
                      .getElementById("timeframeDropdown")
                      .classList.add("hidden");
                  }}
                >
                  This Week
                </button>
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setFilterBy("month");
                    document
                      .getElementById("timeframeDropdown")
                      .classList.add("hidden");
                  }}
                >
                  This Month
                </button>
              </div>
            </div>
            <button
              onClick={() => navigate("/add-transaction")}
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded"
            >
              <span className="text-sm">Add Transaction</span>
              <span className="ml-1">+</span>
            </button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Balance */}
          {loading.balance ? (
            <SkeletonCard />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Total Balance</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp {formatCurrency(userData.totalBalance)}
              </h4>
            </div>
          )}

          {/* Monthly Income */}
          {loading.monthlySummary ? (
            <SkeletonCard />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Monthly Income</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp {formatCurrency(userData.monthlyIncome)}
              </h4>
              <div
                className={`flex items-center text-xs ${
                  userData.monthlyIncomePercent >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {userData.monthlyIncomePercent >= 0 ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
                <span>{formatPercentage(userData.monthlyIncomePercent)}</span>
              </div>
            </div>
          )}

          {/* Monthly Expenses */}
          {loading.monthlySummary ? (
            <SkeletonCard />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Monthly Expenses</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp {formatCurrency(userData.monthlyExpenses)}
              </h4>
              <div
                className={`flex items-center text-xs ${
                  userData.monthlyExpensesPercent >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {userData.monthlyExpensesPercent >= 0 ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
                <span>{formatPercentage(userData.monthlyExpensesPercent)}</span>
              </div>
            </div>
          )}

          {/* Savings Goal Card */}
          {loading.savingsGoal ? (
            <SkeletonCard />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Savings Goal</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp {formatCurrency(userData?.savingsGoal[0]?.current_amount)}
              </h4>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${goalsPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{goalsPercent.toFixed(2)}% achieved</span>
                <span>{savingsGoalDaysLeft} days left</span>
              </div>
            </div>
          )}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Income vs Expenses Chart */}
          {loading.incomeVsExpenses ? (
            <SkeletonChart />
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                <h4 className="font-medium">Income vs Expenses</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs">Income</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-xs">Expenses</span>
                  </div>
                </div>
              </div>
              <div className="relative h-64">
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={userData?.incomeVsExpenses}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="month_name"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Bar
                      dataKey="income"
                      fill="#6366F1"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#F87171"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSelectedYear(selectedYear - 1)}
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSelectedYear(selectedYear + 1)}
                >
                  <ChevronRight size={30} />
                </button>
                <span className="absolute bottom-0 left-1/2 text-base">
                  {selectedYear}
                </span>
              </div>
            </div>
          )}

          {/* Spending by Category */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-4">Spending by Category</h4>
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              {loading.spendingByFilter ? (
                <>
                  <SkeletonCategoryItem />
                  <SkeletonCategoryItem />
                  <SkeletonCategoryItem />
                  <SkeletonCategoryItem />
                </>
              ) : filteredSpendingByCategory?.length > 0 ? (
                <>
                  {filteredSpendingByCategory?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              index % 3 === 0
                                ? "#6366F1"
                                : index % 3 === 1
                                ? "#8B5CF6"
                                : "#EC4899",
                          }}
                        ></div>
                        <span className="text-sm">{item?.category_name}</span>
                      </div>
                      <span className="text-sm">
                        Rp {formatCurrency(item?.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Total Expenses:
                      </span>
                      <span className="text-sm font-medium">
                        Rp {formatCurrency(totalSpending)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  No spending data available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Recent Transactions</h4>
              <a href="#" className="text-xs text-indigo-600">
                View All
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {loading.recentTransactions ? (
                <>
                  <SkeletonTransaction />
                  <SkeletonTransaction />
                  <SkeletonTransaction />
                  <SkeletonTransaction />
                </>
              ) : userData?.recentTransactions?.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No recent transactions available
                </p>
              ) : (
                userData?.recentTransactions
                  ?.slice(0, 5)
                  .map((transaction, index) => (
                    <div
                      key={transaction.transaction_id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600">
                          <img
                            src={transaction.category_icon}
                            alt={transaction.category_name}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {transaction.category_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          transaction.category_type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        } flex`}
                      >
                        {transaction.category_type === "income" ? "+" : "-"}
                        Rp {formatCurrency(transaction.amount)}
                        <DropdownMore id={index} />
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
          {/* Budget Overview */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Budget Overview</h4>
              <a href="#" className="text-xs text-indigo-600">
                View All
              </a>
            </div>
            {loading.budgetOverview ? (
              <div className="flex flex-col gap-4">
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
              </div>
            ) : userData?.budgetOverview?.length === 0 ? (
              <p className="text-sm text-gray-500">
                No budget overview available
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {userData?.budgetOverview?.map((budget) => (
                  <div
                    key={budget?.budget_id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                        {budget?.category_name?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col justify-between">
                          <p className="text-sm font-medium">
                            {budget?.category_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Remaining: Rp{" "}
                            {formatCurrency(budget?.remaining_amount)}
                          </p>
                        </div>
                        <div className="mt-1 relative">
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                budget.percentage_used >= 25
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${100 - budget?.percentage_used}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            Rp {formatCurrency(budget?.spent_amount)} of Rp{" "}
                            {formatCurrency(budget?.budget_amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="ml-2">
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Missing ChevronDown component
const ChevronDown = ({ size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};
