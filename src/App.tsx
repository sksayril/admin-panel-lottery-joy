import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Agents from './components/Agents';
import Games from './components/Games';
import GameSettings from './components/GameSettings';
import LotteryGame from './components/LotteryGame';
import LotterySettings from './components/LotterySettings';
import BigSmallGame from './components/BigSmallGame';
import BigSmallSettings from './components/BigSmallSettings';
import ColorGame from './components/ColorGame';
import ColorSettings from './components/ColorSettings';
import Login from './components/Login';

// Main App Layout Component
const AppLayout: React.FC<{ 
  isAuthenticated: boolean; 
  onLogout: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}> = ({ isAuthenticated, onLogout, sidebarCollapsed, setSidebarCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null);

  // Extract current section from URL
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path === '/games') return 'games';
    if (path.startsWith('/lottery-games')) return 'lottery-games';
    if (path.startsWith('/bigsmall-games')) return 'bigsmall-games';
    if (path.startsWith('/color-games')) return 'color-games';
    if (path.startsWith('/lottery-settings')) return 'lottery-settings';
    if (path.startsWith('/bigsmall-settings')) return 'bigsmall-settings';
    if (path.startsWith('/color-settings')) return 'color-settings';
    if (path.startsWith('/users')) return 'users';
    if (path.startsWith('/agents')) return 'agents';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const handleGameSelect = (gameId: string, gameType: string) => {
    setSelectedGameId(gameId);
    setSelectedGameType(gameType);
    navigate(`/${gameType}-games/${gameId}`);
  };

  const handleSettingsClick = (gameType: string) => {
    setSelectedGameType(gameType);
    navigate(`/${gameType}-settings`);
  };

  const handleBackFromSettings = (gameType: string) => {
    navigate(`/${gameType}-games`);
  };

  const handleBackFromGame = (gameType: string) => {
    navigate(`/${gameType}-games`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={getCurrentSection()}
        setActiveSection={(section) => {
          if (section === 'dashboard') navigate('/');
          else if (section === 'users') navigate('/users');
          else if (section === 'agents') navigate('/agents');
          else if (section === 'settings') navigate('/settings');
          else navigate(`/${section}`);
        }}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={onLogout}
      />
      
      <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/games" element={
              <Games 
                onGameSelect={handleGameSelect} 
                onSettingsClick={handleSettingsClick}
                gameType="all"
              />
            } />
            <Route path="/settings" element={<GameSettings />} />
            
            {/* Lottery Routes */}
            <Route path="/lottery-games" element={
              <Games 
                onGameSelect={handleGameSelect} 
                onSettingsClick={handleSettingsClick}
                gameType="lottery"
              />
            } />
            <Route path="/lottery-games/:gameId" element={
              <LotteryGame 
                onBack={() => handleBackFromGame('lottery')}
              />
            } />
            <Route path="/lottery-settings" element={
              <LotterySettings onBack={() => handleBackFromSettings('lottery')} />
            } />
            
            {/* Big & Small Routes */}
            <Route path="/bigsmall-games" element={
              <Games 
                onGameSelect={handleGameSelect} 
                onSettingsClick={handleSettingsClick}
                gameType="bigsmall"
              />
            } />
            <Route path="/bigsmall-games/:gameId" element={
              <BigSmallGame 
                onBack={() => handleBackFromGame('bigsmall')}
              />
            } />
            <Route path="/bigsmall-settings" element={
              <BigSmallSettings onBack={() => handleBackFromSettings('bigsmall')} />
            } />
            
            {/* Color Prediction Routes */}
            <Route path="/color-games" element={
              <Games 
                onGameSelect={handleGameSelect} 
                onSettingsClick={handleSettingsClick}
                gameType="color"
              />
            } />
            <Route path="/color-games/:gameId" element={
              <ColorGame 
                onBack={() => handleBackFromGame('color')}
              />
            } />
            <Route path="/color-settings" element={
              <ColorSettings onBack={() => handleBackFromSettings('color')} />
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <AppLayout 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
    </Router>
  );
}

export default App;