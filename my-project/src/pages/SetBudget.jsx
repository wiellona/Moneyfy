import axios from "axios";
import { Calendar } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const SetBudget = () => {
  // State untuk form
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Mendapatkan user ID dari context
  const { user } = useContext(UserContext);
  const userId = user?.user_id;

  const handleSaveBudget = async () => {
    const budgetData = {
      userId: userId,
      amount: amount,
      categoryId: category,
      startDate: startDate,
      endDate: endDate,
    };

    toast.loading("Editing budget...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/budgets`,
        budgetData
      );

      console.log("Budget edited successfully", response);
      // setUserData((prev) => ({
      //   ...prev,
      //   budgetOverview: prev.budgetOverview.map((item) =>
      //     item.budget_id === id ? { ...item, ...budget } : item
      //   ),
      // }));

      toast.dismiss();
      toast.success("Budget established");

      const modal = document.getElementById("crud-modal-budget");
      if (modal) {
        modal.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error editing budget:", error);
      toast.dismiss();
      toast.error("Failed to edit budget");
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );

        const categories = response.data.data;
        console.log("Categories Budget:", categories);

        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, []);

  const formattedDate = (date) => {
    if (!date) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ amount, category, startDate, endDate });
    // Handle budget submission logic here
  };

  // Fetch kategori saat komponen dimuat
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );

        const categories = response.data.data;
        console.log("Categories Budget:", categories);

        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <div className="max-w-md mx-auto pb-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Set Budget</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categoryOptions?.map((option) => (
                  <option key={option?.category_id} value={option?.category_id}>
                    {option.name}
                  </option>
                ))}
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
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
              // onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBudget}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetBudget;
