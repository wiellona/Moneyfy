import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutMoneyFy from './AboutMoneyFy';
import AddTransaction from './AddTransaction';
import BudgetPlanning from './BudgetPlanner';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SetBudget from './SetBudget';
import SettingsTransactions from './Components/SettingsTransactions';
import SettingsBudget from './Components/SettingsBudget'; // <--- Tambahkan ini!
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutMoneyFy />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/budget-planning" element={<BudgetPlanning />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/set-budget" element={<SetBudget />} />
        <Route path="/settings-transactions" element={<SettingsTransactions />} />
        <Route path="/settings-budget" element={<SettingsBudget />} /> {/* <--- Ini dia */}
      </Routes>

      {/* Footer hanya dipanggil sekali di sini */}
      <Footer />
    </>
  );
}

export default App;
