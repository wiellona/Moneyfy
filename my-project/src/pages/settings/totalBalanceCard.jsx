import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import CountUp from "react-countup";

const TotalBalanceCard = () => {
  const { user } = useContext(UserContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTotalBalance = async () => {
    if (!user || !user.user_id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/account/user/total/${user.user_id}`
      );
      if (response.status === 200) {
        setTotalBalance(response.data.payload.totalBalance);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching total balance:", err);
      setError("Failed to load total balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalBalance();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500">Total Balance</span>
        <span className="text-sm text-gray-500">Auto-calculated</span>
      </div>
      {loading ? (
        <div className="animate-pulse h-7 w-48 bg-gray-200 rounded"></div>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-2xl font-bold">
          Rp{" "}
          <CountUp end={totalBalance} separator="," decimals={2} duration={1} />
        </p>
      )}
      <div className="mt-2 text-xs text-gray-500">
        Total balance is the sum of your monthly balance and claimed savings. It
        cannot be edited directly.
      </div>
    </div>
  );
};

export default TotalBalanceCard;
