import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function BudgetPlanner() {
  const [selectedMonth, setSelectedMonth] = useState("January");

  // Budget data
  const budgetData = {
    totalBudget: 3150,
    monthlyIncome: 5000,
    categories: [
      {
        name: "Groceries",
        spent: 220,
        budget: 500,
        color: "#8b5cf6",
        percentSpent: 44,
      },
      {
        name: "Rent",
        spent: 1500,
        budget: 1500,
        color: "#10b981",
        percentSpent: 100,
      },
      {
        name: "Transportation",
        spent: 250,
        budget: 300,
        color: "#f59e0b",
        percentSpent: 83,
      },
      {
        name: "Entertainment",
        spent: 180,
        budget: 200,
        color: "#ef4444",
        percentSpent: 90,
      },
      {
        name: "Shopping",
        spent: 350,
        budget: 400,
        color: "#ec4899",
        percentSpent: 88,
      },
      {
        name: "Utilities",
        spent: 220,
        budget: 250,
        color: "#6366f1",
        percentSpent: 88,
      },
    ],
    savingsGoal: {
      target: 10000,
      achieved: 75,
    },
  };

  const remainingToBudget = budgetData.monthlyIncome - budgetData.totalBudget;

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    alert(`Would load budget data for ${e.target.value}`);
  };

  const handleAddBudget = () => {
    alert("Add Budget functionality would open a modal here.");
  };

  return (
    <div>
      <div className=" min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Budget Planning
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Track and manage your monthly budgets
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-sm"
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <button
                onClick={handleAddBudget}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium"
              >
                Add Budget
              </button>
            </div>
          </header>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Budget Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold">Budget Overview</h2>
                <span className="text-sm font-medium">
                  Total Budget: ${budgetData.totalBudget.toLocaleString()}
                </span>
              </div>

              <div className="space-y-4">
                {budgetData.categories.map((category, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        ${category.spent} / ${category.budget}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {category.percentSpent}% spent
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${category.percentSpent}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Budget Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold mb-4">Budget Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Income:</span>
                    <span>${budgetData.monthlyIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Total Budgeted:</span>
                    <span>${budgetData.totalBudget.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm font-medium pt-3 border-t border-gray-100 mt-2">
                    <span>Remaining to Budget:</span>
                    <span className="text-green-600">
                      ${remainingToBudget.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold mb-4">
                  Category Breakdown
                </h2>
                <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-400 text-lg rounded-lg">
                  400 × 300
                </div>
              </div>

              {/* Savings Goal */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold mb-4">Savings Goal</h2>
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    Target: ${budgetData.savingsGoal.target.toLocaleString()}
                  </span>
                  <span>{budgetData.savingsGoal.achieved}% achieved</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${budgetData.savingsGoal.achieved}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Spending Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold mb-4">
              Monthly Spending Trend
            </h2>
            <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-400 text-lg rounded-lg">
              800 × 300
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
