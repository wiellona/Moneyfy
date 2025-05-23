import React from "react";

const SavingsGoalCard = ({
  onEditClick,
  onClaimClick,
  goal,
  progress,
  daysLeft,
  hideClaimButton,
  targetAmount,
}) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-500">Savings Goal</span>
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="text-purple-600 underline text-sm"
          type="button"
        >
          Edit
        </button>
      )}
    </div>
    <p className="text-2xl font-bold">
      Rp {Number(goal).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
      <span className="text-sm text-gray-500 ml-2">
        / Rp{" "}
        {Number(targetAmount).toLocaleString("id-ID", {
          minimumFractionDigits: 2,
        })}
      </span>
    </p>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
      <div
        className="bg-purple-600 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-2 text-gray-600 text-sm">
      <span>{Math.min(100, Math.round(progress))}% achieved</span>
      <span>{daysLeft} days left</span>
    </div>
    <div className="mt-3 text-xs text-gray-500">
      When you make "saving" type transactions, the amount is added to your
      savings goal.
    </div>
    {!hideClaimButton && (
      <div>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-purple-700"
          onClick={onClaimClick}
          type="button"
          disabled={goal <= 0}
        >
          Claim Savings
        </button>
        {goal > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            Clicking this button will add Rp{" "}
            {Number(goal).toLocaleString("id-ID")} to your total balance and
            reset your savings goal.
          </div>
        )}
      </div>
    )}{" "}
  </div>
);

export default SavingsGoalCard;
