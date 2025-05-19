import React, { useState } from "react";

const SetSavingsGoalModal = ({
  isOpen,
  onClose,
  onSave,
  currentGoal = 0,
  progressPercentage = 0,
  daysLeft = 0,
}) => {
  const [targetAmount, setTargetAmount] = useState("");
  const [timeframe, setTimeframe] = useState("Monthly");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (targetAmount.trim() === "") return;

    onSave({ targetAmount, timeframe });
    setTargetAmount(""); // Reset form
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
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Savings Goal This Month
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
          </div>

          <div className="mb-6">
            <label htmlFor="timeframe" className="block text-gray-600 mb-1">
              Timeframe
            </label>
            <div className="relative">
              <select
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
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
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none"
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
