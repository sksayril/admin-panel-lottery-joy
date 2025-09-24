import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import MainLayout from './components/MainLayout';
import MasterController from './components/MasterController';

// Placeholder components for routes that don't have a component yet
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <p className="text-gray-600 mt-2">{title} management panel coming soon...</p>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          ) : (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="administration" element={<Placeholder title="Administration" />} />
              <Route path="master/:activeSection" element={<MasterController />} />
              <Route path="master" element={<Navigate to="/master/manage-master" replace />} />
              <Route path="game-master" element={<Placeholder title="Game Master" />} />
              <Route path="super-stockist" element={<Placeholder title="Super Stockist" />} />
              <Route path="stockist" element={<Placeholder title="Stockist" />} />
              <Route path="sub-stockist" element={<Placeholder title="Sub Stockist" />} />
              <Route path="retailer" element={<Placeholder title="Retailer" />} />
              <Route path="users" element={<Users />} />
              <Route path="agents" element={<Agents />} />
              <Route path="games" element={<Games onGameSelect={() => {}} onSettingsClick={() => {}} gameType="all" />} />
              <Route path="settings" element={<GameSettings />} />
              <Route path="lottery-games" element={<Games onGameSelect={() => {}} onSettingsClick={() => {}} gameType="lottery" />} />
              <Route path="lottery-games/:gameId" element={<LotteryGame onBack={() => {}} />} />
              <Route path="lottery-settings" element={<LotterySettings onBack={() => {}} />} />
              <Route path="bigsmall-games" element={<Games onGameSelect={() => {}} onSettingsClick={() => {}} gameType="bigsmall" />} />
              <Route path="bigsmall-games/:gameId" element={<BigSmallGame onBack={() => {}} />} />
              <Route path="bigsmall-settings" element={<BigSmallSettings onBack={() => {}} />} />
              <Route path="color-games" element={<Games onGameSelect={() => {}} onSettingsClick={() => {}} gameType="color" />} />
              <Route path="color-games/:gameId" element={<ColorGame onBack={() => {}} />} />
              <Route path="color-settings" element={<ColorSettings onBack={() => {}} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </Router>
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
    </>
  );
}

export default App;