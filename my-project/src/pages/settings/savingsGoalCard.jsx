import React from "react";

const SavingsGoalCard = ({
  onEditClick,
  onClaimClick,
  goal,
  progress,
  daysLeft,
}) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-500">Savings Goal</span>
      <button
        onClick={onEditClick}
        className="text-purple-600 underline text-sm"
        type="button"
      >
        Edit
      </button>
    </div>
    <p className="text-2xl font-bold">
      Rp {Number(goal).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
    </p>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
      <div
        className="bg-purple-600 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-2 text-gray-600 text-sm">
      <span>{progress}% achieved</span>
      <span>{daysLeft} days left</span>
    </div>
    <button
      className="bg-purple-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-purple-700"
      onClick={onClaimClick}
      type="button"
    >
      Claim Savings
    </button>
  </div>
);

export default SavingsGoalCard;
