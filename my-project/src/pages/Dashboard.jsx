import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Add this import
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate(); // Add this hook
  // Sample data for chart
  const chartData = [
    { name: "Jan", income: 2500, expenses: 2000 },
    { name: "Feb", income: 2800, expenses: 2300 },
    { name: "Mar", income: 3000, expenses: 2200 },
    { name: "Apr", income: 3500, expenses: 2500 },
    { name: "May", income: 3200, expenses: 2400 },
    { name: "Jun", income: 3800, expenses: 2700 },
    { name: "Jul", income: 3600, expenses: 2600 },
  ];

  // Sample data for expenses by category
  const categoryData = [
    { category: "Shopping", amount: 1400000 },
    { category: "Travel", amount: 1200000 },
    { category: "Food", amount: 1150000 },
    { category: "Groceries", amount: 850000 },
    { category: "Entertainment", amount: 500000 },
    { category: "Entertainment", amount: 500000 },
    { category: "Restaurant", amount: 500000 },
    { category: "Entertainment", amount: 500000 },
    { category: "Restaurant", amount: 450000 },
  ];

  // Sample data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      name: "Netflix Subscription",
      date: "2024-04-15",
      amount: -134500,
      icon: "N",
    },
    {
      id: 2,
      name: "Salary Deposit",
      date: "2024-04-10",
      amount: 12500000,
      icon: "S",
    },
    {
      id: 3,
      name: "Grocery Store",
      date: "2024-04-01",
      amount: -973500,
      icon: "G",
    },
    {
      id: 4,
      name: "Freelance Payment",
      date: "2024-03-25",
      amount: 8900000,
      icon: "F",
    },
    {
      id: 5,
      name: "Electric Bill",
      date: "2024-03-11",
      amount: -815000,
      icon: "E",
    },
  ];

  // Sample data for budget overview
  const budgetOverview = [
    {
      id: 1,
      category: "Coffee",
      remaining: 200000,
      total: 500000,
      percentage: 60,
    },
    {
      id: 2,
      category: "Dining",
      remaining: 300000,
      total: 800000,
      percentage: 62.5,
    },
    {
      id: 3,
      category: "Gifts",
      remaining: 150000,
      total: 300000,
      percentage: 50,
    },
    { id: 4, category: "Gifts", remaining: 0, total: 300000, percentage: 0 },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(Math.abs(amount));
  };

  // Format percentage with + or - sign
  const formatPercentage = (percentage) => {
    return percentage >= 0 ? `+${percentage}%` : `${percentage}%`;
  };

  return (
    <div className="">
      {/* Dashboard Content */}
      <div className="px-10 py-4">
        <h2 className="text-2xl font-bold mb-3">Dashboard</h2>

        {/* Greeting */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg">
            Hello, User! <span>👋</span>
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-2 bg-white px-2 py-2 rounded text-indigo-700">
                <span className="text-sm text-indigo-700">This Week</span>
                <ChevronDown size={16} />
              </button>
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
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Total Balance */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Balance</p>
            <h4 className="text-xl font-semibold mb-1">
              Rp {formatCurrency(25430820)}
            </h4>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp size={14} />
              <span>+2.5%</span>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Monthly Income</p>
            <h4 className="text-xl font-semibold mb-1">
              Rp {formatCurrency(8500000)}
            </h4>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp size={14} />
              <span>+4.2%</span>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Monthly Expenses</p>
            <h4 className="text-xl font-semibold mb-1">
              Rp {formatCurrency(3200000)}
            </h4>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDown size={14} />
              <span>-1.8%</span>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-indigo-600 text-white p-4 rounded-lg shadow-sm">
            <p className="text-xs mb-1">Budget</p>
            <h4 className="text-xl font-semibold mb-1">
              Rp {formatCurrency(35000000)}
            </h4>
            <div className="flex justify-between text-xs">
              <span>72% on budget</span>
              <span>4 days left</span>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Income vs Expenses Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Income vs Expenses</h4>
              <div className="flex items-center gap-4">
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Bar dataKey="income" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="expenses"
                    fill="#F87171"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-6">
                  <button className="text-gray-400">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs">2025</span>
                  <button className="text-gray-400">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Spending by Category */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-4">Spending by Category</h4>
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
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
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <span className="text-sm">
                    Rp {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Expenses:</span>
                  <span className="text-sm font-medium">
                    Rp {formatCurrency(6500000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions & Budget Overview */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Recent Transactions</h4>
              <a href="#" className="text-xs text-indigo-600">
                View All
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.name}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    Rp {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
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
            <div className="flex flex-col gap-4">
              {budgetOverview.map((budget) => (
                <div
                  key={budget.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                      {budget.category.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{budget.category}</p>
                        <p className="text-xs">
                          Remaining: Rp {formatCurrency(budget.remaining)}
                        </p>
                      </div>
                      <div className="mt-1 relative">
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                          <div
                            className={`h-1 rounded-full ${
                              budget.percentage >= 25
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${100 - budget.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          {budget.percentage <= 0
                            ? "No budget left!"
                            : `${budget.percentage}% left`}
                        </p>
                        <p className="text-xs text-gray-500">
                          Rp {formatCurrency(budget.remaining)}/Rp{" "}
                          {formatCurrency(budget.total)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Missing ChevronDown component - adding it here
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
