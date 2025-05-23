import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SetBalanceModal = ({
  isOpen,
  onClose,
  onSave,
  currentBalance = 0,
  month,
  year,
}) => {
  const [newBalance, setNewBalance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize the form when the modal opens with the current balance
  useEffect(() => {
    if (isOpen) {
      setNewBalance(currentBalance);
      setError("");
    }
  }, [isOpen, currentBalance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newBalance) {
      setError("Please enter a balance amount");
      return;
    }

    const balanceValue = parseInt(newBalance, 10);
    if (isNaN(balanceValue) || balanceValue < 0) {
      setError("Please enter a valid balance amount");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call the onSave function with the new balance value
      await onSave(balanceValue);
      toast.success("Balance updated successfully");

      // Modal will close via onSave callback
    } catch (error) {
      console.error("Error saving balance:", error);
      setError(error.response?.data?.message || "Failed to save balance");
      toast.error("Failed to save balance");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentMonthName = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Balance for {currentMonthName} {year}
        </h2>

        <div className="mb-6 w-full">
          <p className="text-gray-600 mb-1">Current Balance</p>
          <p className="text-2xl font-bold">
            Rp{new Intl.NumberFormat("id-ID").format(currentBalance)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="newBalance" className="text-gray-600 mb-1 block">
              New Balance
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">Rp</span>
              </div>
              <input
                type="text"
                id="newBalance"
                value={
                  typeof newBalance === "number"
                    ? new Intl.NumberFormat("id-ID").format(newBalance)
                    : newBalance
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNewBalance(value ? parseInt(value, 10) : "");
                }}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
                required
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-400"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none disabled:text-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600 flex items-start gap-2 w-full">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAA0lJREFUSEu1lV1oHGUUhp8zs2napA3WUkFb9ULwpy1IG1GvFGqwrLupRPJtpRfBZNaSgPbKSosI0QtBxSuhtmlmYgW12dlQTXcWFYoipai0QRAbmgpKtVREa0WaNtnsHJ2Srbub3dUKmbuZc3jO+53vnXOERXxkEdk0hD/a1X9TrGnuSVF9BFgH3AryK+gZVf1MbCsTjA5P1hNYEz44OGh9deqnAVF9BWhrcDoV1b3WLHvGx70/q/MWwLc8sePmmF08BDwEFIEhhWNgnWrl4ukZ2taEwj2q3Ac8A9wIfK+hpvJj3onyAhXwePzZZmv55eOgm4ApCYvJ3NjbZ+opT2wfWElh5n2QLcBvMTvc+OGhkR9L+RXwpEm/puiuSAlNS9qD9976vZQYN72rbbXXz0l4/iPfO136boyxp1kRzBc4GvhuxwL4fDvOAjGxwvbc6MhEueJEt2MQMiBu4A+ny2NdXT2rZmNN0cWuRnRzkPE+jeLXlCdS6RdRfRlhf5Bx+6tb0Wl6Hy5ivwRhkPe916vjCZMeAN0Lmg18z1TCjfM1cK+G4YP5sZEvr9f/W7f2rSg2ywWQQgt/3OD7/uw/yo0zEwED310KaDW8Xs8rWmecL4AHrNDacGTswLdX4Z2dO1rCpcVLwPnAd2+ppbpRz0v5SeO8q7AdSAa+G5SUS8I4kaenA99d/n/hCeN8ADwuSkcu6x4tb0vkz7VCYW3Of+fcggtr4JZSbsI43wF3qGXdlR89MHUN/lgqfVBUe1Tpz2fd/dcLT2xzNhDyDXA28N3bK9wS7+6LWyJ54IefV9p3nhwaKvxXn0d5CdPng3SjvBpk3d0V8OglaZwJhY2IvhFkvOfK4XHTu84WO6UaTgS+N14eS5p0t6I+cGUO1nzsuxdqwe9X+BxoFtGBXMbb929+j5v0ZguNirWq8nQ+6w7XnC1Xj5fq60CtcdBlKAcLxabnPzm875fqIsaYZdO0vQDsASxUdwZZ783yvJrzPLmtd5OG1pG/x23k+WK0HECmUCZBbxORuxXWA0tALquET+UzXqZaQN1NNP87R8uip87CuILqYZG5XbWsu6DntfobbaWTk+fataitpbgisy1y8UQ0PxrdyaIu6L8AoLplJ159jXoAAAAASUVORK5CYII="
            alt="info"
            className="w-6 h-6 mt-0.5"
          />
          <p>
            This will update your monthly balance for {currentMonthName} {year}.
            Make sure to double check the amount before saving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetBalanceModal;
