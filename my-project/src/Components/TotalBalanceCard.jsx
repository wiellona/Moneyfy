import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import SetBalanceModal from "../pages/settings/SetBalanceModal";

const TotalBalanceCard = () => {
  const { user } = useContext(UserContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleSaveBalance = async (newBalance) => {
    if (!user || !user.user_id) {
      setError("User not logged in");
      return;
    }
    try {
      setLoading(true);
      // Assuming API to update total balance exists at /account/user/total/:userId
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/account/user/total/${user.user_id}`,
        { totalBalance: Number(newBalance) }
      );
      if (response.status === 200) {
        setTotalBalance(Number(newBalance));
        setShowModal(false);
        setError(null);
      }
    } catch (err) {
      console.error("Error updating total balance:", err);
      setError("Failed to update total balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500">Total Balance</span>
        <button
          onClick={() => setShowModal(true)}
          className="text-purple-600 underline text-sm focus:outline-none"
          type="button"
          disabled={loading}
        >
          Edit
        </button>
      </div>
      {loading ? (
        <div className="animate-pulse h-7 w-48 bg-gray-200 rounded"></div>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-2xl font-bold">
          Rp{" "}
          {Number(totalBalance).toLocaleString("id-ID", {
            minimumFractionDigits: 2,
          })}
        </p>
      )}
      {showModal && (
        <SetBalanceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveBalance}
          currentBalance={totalBalance}
        />
      )}
    </div>
  );
};

export default TotalBalanceCard;
