import React, { useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/Dashboard/index.jsx';
import EmployeesPage from './pages/Employees/index.jsx';
import SettingsPage from './pages/Settings/index.jsx';
import StorePage from './store/index.jsx';
import FinancePage from './pages/Finance/index.jsx';
// Import other pages as well (placeholder for now or until I create them)
import AppShell from './components/layout/AppShell';
import { useAuth } from './hooks/useAuth';
import { useAppData } from './hooks/useAppData';

export default function App() {
  const { user, setUser, page, setPage, login, register, logout } = useAuth();
  const { data, setData } = useAppData();
  const [activePage, setActivePage] = useState("dashboard");

 if (page === "login") return <LoginPage onLogin={login} onNavigate={setPage} />;
  if (page === "register") return <RegisterPage onRegister={register} onNavigate={setPage} />;

  const pageProps = { data, setData, user, setUser };

  return (
    <AppShell 
      activePage={activePage} 
      setActivePage={setActivePage} 
      user={user} 
      onLogout={logout}
    >
      {activePage === "dashboard" && <DashboardPage {...pageProps} />}
      {activePage === "employees" && <EmployeesPage {...pageProps} />}
      {activePage === "settings" && <SettingsPage {...pageProps} />}
      {activePage === "store" && <StorePage {...pageProps} />}
      {activePage === "finance" && <FinancePage {...pageProps} />}
      {/* Add other page routes here */}
      {!['dashboard', 'employees', 'settings', 'store', 'finance'].includes(activePage) && (
        <div style={{ padding: 40, color: '#888' }}>
          <h2>{activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page Coming Soon</h2>
          <p>This module is currently being refactored into its own component.</p>
        </div>
      )}
    </AppShell>
  );
}
