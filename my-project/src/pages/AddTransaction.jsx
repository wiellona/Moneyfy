import axios from "axios";
import { ArrowDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/AuthContext";

export default function MoneyFyTransactionForm() {
  const [transactionType, setTransactionType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [categoryOptions, setCategoryOptions] = useState({
    income: [],
    expense: [],
    saving: [],
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );

        const categories = response.data.data;
        console.log("Categories:", categories);
        const expenseCategories = categories.filter(
          (category) => category.type === "expense"
        );
        const incomeCategories = categories.filter(
          (category) => category.type === "income"
        );
        const savingCategories = categories.filter(
          (category) => category.type === "saving"
        );

        setCategoryOptions({
          income: incomeCategories,
          expense: expenseCategories,
          saving: savingCategories,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, []);
  const handleSaveTransaction = async () => {
    toast.loading("Saving Transaction...");

    if (!amount || amount <= 0) {
      toast.dismiss();
      toast.error("Please enter a valid amount");
      return;
    }

    if (!category) {
      toast.dismiss();
      toast.error("Please select a category");
      return;
    }

    if (!date) {
      toast.dismiss();
      toast.error("Please select a date");
      return;
    }

    const transactionData = {
      userId: user.user_id,
      transactionType: transactionType,
      amount: parseFloat(amount),
      categoryId: category,
      date: date,
      note: note,
    };

    try {
      // First create the transaction
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        transactionData
      );

      // If it's a savings-related transaction, refresh the savings goal
      if (
        transactionType === "saving" ||
        (transactionType === "income" &&
          categoryOptions.income.find(
            (cat) =>
              cat.category_id === category &&
              cat.name.toLowerCase() === "savings"
          ))
      ) {
        await refreshSavingsGoal();
      }

      // Handle savings goal updates for both saving type and income with savings category
      if (
        transactionType === "saving" ||
        (transactionType === "income" &&
          categoryOptions.income.find(
            (cat) =>
              cat.category_id === category &&
              cat.name.toLowerCase() === "savings"
          ))
      ) {
        try {
          // First get the current savings goal
          const savingsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/saving-goals/user/${user.user_id}`
          );

          const savingsGoal = savingsResponse.data.success
            ? savingsResponse.data.data?.[0]
            : savingsResponse.data.payload?.[0];

          if (savingsGoal?.goal_id) {
            // Update the current amount of the savings goal
            const newAmount =
              (savingsGoal.current_amount || 0) + parseFloat(amount);

            await axios.put(
              `${import.meta.env.VITE_API_URL}/saving-goals/${
                savingsGoal.goal_id
              }`,
              {
                current_amount: newAmount,
              }
            );

            toast.success("Transaction saved and savings goal updated!");
          } else {
            toast.success(
              "Transaction saved successfully! Create a savings goal to track your savings."
            );
          }
        } catch (savingsError) {
          console.error("Error updating savings goal:", savingsError);
          toast.success(
            "Transaction saved, but failed to update savings goal."
          );
        }
      } else {
        toast.success("Transaction saved successfully!");
      }

      // Reset form fields
      setAmount("");
      setCategory("");
      setNote("");

      // Navigate back to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast.error("Failed to save transaction.");
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  const refreshSavingsGoal = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/saving-goals/user/${user.user_id}`
      );
      if (response.data.payload && response.data.payload.length > 0) {
        setSavingsGoal(response.data.payload[0]);
      }
    } catch (error) {
      console.error("Error refreshing savings goal:", error);
    }
  };

  return (
    <div>
      <div className="">
        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <a href="/dashboard">
              <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              Add Transaction
            </h1>{" "}
            {/* Transaction Type Selector */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg ${
                  transactionType === "expense"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setTransactionType("expense");
                  setCategory("");
                }}
              >
                <ArrowDown />
                Expense
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg ${
                  transactionType === "income"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setTransactionType("income");
                  setCategory("");
                }}
              >
                Income
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg ${
                  transactionType === "saving"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setTransactionType("saving");
                  setCategory("");
                }}
              >
                Saving
              </button>
            </div>
            {/* Form Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveTransaction();
              }}
            >
              <div className="space-y-6">
                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">Rp</span>
                    </div>
                    <input
                      type="text"
                      id="amount"
                      required
                      placeholder="0"
                      value={
                        typeof amount === "number"
                          ? new Intl.NumberFormat("id-ID").format(amount)
                          : amount
                      }
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setAmount(value ? parseInt(value, 10) : "");
                      }}
                      className="w-full pl-10 px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Category and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Category</option>
                        {transactionType === "income" && (
                          <>
                            {categoryOptions?.income.map((option) => (
                              <option
                                key={option?.category_id}
                                value={option?.category_id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </>
                        )}
                        {transactionType === "expense" && (
                          <>
                            {categoryOptions?.expense.map((option) => (
                              <option
                                key={option?.category_id}
                                value={option?.category_id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </>
                        )}
                        {transactionType === "saving" && (
                          <>
                            {categoryOptions?.saving.map((option) => (
                              <option
                                key={option?.category_id}
                                value={option?.category_id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label
                    htmlFor="note"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Note
                  </label>
                  <textarea
                    id="note"
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Save Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
