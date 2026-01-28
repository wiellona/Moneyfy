import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";

// Import components from settings folder
import MonthlyBalanceCard from "./settings/monthlyBalanceCard";
import TotalBalanceCard from "./settings/totalBalanceCard";
import SavingsGoalCard from "./settings/savingsGoalCard";
import SetBalanceModal from "./settings/SetBalanceModal";
import SetSavingsGoalModal from "./settings/SetSavingsGoalModal";
import DropdownMore from "../Components/DropdownMore";
import { SkeletonTransaction } from "../Components/Skeleton";
import DeleteTransactionModal from "../Components/DeleteTransactionModal";
import EditTransactionModal from "../Components/EditTransactionModal";
import DeleteBudgetModal from "../Components/DeleteBudget";
import EditBudgetModal from "../Components/EditBudgetModal";
import toast from "react-hot-toast";

// Utility functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount || 0));
};

const Settings = () => {
  const { user } = useContext(UserContext);
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [isSavingsGoalModalOpen, setIsSavingsGoalModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [loadingGoal, setLoadingGoal] = useState(true);
  const [budgetsData, setBudgetsData] = useState([]);
  const [loadingBudgets, setLoadingBudgets] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const [userData, setUserData] = useState({
    recentTransactions: [],
    budgetOverview: [],
    savingsGoal: [],
  });

  // Unified state for filter, month, and year
  const [filter, setFilter] = useState("Transactions"); // Default to Transactions view
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  // Function to refresh data after modifications
  const refreshData = () => {
    const month = monthIndex + 1; // Refresh transactions if needed
    if (filter !== "Budget") {
      setLoadingTransactions(true);

      let endpoint;

      // Use the proper endpoint for filtered transactions
      if (filter === "Income" || filter === "Expenses") {
        // Use the type-specific endpoint
        const transactionType = filter === "Income" ? "income" : "expense";
        endpoint = `${import.meta.env.VITE_API_URL}/transactions/user/${
          user.user_id
        }/type/${transactionType}?month=${month}&year=${year}`;
        console.log(
          `Refreshing ${transactionType} transactions with URL:`,
          endpoint
        );
      } else {
        // Use the standard endpoint for all transactions
        endpoint = `${import.meta.env.VITE_API_URL}/transactions/user/${
          user.user_id
        }?month=${month}&year=${year}`;
        console.log("Refreshing all transactions with URL:", endpoint);
      }

      axios
        .get(endpoint)
        .then((response) => {
          if (response.data.success) {
            setTransactionsData(response.data.data || []);
          } else if (response.data.payload) {
            setTransactionsData(response.data.payload || []);
          } else {
            setTransactionsData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          toast.error("Failed to refresh transactions");
        })
        .finally(() => setLoadingTransactions(false));
    } // Refresh budgets
    setLoadingBudgets(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/budgets/user/${
          user.user_id
        }/progress?timeframe=month&month=${month}&year=${year}`
      )
      .then((response) => {
        if (response.data.success) {
          const budgets = response.data.data?.map((budget) => ({
            id: budget.budget_id,
            name: budget.category_name,
            total: budget.budget_amount || budget.amount,
            spent: budget.spent_amount || 0,
            remaining:
              (budget.budget_amount || budget.amount) -
              (budget.spent_amount || 0),
            icon: budget.category_icon,
            category_id: budget.category_id,
            percentage_used:
              (budget.budget_amount || budget.amount) > 0
                ? Math.round(
                    ((budget.spent_amount || 0) /
                      (budget.budget_amount || budget.amount)) *
                      100
                  )
                : 0,
            start_date: budget.start_date,
            end_date: budget.end_date,
          }));
          setBudgetsData(budgets || []);
        } else if (response.data.payload) {
          const budgets = response.data.payload?.map((budget) => ({
            id: budget.budget_id,
            name: budget.category_name,
            total: budget.budget_amount || budget.amount,
            spent: budget.spent_amount || 0,
            remaining:
              (budget.budget_amount || budget.amount) -
              (budget.spent_amount || 0),
            icon: budget.category_icon,
            category_id: budget.category_id,
            percentage_used:
              (budget.budget_amount || budget.amount) > 0
                ? Math.round(
                    ((budget.spent_amount || 0) /
                      (budget.budget_amount || budget.amount)) *
                      100
                  )
                : 0,
            start_date: budget.start_date,
            end_date: budget.end_date,
          }));
          setBudgetsData(budgets || []);
        } else {
          setBudgetsData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setBudgetsData([]);
      })
      .finally(() => setLoadingBudgets(false));
  };

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
      refreshData();
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
      // Format the transaction data for the API
      const formattedTransaction = {
        transaction_type: transaction.transaction_type,
        amount: transaction.amount,
        category_id: transaction.category_id,
        date: transaction.date,
        note: transaction.note,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/transactions/${id}`,
        formattedTransaction
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
      refreshData();
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
      refreshData();
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
      // Format budget data for the API
      const formattedBudget = {
        amount: budget.amount,
        category_id: budget.categoryId,
        start_date: budget.startDate,
        end_date: budget.endDate,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/budgets/${id}`,
        formattedBudget
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
      refreshData();
    } catch (error) {
      console.error("Error editing budget:", error);
      toast.dismiss();
      toast.error("Failed to edit budget");
    }
  };

  // Month names array
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

  // Handler for month navigation
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
  // Fetch savings goal for the selected month & year
  useEffect(() => {
    if (!user?.user_id) return;

    setLoadingGoal(true);
    const month = monthIndex + 1;
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${
          user.user_id
        }?month=${month}&year=${year}`
      )
      .then((res) => {
        console.log("Savings goal response:", res.data);

        if (res.data.success && res.data.data) {
          setSavingsGoal(
            Array.isArray(res.data.data) ? res.data.data[0] : res.data.data
          );
        } else if (res.data.payload) {
          setSavingsGoal(
            Array.isArray(res.data.payload)
              ? res.data.payload[0]
              : res.data.payload
          );
        } else {
          setSavingsGoal(null);
        }
      })

      .catch((err) => {
        console.error("Error fetching savings goal:", err);
        setSavingsGoal(null);
      })
      .finally(() => setLoadingGoal(false));
  }, [user, monthIndex, year]); // Fetch budgets data for the selected timeframe
  useEffect(() => {
    if (!user?.user_id) return;

    setLoadingBudgets(true);
    const month = monthIndex + 1;

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/budgets/user/${
          user.user_id
        }/progress?timeframe=month&month=${month}&year=${year}`
      )
      .then((response) => {
        if (response.data.success) {
          const budgets = response.data.data?.map((budget) => ({
            id: budget.budget_id,
            name: budget.category_name,
            total: budget.budget_amount || budget.amount,
            spent: budget.spent_amount || 0,
            remaining:
              (budget.budget_amount || budget.amount) -
              (budget.spent_amount || 0),
            icon: budget.category_icon,
            category_id: budget.category_id,
            percentage_used:
              (budget.budget_amount || budget.amount) > 0
                ? Math.round(
                    ((budget.spent_amount || 0) /
                      (budget.budget_amount || budget.amount)) *
                      100
                  )
                : 0,
            start_date: budget.start_date,
            end_date: budget.end_date,
          }));
          setBudgetsData(budgets || []);
        } else if (response.data.payload) {
          const budgets = response.data.payload?.map((budget) => ({
            id: budget.budget_id,
            name: budget.category_name,
            total: budget.budget_amount || budget.amount,
            spent: budget.spent_amount || 0,
            remaining:
              (budget.budget_amount || budget.amount) -
              (budget.spent_amount || 0),
            icon: budget.category_icon,
            category_id: budget.category_id,
            percentage_used:
              (budget.budget_amount || budget.amount) > 0
                ? Math.round(
                    ((budget.spent_amount || 0) /
                      (budget.budget_amount || budget.amount)) *
                      100
                  )
                : 0,
            start_date: budget.start_date,
            end_date: budget.end_date,
          }));
          setBudgetsData(budgets || []);
        } else {
          setBudgetsData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setBudgetsData([]);
      })
      .finally(() => setLoadingBudgets(false));
  }, [user, monthIndex, year]); // Fetch transactions data based on filter, month, and year
  useEffect(() => {
    if (!user?.user_id) return;

    setLoadingTransactions(true);
    const month = monthIndex + 1; // Reset transactions data if filter is Budget
    if (filter === "Budget") {
      setTransactionsData([]);
      setLoadingTransactions(false);
      return;
    }

    let endpoint;

    // Use the proper endpoint for filtered transactions
    if (filter === "Income" || filter === "Expenses") {
      // Use the type-specific endpoint
      const transactionType = filter === "Income" ? "income" : "expense";
      endpoint = `${import.meta.env.VITE_API_URL}/transactions/user/${
        user.user_id
      }/type/${transactionType}?month=${month}&year=${year}`;
      console.log(
        `Fetching ${transactionType} transactions with URL:`,
        endpoint
      );
    } else {
      // Use the standard endpoint for all transactions
      endpoint = `${import.meta.env.VITE_API_URL}/transactions/user/${
        user.user_id
      }?month=${month}&year=${year}`;
      console.log("Fetching all transactions with URL:", endpoint);
    }

    axios
      .get(endpoint)
      .then((response) => {
        console.log("Transactions response:", response.data);
        if (response.data.success) {
          setTransactionsData(response.data.data || []);
        } else if (response.data.payload) {
          setTransactionsData(response.data.payload || []);
        } else {
          setTransactionsData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setTransactionsData([]);
      })
      .finally(() => setLoadingTransactions(false));
  }, [user, monthIndex, year, filter]); // Fetch current month's balance
  useEffect(() => {
    if (!user?.user_id) return;

    const fetchMonthlyBalance = async () => {
      try {
        // Get all the user's accounts
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}`
        );

        // Get accounts from response
        const accounts = response.data.success
          ? response.data.data
          : response.data.payload;

        if (accounts && accounts.length > 0) {
          // Calculate total balance from all accounts
          const totalBalance = accounts.reduce(
            (sum, account) => sum + (account.balance || 0),
            0
          );

          setCurrentBalance(totalBalance);
        } else {
          setCurrentBalance(0);
        }
      } catch (error) {
        console.error("Error fetching accounts balance:", error);
        toast.error("Failed to load monthly balance");
        setCurrentBalance(0);
      }
    };

    fetchMonthlyBalance();
  }, [user, monthIndex, year]);
  // Modal handlers
  const handleOpenSavingsGoalModal = () => setIsSavingsGoalModalOpen(true);
  const handleCloseSavingsGoalModal = () => setIsSavingsGoalModalOpen(false);
  const handleOpenBalanceModal = () => setIsBalanceModalOpen(true);
  const handleCloseBalanceModal = () => setIsBalanceModalOpen(false);

  // API handlers
  const handleSaveSavingsGoal = async ({ targetAmount, endDate }) => {
    if (!user?.user_id) return;

    try {
      const month = monthIndex + 1;
      let payload = {
        user_id: user.user_id,
        target_amount: targetAmount,
        end_date: endDate,
        month,
        year,
      };

      let response;

      // If we already have a savings goal, update it
      if (savingsGoal?.goal_id) {
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/saving-goals/${savingsGoal.goal_id}`,
          payload
        );
      } else {
        // Otherwise create a new one
        payload = {
          ...payload,
          title: "Main Savings Goal",
          current_amount: 0,
          start_date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
        };

        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/saving-goals`,
          payload
        );
      }

      if (response.data.success && response.data.data) {
        setSavingsGoal(response.data.data);
      } else if (response.data.payload) {
        setSavingsGoal(response.data.payload);
      }
      handleCloseSavingsGoalModal();
      toast.success("Savings goal saved successfully");
    } catch (err) {
      console.error("Error saving goal:", err);
      toast.error("Failed to save savings goal. Please try again.");
    }
  };
  const handleClaimSavings = async () => {
    if (!user?.user_id || !savingsGoal?.goal_id) return;

    try {
      // Store the current amount before claiming
      const claimedAmount = savingsGoal.current_amount || 0;

      try {
        // Claim the savings
        await axios.post(
          `${import.meta.env.VITE_API_URL}/saving-goals/${
            savingsGoal.goal_id
          }/claim`
        );

        // Now, update the account balance by adding the claimed amount
        // First, get all accounts
        const accountsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}`
        );

        const accounts = accountsResponse.data.success
          ? accountsResponse.data.data
          : accountsResponse.data.payload;

        if (accounts && accounts.length > 0) {
          // Update the first account with the new balance
          const mainAccount = accounts[0];
          const newBalance = (mainAccount.balance || 0) + claimedAmount;

          await axios.put(
            `${import.meta.env.VITE_API_URL}/account/${mainAccount.account_id}`,
            {
              balance: newBalance,
            }
          );

          // Update the local state with the new balance
          setCurrentBalance(newBalance);
        } else {
          // No accounts found, create one
          await axios.post(`${import.meta.env.VITE_API_URL}/account`, {
            user_id: user.user_id,
            name: "Main Account",
            balance: claimedAmount,
            type: "cash",
          });

          // Update the local state with the new balance
          setCurrentBalance(claimedAmount);
        }

        toast.success("Savings claimed and added to your balance successfully");
      } catch (claimError) {
        // If the /claim endpoint fails, fall back to updating the goal
        await axios.put(
          `${import.meta.env.VITE_API_URL}/saving-goals/${savingsGoal.goal_id}`,
          {
            current_amount: 0, // Reset the current amount to 0
          }
        );
        toast.success("Savings reset successfully");
      }

      // Refresh savings goal
      const month = monthIndex + 1;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${
          user.user_id
        }?month=${month}&year=${year}`
      );

      // Handle different response formats
      if (response.data.success && response.data.data) {
        setSavingsGoal(
          Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data
        );
      } else if (response.data.payload) {
        setSavingsGoal(
          Array.isArray(response.data.payload)
            ? response.data.payload[0]
            : response.data.payload
        );
      } else {
        setSavingsGoal(null);
      }
    } catch (err) {
      console.error("Error claiming savings:", err);
      toast.error("Failed to claim savings. Please try again.");
    }
  };
  const handleSaveBalance = async (newBalance) => {
    if (!user?.user_id) return;

    try {
      // Use a number value for balance
      const balanceValue = parseFloat(newBalance);

      if (isNaN(balanceValue)) {
        throw new Error("Invalid balance value");
      }

      // First get the user's accounts
      const accountsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}`
      );

      const accounts = accountsResponse.data.success
        ? accountsResponse.data.data
        : accountsResponse.data.payload;

      if (!accounts || accounts.length === 0) {
        // No accounts found, let's create one
        const newAccount = await axios.post(
          `${import.meta.env.VITE_API_URL}/account`,
          {
            user_id: user.user_id,
            name: "Main Account",
            balance: balanceValue,
            type: "cash",
          }
        );

        toast.success("New account created with the specified balance");
        setCurrentBalance(balanceValue);
      } else {
        // Update the first account with the new balance
        const mainAccount = accounts[0];
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/account/${mainAccount.account_id}`,
          {
            balance: balanceValue,
          }
        );

        if (response.status === 200 || response.status === 201) {
          // Update local state with the new balance
          setCurrentBalance(balanceValue);
          toast.success("Monthly balance updated successfully");
        } else {
          toast.error("Failed to update balance. Please try again.");
        }
      }

      handleCloseBalanceModal();
    } catch (err) {
      console.error("Error saving balance:", err);
      toast.error("Failed to save balance. Please try again.");
    }
  };
  // Render the different content based on filter selection
  const renderMainContent = () => {
    if (filter === "Budget") {
      return (
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
            <div className="flex flex-col gap-4">
              {budgetsData.map((budget) => (
                <div
                  key={budget.id || budget.budget_id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                      {budget.icon ? (
                        <img
                          src={budget.icon}
                          alt={budget.name}
                          className="w-5 h-5"
                        />
                      ) : (
                        <span>
                          {(budget.name || budget.category_name)?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between">
                        <p className="text-sm font-medium">
                          {budget.name || budget.category_name}
                        </p>
                        {(budget.remaining || 0) < 0 ? (
                          <p className="text-xs text-red-500 font-bold">
                            OVER BUDGET🫵🏻😠
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">
                            Remaining: Rp{" "}
                            {formatCurrency(
                              budget.remaining ||
                                (budget.total || budget.amount) -
                                  (budget.spent || budget.spent_amount) ||
                                0
                            )}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Time:{" "}
                          {budget.start_date && budget.end_date
                            ? formatDate(budget.start_date) +
                              " - " +
                              formatDate(budget.end_date)
                            : "N/A"}
                        </p>
                      </div>{" "}
                      <div className="mt-1 relative">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              (budget.percentage_used ||
                                Math.round(
                                  ((budget.spent || budget.spent_amount || 0) /
                                    (budget.total || budget.amount || 1)) *
                                    100
                                )) >= 100
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                budget.percentage_used ||
                                  Math.round(
                                    ((budget.spent ||
                                      budget.spent_amount ||
                                      0) /
                                      (budget.total || budget.amount || 1)) *
                                      100
                                  )
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Rp{" "}
                          {formatCurrency(
                            budget.spent || budget.spent_amount || 0
                          )}{" "}
                          of Rp{" "}
                          {formatCurrency(budget.total || budget.amount || 0)}
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <button
                    className="ml-2"
                    onClick={() => {
                      // Ensure the budget object has the expected properties for EditBudgetModal
                      const budgetWithId = {
                        ...budget,
                        budget_id: budget.id || budget.budget_id,
                        budget_amount: budget.total || budget.amount || 0,
                      };
                      setSelectedItem(budgetWithId);
                      console.log("Selected budget:", budgetWithId);
                    }}
                  >
                    {" "}
                    <DropdownMore
                      id={budget?.id || budget?.budget_id}
                      item={{
                        ...budget,
                        budget_id: budget.id || budget.budget_id,
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (
      filter === "Transactions" ||
      filter === "Income" ||
      filter === "Expenses"
    ) {
      // For transactions, income, and expenses we use the same UI but with filtered data
      const titleMap = {
        Transactions: "Recent Transactions",
        Income: "Income Transactions",
        Expenses: "Expense Transactions",
      };

      return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">{titleMap[filter]}</h2>

          <div className="flex flex-col gap-4">
            {loadingTransactions ? (
              <>
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
              </>
            ) : transactionsData.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No {filter.toLowerCase()} found for this month
              </p>
            ) : (
              transactionsData.map((transaction) => (
                <div
                  key={transaction.id || transaction.transaction_id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600 text-white">
                      {transaction.category_icon ? (
                        <img
                          src={transaction.category_icon}
                          alt={transaction.category_name || "Category"}
                          className="w-5 h-5"
                        />
                      ) : (
                        <span className="text-sm">
                          {transaction.icon || "💲"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.description ||
                          transaction.name ||
                          transaction.category_name ||
                          transaction.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(
                          transaction.date || transaction.transaction_date
                        )}
                      </p>
                    </div>
                  </div>{" "}
                  <span
                    className={`text-sm font-medium ${
                      transaction.transaction_type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    } flex items-center`}
                  >
                    {transaction.transaction_type === "expense" ? "-" : "+"}
                    Rp {formatCurrency(transaction.amount)}
                    <div
                      onClick={() => {
                        setSelectedItem(transaction);
                        console.log("Selected transaction:", transaction);
                      }}
                    >
                      <DropdownMore
                        id={transaction?.transaction_id || transaction?.id}
                        item={transaction}
                      />
                    </div>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      );
    } else {
      // Fallback for any other filter options
      return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">{filter} List</h2>
          <p className="text-center text-gray-500 py-8">
            {filter} view is not yet implemented
          </p>
        </div>
      );
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
              {" "}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex items-center gap-2 bg-white px-2 py-2 rounded text-indigo-700 shadow"
              >
                <option value="Transactions">Transactions</option>
                <option value="Budget">Budget</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
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
            {" "}
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
          {/* Dynamic main content based on filter */}
          {renderMainContent()}

          {/* Summary Panel (stays the same regardless of filter) */}
          <div className="space-y-6">
            {" "}
            <MonthlyBalanceCard
              onEditClick={handleOpenBalanceModal}
              balance={currentBalance}
              month={monthIndex + 1}
              year={year}
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
              targetAmount={savingsGoal?.target_amount || 0}
            />
          </div>
        </div>
      </div>{" "}
      <SetBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={handleCloseBalanceModal}
        onSave={handleSaveBalance}
        currentBalance={currentBalance}
        month={monthIndex + 1}
        year={year}
      />{" "}
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
        month={monthIndex + 1}
        year={year}
      />
      <DeleteTransactionModal
        item={selectedItem}
        handleDelete={handleDeleteTransaction}
      />
      <EditTransactionModal
        item={selectedItem}
        handleSave={handleEditTransaction}
        setSelectedItem={setSelectedItem}
      />
      <DeleteBudgetModal
        item={selectedItem}
        handleDelete={handleDeleteBudget}
        setSelectedItem={setSelectedItem}
      />
      <EditBudgetModal
        item={selectedItem}
        handleSave={handleEditBudget}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
};

export default Settings;
