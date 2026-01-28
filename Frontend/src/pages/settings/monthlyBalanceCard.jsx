import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import CountUp from "react-countup";

const MonthlyBalanceCard = ({ onEditClick, balance, month, year }) => {
  const { user } = useContext(UserContext);
  const [monthlyBalance, setMonthlyBalance] = useState(0);
  const [balanceChange, setBalanceChange] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.user_id) return;
    const fetchBalances = async () => {
      setLoading(true);
      const m = month ?? new Date().getMonth() + 1;
      const y = year ?? new Date().getFullYear();
      const prevM = m === 1 ? 12 : m - 1;
      const prevY = m === 1 ? y - 1 : y;

      try {
        const [currRes, prevRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}/monthly-balance?month=${m}&year=${y}`,
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/account/user/${user.user_id}/monthly-balance?month=${prevM}&year=${prevY}`,
          ),
        ]);

        const curr = currRes.data.payload?.monthly_balance ?? 0;
        const prev = prevRes.data.payload?.monthly_balance ?? 0;
        setMonthlyBalance(curr);

        const deltaPct = prev === 0 ? 0 : ((curr - prev) / prev) * 100;
        setBalanceChange(deltaPct);
      } catch (error) {
        console.error("Error fetching monthly balance:", error);
        setMonthlyBalance(0);
        setBalanceChange(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [user, month, year]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500">Monthly Balance</span>
        {/* <button
          onClick={onEditClick}
          className="text-purple-600 underline text-sm focus:outline-none"
          type="button"
        >
          Edit
        </button> */}
      </div>
      <p className="text-2xl font-bold">
        Rp{" "}
        <CountUp end={monthlyBalance} separator="," decimals={2} duration={1} />
      </p>
      {!loading && (
        <div
          className={`flex items-center justify-start mt-1 gap-1 ${
            balanceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="text-xs text-gray-500">
            Monthly Balance is the difference between your income and expenses
            for the selected month based on your budgets.
          </span>
        </div>
      )}
    </div>
  );
};

export default MonthlyBalanceCard;
