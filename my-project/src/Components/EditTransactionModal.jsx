import axios from "axios";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

function EditTransactionModal({ item, handleSave, setSelectedItem }) {
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [categoryOptions, setCategoryOptions] = useState({
    income: [],
    expense: [],
  });

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

        setCategoryOptions({
          income: incomeCategories,
          expense: expenseCategories,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, [item]);

  const handleClose = () => {
    const modal = document.getElementById("crud-modal");
    if (modal) {
      modal.classList.add("hidden");
    }
    setSelectedItem(null);
  };

  const formattedDate = (date) => {
    if (!date) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (item) {
      setTransactionType(item?.transaction_type);
      setAmount(item?.amount);
      setCategory(item?.category_id);
      setDate(formattedDate(item?.date));
      setNote(item?.note);
    }
  }, [item]);
  const handleSaveTransaction = () => {
    const updatedTransaction = {
      transactionType: transactionType,
      amount: amount,
      categoryId: category,
      date: date,
      note: note,
    };

    console.log("Saving transaction with category_id:", category);
    console.log("Full updated transaction:", updatedTransaction);

    handleSave(updatedTransaction, item?.transaction_id);
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              Edit Transaction
            </h1>

            {/* Transaction Type Selector */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
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
                Mark as Income
              </button>
            </div>

            {/* Form Fields */}
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
                  onClick={handleClose}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTransaction}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionModal;
