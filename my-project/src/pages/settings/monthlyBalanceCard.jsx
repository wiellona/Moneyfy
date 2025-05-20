import React from "react";

const MonthlyBalanceCard = ({ onEditClick, balance }) => (
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
      Rp {Number(balance).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
    </p>
    <div className="flex items-center justify-start mt-1 gap-1 text-green-500">
      <span>▲</span>
      <span>+2.5%</span>
    </div>
  </div>
);

export default MonthlyBalanceCard;
