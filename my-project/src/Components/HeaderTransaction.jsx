import React from 'react';

const HeaderTransaction = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          MoneyFy
        </div>
        
        {/* Menu Tengah */}
        <div className="flex-1 flex justify-center">
          <nav>
            <ul className="flex gap-8 text-sm font-medium">
              <li>
                <a href="/#about" className="text-gray-700 hover:text-purple-600">About us</a>
              </li>
              <li>
                <a href="/" className="text-gray-700 hover:text-purple-600">Our Features</a>
              </li>
              <li>
                <a href="#footer" className="text-gray-700 hover:text-purple-600">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Menu Kanan */}
        <div className="flex gap-6 items-center">
          <a href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Dashboard</a>
          <a href="/settings-transactions" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Settings</a>
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-medium text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderTransaction;
