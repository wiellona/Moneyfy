import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './Header';  // Mengimpor Header terlebih dahulu
import LandingPage from './LandingPage';  // Mengimpor komponen LandingPage
import LoginPage from './LoginPage';  // Mengimpor komponen LoginPage
import AboutMoneyFy from './AboutMoneyFy';  // Mengimpor AboutMoneyFy
import LoginPageStyle from './LoginPageStyle';
import AddTransaction from './AddTransaction';
import BudgetPlanning from './BudgetPlanner';  // Mengimpor styling dari LoginPageStyle
import Dashboard from './Dashboard';
import SetBudget from './SetBudget';

function App() {
  return (
    <>
    {/* <nav classname="bg-white text-black p-4 flex gap-4" */}
   <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/about" element={<AboutMoneyFy />} />
    <Route path="/add-transaction" element={<AddTransaction />} />
    <Route path="/budget-planning" element={<BudgetPlanning />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/set-budget" element={<SetBudget />} />
   </Routes>
    </>
        // <div className="App">
    //   {/* Menampilkan Header terlebih dahulu */}
    //   <Header />

    //   {/* Menampilkan LoginPage setelah Header */}
    //   <LoginPage />

    //   {/* Menambahkan styling dari LoginPageStyle */}
    //   <LoginPageStyle />

    //   {/* Menampilkan Landing Page */}
    //   <LandingPage />

    //   {/* Menampilkan AboutMoneyFy setelah LandingPage */}
    //   {/* <AboutMoneyFy /> */}

    //   {/* Menampilkan Dashboard setelah BudgetPlanning */}
    //   <Dashboard />  

    //   {/* Menampilkan AddTransaction setelah AboutMoneyFy */}
    //   <AddTransaction />

    //   {/* Menampilkan BudgetPlanning setelah AddTransaction */}
    //   <BudgetPlanning />

    //   {/* Menampilkan SetBudget setelah Dashboard */}
    //   <SetBudget />
    // </div>
  );
}

export default App;
