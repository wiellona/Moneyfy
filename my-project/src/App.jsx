import { Route, Routes } from "react-router-dom";

import AddTransaction from "./pages/AddTransaction";
import BudgetPlanning from "./pages/BudgetPlanner";
import Footer from "./Components/Footer";

import SettingsTransactions from "./pages/SettingsTransactions";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SetBudget from "./pages/SetBudget";
import Header from "./Components/Header";
import SettingsBudget from "./pages/SettingsBudget";
import { UserContext, UserProvider } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="bg-gradient-to-br from-white to-purple-200">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/budget-planning" element={<BudgetPlanning />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/set-budget" element={<SetBudget />} />
          <Route
            path="/settings-transactions"
            element={<SettingsTransactions />}
          />
          <Route path="/settings-budget" element={<SettingsBudget />} />{" "}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
