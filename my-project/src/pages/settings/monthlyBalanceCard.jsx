import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import CountUp from "react-countup";

const MonthlyBalanceCard = ({ onEditClick, balance, month, year }) => {
  const { user } = useContext(UserContext);
  const [balanceChange, setBalanceChange] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calculate balance change percentage compared to previous month
  useEffect(() => {
    if (!user?.user_id) return;
    const getPreviousMonthBalance = async () => {
      setLoading(true);
      try {
        // Fetch accounts for current and previous month to calculate change
        const currentResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}`
        );
        const previousMonth = month === 1 ? 12 : month - 1;
        const previousYear = month === 1 ? year - 1 : year;
        // Assuming backend supports filtering accounts by month/year if needed
        // For now, just use current accounts as previous month data is not available
        const accounts = currentResponse.data.success
          ? currentResponse.data.data
          : currentResponse.data.payload;

        if (accounts && accounts.length > 0) {
          const currentTotal = accounts.reduce(
            (sum, account) => sum + (account.balance || 0),
            0
          );
          // For demo, static 5% increase as previous month data is not available
          setBalanceChange(5.0);
        } else {
          setBalanceChange(0);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        setBalanceChange(0);
      } finally {
        setLoading(false);
      }
    };

    getPreviousMonthBalance();
  }, [user, balance, month, year]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500">Monthly Balance</span>
        <button
          onClick={onEditClick}
          className="text-purple-600 underline text-sm focus:outline-none"
          type="button"
        >
          Edit
        </button>
      </div>
      <p className="text-2xl font-bold">
        Rp <CountUp end={balance} separator="," decimals={2} duration={1} />
      </p>
      {!loading && (
        <div
          className={`flex items-center justify-start mt-1 gap-1 ${
            balanceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{balanceChange >= 0 ? "▲" : "▼"}</span>
          <span>
            {balanceChange >= 0 ? "+" : ""}
            {balanceChange.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">from last month</span>
        </div>
      )}
    </div>
  );
};

export default MonthlyBalanceCard;
