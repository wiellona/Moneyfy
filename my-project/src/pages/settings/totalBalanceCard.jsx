import React from "react";

const TotalBalanceCard = () => (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-500">Total Balance</span>
    </div>
    <p className="text-2xl font-bold">Rp 25,430.82</p>
    <div className="flex items-center justify-start mt-1 gap-1 text-green-500">
      <span>▲</span>
      <span>+2.5%</span>
    </div>
  </div>
);

export default TotalBalanceCard;
