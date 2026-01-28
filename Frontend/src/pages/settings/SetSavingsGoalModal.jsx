import React, { useState, useEffect } from "react";

const SetSavingsGoalModal = ({
  isOpen,
  onClose,
  onSave,
  currentGoal = 0,
  progressPercentage = 0,
  daysLeft = 0,
  month,
  year,
}) => {
  const [targetAmount, setTargetAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Set default end date to 1 month from now when modal opens
  useEffect(() => {
    if (isOpen) {
      const defaultDate = new Date();
      defaultDate.setMonth(defaultDate.getMonth() + 1);
      setEndDate(defaultDate.toISOString().split("T")[0]);
      setTargetAmount(currentGoal > 0 ? currentGoal.toString() : "");
      setError("");
    }
  }, [isOpen, currentGoal]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (targetAmount.trim() === "") {
      setError("Please enter a target amount");
      return;
    }

    if (!endDate) {
      setError("Please select a target date");
      return;
    }

    if (parseFloat(targetAmount) <= 0) {
      setError("Target amount must be greater than zero");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await onSave({ targetAmount: parseFloat(targetAmount), endDate });
      setTargetAmount(""); // Reset form
    } catch (error) {
      console.error("Error saving savings goal:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save savings goal. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>{" "}
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {month && year
            ? `Set Savings Goal for ${new Date(
                year,
                month - 1
              ).toLocaleDateString("default", { month: "long" })} ${year}`
            : "Set Savings Goal"}
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="targetAmount" className="block text-gray-600 mb-1">
              Target Amount
            </label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
              required
            />
          </div>{" "}
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-600 mb-1">
              Target Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={new Date().toISOString().split("T")[0]} // Cannot select dates in the past
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Select the date by which you want to achieve your savings goal
            </p>
          </div>
          {currentGoal > 0 && (
            <div className="mt-6 mb-6">
              <p className="text-gray-600 mb-1">Current Monthly Target</p>
              <p className="text-2xl font-bold">
                Rp {formatCurrency(currentGoal)}
              </p>

              <div className="mt-3 relative">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{progressPercentage}% achieved</span>
                  <span>{daysLeft} days left</span>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 text-sm text-gray-600 flex items-start gap-2 mb-6 w-full">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAA0lJREFUSEu1lV1oHGUUhp8zs2napA3WUkFb9ULwpy1IG1GvFGqwrLupRPJtpRfBZNaSgPbKSosI0QtBxSuhtmlmYgW12dlQTXcWFYoipai0QRAbmgpKtVREa0WaNtnsHJ2Srbub3dUKmbuZc3jO+53vnXOERXxkEdk0hD/a1X9TrGnuSVF9BFgH3AryK+gZVf1MbCsTjA5P1hNYEz44OGh9deqnAVF9BWhrcDoV1b3WLHvGx70/q/MWwLc8sePmmF08BDwEFIEhhWNgnWrl4ukZ2taEwj2q3Ac8A9wIfK+hpvJj3onyAhXwePzZZmv55eOgm4ApCYvJ3NjbZ+opT2wfWElh5n2QLcBvMTvc+OGhkR9L+RXwpEm/puiuSAlNS9qD9976vZQYN72rbbXXz0l4/iPfO136boyxp1kRzBc4GvhuxwL4fDvOAjGxwvbc6MhEueJEt2MQMiBu4A+ny2NdXT2rZmNN0cWuRnRzkPE+jeLXlCdS6RdRfRlhf5Bx+6tb0Wl6Hy5ivwRhkPe916vjCZMeAN0Lmg18z1TCjfM1cK+G4YP5sZEvr9f/W7f2rSg2ywWQQgt/3OD7/uw/yo0zEwED310KaDW8Xs8rWmecL4AHrNDacGTswLdX4Z2dO1rCpcVLwPnAd2+ppbpRz0v5SeO8q7AdSAa+G5SUS8I4kaenA99d/n/hCeN8ADwuSkcu6x4tb0vkz7VCYW3Of+fcggtr4JZSbsI43wF3qGXdlR89MHUN/lgqfVBUe1Tpz2fd/dcLT2xzNhDyDXA28N3bK9wS7+6LWyJ54IefV9p3nhwaKvxXn0d5CdPng3SjvBpk3d0V8OglaZwJhY2IvhFkvOfK4XHTu84WO6UaTgS+N14eS5p0t6I+cGUO1nzsuxdqwe9X+BxoFtGBXMbb929+j5v0ZguNirWq8nQ+6w7XnC1Xj5fq60CtcdBlKAcLxabnPzm875fqIsaYZdO0vQDsASxUdwZZ783yvJrzPLmtd5OG1pG/x23k+WK0HECmUCZBbxORuxXWA0tALquET+UzXqZaQN1NNP87R8uip87CuILqYZG5XbWsu6DntfobbaWTk+fataitpbgisy1y8UQ0PxrdyaIu6L8AoLplJ159jXoAAAAASUVORK5CYII="
              alt="info"
              className="w-6 h-6 mt-0.5"
            />
            <p>
              Setting a realistic goal helps maintain consistent savings. You
              can adjust your goal amount at any time.
            </p>{" "}
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetSavingsGoalModal;
