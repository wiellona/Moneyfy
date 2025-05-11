import React from 'react';
import Header from './Header';  // Mengimpor Header terlebih dahulu
import LandingPage from './LandingPage';  // Mengimpor komponen LandingPage
import LoginPage from './LoginPage';  // Mengimpor komponen LoginPage
import AboutMoneyFy from './AboutMoneyFy';  // Mengimpor AboutMoneyFy
import LoginPageStyle from './LoginPageStyle';  // Mengimpor styling dari LoginPageStyle

function App() {
  return (
    <div className="App">
      {/* Menampilkan Header terlebih dahulu */}
      <Header />

      {/* Menampilkan LoginPage setelah Header */}
      <LoginPage />

      {/* Menampilkan Landing Page */}
      <LandingPage />

      {/* Menampilkan AboutMoneyFy setelah LandingPage */}
      <AboutMoneyFy />

      {/* Menambahkan styling dari LoginPageStyle */}
      <LoginPageStyle />
    </div>
  );
}

export default App;
