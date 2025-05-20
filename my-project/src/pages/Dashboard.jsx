import axios from "axios";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Coins,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import DeleteBudgetModal from "../Components/DeleteBudget";
import DeleteTransactionModal from "../Components/DeleteTransactionModal";
import DropdownMore from "../Components/DropdownMore";
import EditBudgetModal from "../Components/EditBudgetModal";
import EditTransactionModal from "../Components/EditTransactionModal";
import { motion } from "motion/react";
import CountUp from "react-countup";
import {
  SkeletonCard,
  SkeletonCategoryItem,
  SkeletonChart,
  SkeletonTransaction,
} from "../Components/Skeleton";
// Animation variants for motion components
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};
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
  const [selectedItem, setSelectedItem] = useState(null);
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
  const navigate = useNavigate();

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
          monthlyExpensesPercent: response.data.data.expense_percentage_change,
        }));
      }

      console.log("Monthly summary data:", response.data);
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    } finally {
      setLoading((prev) => ({ ...prev, monthlySummary: false }));
    }
  };

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

  const refreshDashboardData = () => {
    // Refresh monthly summary
    getMonthlySummary();

    // Refresh income vs expenses chart
    getIncomeVsExpenses();

    // Refresh spending by category
    getSpendingByFilter();

    // Refresh total balance if needed
    getTotalBalance();

    // Refresh budget overview
    getBudgetOverview();
  };

  useEffect(() => {
    getTotalBalance();
  }, [user]);

  useEffect(() => {
    getMonthlySummary();
  }, [user]);

  useEffect(() => {
    getSavingsGoal();
  }, [user.user_id]);

  useEffect(() => {
    getIncomeVsExpenses();
  }, [selectedYear, user]);

  useEffect(() => {
    getSpendingByFilter();
  }, [filterBy, user]);

  useEffect(() => {
    getRecentTransactions();
  }, [user, filterBy, setFilterBy]);

  useEffect(() => {
    getBudgetOverview();
  }, [user, filterBy, setFilterBy]);

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

  const handleDeleteTransaction = async (id) => {
    console.log("Delete transaction:", id);
    toast.loading("Deleting Transaction...");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/transactions/${id}`
      );

      console.log("Transaction deleted successfully", response);
      setUserData((prev) => ({
        ...prev,
        recentTransactions: prev.recentTransactions.filter(
          (transaction) => transaction.transaction_id !== id
        ),
      }));

      toast.dismiss();
      toast.success("Transaction deleted successfully");

      const modal = document.getElementById("popup-modal");
      if (modal) {
        modal.classList.add("hidden");
      }

      setSelectedItem(null);
      refreshDashboardData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.dismiss();
      toast.error("Failed to delete transaction");
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  const handleEditTransaction = async (transaction, id) => {
    console.log("Edit transaction:", transaction);
    toast.loading("Editing Transaction...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/transactions/${id}`,
        transaction
      );

      console.log("Transaction edited successfully", response);
      setUserData((prev) => ({
        ...prev,
        recentTransactions: prev.recentTransactions.map((item) =>
          item.transaction_id === id ? { ...item, ...transaction } : item
        ),
      }));

      toast.dismiss();
      toast.success("Transaction edited successfully");

      const modal = document.getElementById("crud-modal");
      if (modal) {
        modal.classList.add("hidden");
      }

      setSelectedItem(null);
      refreshDashboardData();
    } catch (error) {
      console.error("Error editing transaction:", error);
      toast.dismiss();
      toast.error("Failed to edit transaction");
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  const handleDeleteBudget = async (id) => {
    console.log("Delete budget:", id);
    toast.loading("Deleting budget...");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/budgets/${id}`
      );

      console.log("budget deleted successfully", response);
      setUserData((prev) => ({
        ...prev,
        budgetOverview: prev.budgetOverview.filter(
          (budget) => budget.budget_id !== id
        ),
      }));

      toast.dismiss();
      toast.success("budget deleted successfully");

      const modal = document.getElementById("popup-modal-budget");
      if (modal) {
        modal.classList.add("hidden");
      }

      setSelectedItem(null);
      refreshDashboardData();
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.dismiss();
      toast.error("Failed to delete budget");
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  const handleEditBudget = async (budget, id) => {
    console.log("Edit budget:", budget);
    toast.loading("Editing budget...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/budgets/${id}`,
        budget
      );

      console.log("Budget edited successfully", response);
      setUserData((prev) => ({
        ...prev,
        budgetOverview: prev.budgetOverview.map((item) =>
          item.budget_id === id ? { ...item, ...budget } : item
        ),
      }));

      toast.dismiss();
      toast.success("Budget edited successfully");

      const modal = document.getElementById("crud-modal-budget");
      if (modal) {
        modal.classList.add("hidden");
      }

      setSelectedItem(null);
      refreshDashboardData();
    } catch (error) {
      console.error("Error editing budget:", error);
      toast.dismiss();
      toast.error("Failed to edit budget");
    }
  };
  return (
    <div className="">
      <DeleteTransactionModal
        item={selectedItem}
        handleDelete={handleDeleteTransaction}
      />
      <EditTransactionModal
        item={selectedItem}
        handleSave={handleEditTransaction}
        setSelectedItem={setSelectedItem}
      />
      <EditBudgetModal
        item={selectedItem}
        handleSave={handleEditBudget}
        setSelectedItem={setSelectedItem}
      />
      <DeleteBudgetModal
        item={selectedItem}
        handleDelete={handleDeleteBudget}
        setSelectedItem={setSelectedItem}
      />
      {/* Dashboard Content */}
      <motion.div
        className="px-4 sm:px-6 md:px-10 py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-3"
          variants={itemVariants}
        >
          Dashboard
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0"
          variants={itemVariants}
        >
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
            </div>{" "}
            <motion.button
              onClick={() => navigate("/set-budget")}
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded"
              whileHover={{ scale: 1.05, backgroundColor: "#4F46E5" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">Set Budget </span>
              <div className="ml-1 w-5 h-5 flex justify-center items-center">
                <Coins />
              </div>
            </motion.button>
            <motion.button
              onClick={() => navigate("/add-transaction")}
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded"
              whileHover={{ scale: 1.05, backgroundColor: "#4F46E5" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">Add Transaction</span>
              <div className="ml-1 w-5 h-5 flex justify-center items-center">
                <Plus />
              </div>
            </motion.button>
          </div>
        </motion.div>
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Total Balance */}
          {loading.balance ? (
            <SkeletonCard />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-xs text-gray-500 mb-1">Total Balance</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp{" "}
                <CountUp
                  end={userData.totalBalance}
                  separator=","
                  duration={1}
                />
              </h4>
            </motion.div>
          )}

          {/* Monthly Income */}
          {loading.monthlySummary ? (
            <SkeletonCard />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-xs text-gray-500 mb-1">Monthly Income</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp{" "}
                <CountUp
                  end={userData.monthlyIncome}
                  separator=","
                  duration={1}
                />
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
            </motion.div>
          )}

          {/* Monthly Expenses */}
          {loading.monthlySummary ? (
            <SkeletonCard />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-xs text-gray-500 mb-1">Monthly Expenses</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp{" "}
                <CountUp
                  end={userData.monthlyExpenses}
                  separator=","
                  duration={1}
                />
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
            </motion.div>
          )}

          {/* Savings Goal Card */}
          {loading.savingsGoal ? (
            <SkeletonCard />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <p className="text-xs text-gray-500 mb-1">Savings Goal</p>
              <h4 className="text-xl font-semibold mb-1">
                Rp{" "}
                <CountUp
                  end={userData?.savingsGoal[0]?.current_amount || 0}
                  separator=","
                  duration={1}
                />
              </h4>
              <motion.div
                className="mt-1 w-full bg-gray-200 rounded-full h-2"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${goalsPercent}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${goalsPercent}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </motion.div>
              <div className="flex justify-between text-xs mt-1">
                <span>{goalsPercent.toFixed(2)}% achieved</span>
                <span>{savingsGoalDaysLeft} days left</span>
              </div>
            </motion.div>
          )}
        </motion.div>{" "}
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Income vs Expenses Chart */}
          {loading.incomeVsExpenses ? (
            <SkeletonChart />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={chartVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                <h4 className="font-medium">Income vs Expenses</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <motion.div
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs">Income</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-xs">Expenses</span>
                  </motion.div>
                </div>
              </div>
              <div className="relative h-64">
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={userData?.incomeVsExpenses}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    animationDuration={1000}
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
                <motion.button
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSelectedYear(selectedYear - 1)}
                  whileHover={{ scale: 1.2, color: "#4F46E5" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={30} />
                </motion.button>
                <motion.button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSelectedYear(selectedYear + 1)}
                  whileHover={{ scale: 1.2, color: "#4F46E5" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={30} />
                </motion.button>
                <motion.span
                  className="absolute bottom-0 left-1/2 text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={selectedYear}
                >
                  {selectedYear}
                </motion.span>
              </div>
            </motion.div>
          )}{" "}
          {/* Spending by Category */}
          {loading.spendingByFilter ? (
            <SkeletonChart />
          ) : (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm"
              variants={chartVariants}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h4 className="font-medium mb-4" variants={itemVariants}>
                Spending by Category
              </motion.h4>
              <motion.div
                className="flex flex-col gap-3 max-h-64 overflow-y-auto"
                variants={containerVariants}
              >
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
                      <motion.div
                        key={index}
                        className="flex items-center justify-between"
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                index % 3 === 0
                                  ? "#6366F1"
                                  : index % 3 === 1
                                  ? "#8B5CF6"
                                  : "#EC4899",
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: index * 0.05 + 0.2,
                              type: "spring",
                            }}
                          ></motion.div>
                          <span className="text-sm">{item?.category_name}</span>
                        </div>
                        <motion.span
                          className="text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                        >
                          Rp {formatCurrency(item?.amount)}
                        </motion.span>
                      </motion.div>
                    ))}
                    <motion.div
                      className="border-t mt-2 pt-2"
                      variants={itemVariants}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Total Expenses:
                        </span>
                        <span className="text-sm font-medium">
                          Rp {formatCurrency(totalSpending)}
                        </span>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.p
                    className="text-sm text-gray-500"
                    variants={itemVariants}
                  >
                    No spending data available
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Recent Transactions</h4>
              <a
                href="/settings-transactions"
                className="text-xs text-indigo-600"
              >
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
                userData?.recentTransactions?.slice(0, 5).map((transaction) => (
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
                        transaction.transaction_type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      } flex`}
                    >
                      {transaction.transaction_type === "income" ? "+" : "-"}
                      Rp {formatCurrency(transaction.amount)}
                      <div
                        onClick={() => {
                          setSelectedItem(transaction);
                          console.log("Selected transaction:", transaction);
                        }}
                      >
                        <DropdownMore
                          id={transaction?.transaction_id}
                          item={selectedItem}
                        />
                      </div>
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
              <a href="/settings-budget" className="text-xs text-indigo-600">
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
                                budget.percentage_used >= 75
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${budget?.percentage_used}%`,
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
                    <button
                      className="ml-2"
                      onClick={() => {
                        setSelectedItem(budget);
                        console.log("Selected budget:", budget);
                      }}
                    >
                      <DropdownMore
                        id={budget?.budget_id}
                        item={selectedItem}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
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
