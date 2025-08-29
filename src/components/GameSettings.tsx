import React, { useState } from 'react';
import { Save, RefreshCw, AlertTriangle, Clock, DollarSign, Percent } from 'lucide-react';

const GameSettings: React.FC = () => {
  const [activeGame, setActiveGame] = useState('lottery');
  
  const [lotterySettings, setLotterySettings] = useState({
    ticketPrice: 5,
    maxTickets: 1000,
    drawInterval: 24,
    commission: 10,
    minPrize: 10000,
    autoStart: true
  });

  const [bigSmallSettings, setBigSmallSettings] = useState({
    roundDuration: 180,
    betWindow: 150,
    minBet: 1,
    maxBet: 500,
    commission: 5,
    autoStart: true
  });

  const [colorSettings, setColorSettings] = useState({
    roundDuration: 300,
    betWindow: 240,
    redPayout: 2.8,
    bluePayout: 2.8,
    greenPayout: 2.8,
    yellowPayout: 3.5,
    commission: 8,
    autoStart: true
  });

  const gameTypes = [
    { id: 'lottery', name: 'Lottery Games', icon: '🎫' },
    { id: 'bigsmall', name: 'Big & Small', icon: '🎲' },
    { id: 'color', name: 'Color Prediction', icon: '🌈' }
  ];

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  const renderLotterySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Price ($)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={lotterySettings.ticketPrice}
              onChange={(e) => setLotterySettings({...lotterySettings, ticketPrice: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tickets Per Draw
          </label>
          <input
            type="number"
            value={lotterySettings.maxTickets}
            onChange={(e) => setLotterySettings({...lotterySettings, maxTickets: Number(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Draw Interval (hours)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={lotterySettings.drawInterval}
              onChange={(e) => setLotterySettings({...lotterySettings, drawInterval: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            House Commission (%)
          </label>
          <div className="relative">
            <Percent className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={lotterySettings.commission}
              onChange={(e) => setLotterySettings({...lotterySettings, commission: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="autoStart"
          checked={lotterySettings.autoStart}
          onChange={(e) => setLotterySettings({...lotterySettings, autoStart: e.target.checked})}
          className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
        />
        <label htmlFor="autoStart" className="text-sm font-medium text-gray-700">
          Auto-start next draw after completion
        </label>
      </div>
    </div>
  );

  const renderBigSmallSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Round Duration (seconds)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={bigSmallSettings.roundDuration}
              onChange={(e) => setBigSmallSettings({...bigSmallSettings, roundDuration: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Betting Window (seconds)
          </label>
          <input
            type="number"
            value={bigSmallSettings.betWindow}
            onChange={(e) => setBigSmallSettings({...bigSmallSettings, betWindow: Number(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Bet ($)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={bigSmallSettings.minBet}
              onChange={(e) => setBigSmallSettings({...bigSmallSettings, minBet: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Bet ($)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={bigSmallSettings.maxBet}
              onChange={(e) => setBigSmallSettings({...bigSmallSettings, maxBet: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderColorSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Round Duration (seconds)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={colorSettings.roundDuration}
              onChange={(e) => setColorSettings({...colorSettings, roundDuration: Number(e.target.value)})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Betting Window (seconds)
          </label>
          <input
            type="number"
            value={colorSettings.betWindow}
            onChange={(e) => setColorSettings({...colorSettings, betWindow: Number(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Payouts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <span className="font-medium text-red-800">Red</span>
            <input
              type="number"
              step="0.1"
              value={colorSettings.redPayout}
              onChange={(e) => setColorSettings({...colorSettings, redPayout: Number(e.target.value)})}
              className="ml-auto w-20 px-2 py-1 border border-red-300 rounded text-sm focus:ring-2 focus:ring-red-500"
            />
            <span className="text-red-700">x</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-blue-800">Blue</span>
            <input
              type="number"
              step="0.1"
              value={colorSettings.bluePayout}
              onChange={(e) => setColorSettings({...colorSettings, bluePayout: Number(e.target.value)})}
              className="ml-auto w-20 px-2 py-1 border border-blue-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-blue-700">x</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <span className="font-medium text-green-800">Green</span>
            <input
              type="number"
              step="0.1"
              value={colorSettings.greenPayout}
              onChange={(e) => setColorSettings({...colorSettings, greenPayout: Number(e.target.value)})}
              className="ml-auto w-20 px-2 py-1 border border-green-300 rounded text-sm focus:ring-2 focus:ring-green-500"
            />
            <span className="text-green-700">x</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            <span className="font-medium text-yellow-800">Yellow</span>
            <input
              type="number"
              step="0.1"
              value={colorSettings.yellowPayout}
              onChange={(e) => setColorSettings({...colorSettings, yellowPayout: Number(e.target.value)})}
              className="ml-auto w-20 px-2 py-1 border border-yellow-300 rounded text-sm focus:ring-2 focus:ring-yellow-500"
            />
            <span className="text-yellow-700">x</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => {
    switch (activeGame) {
      case 'lottery':
        return renderLotterySettings();
      case 'bigsmall':
        return renderBigSmallSettings();
      case 'color':
        return renderColorSettings();
      default:
        return renderLotterySettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Game Settings</h1>
        <div className="flex space-x-3">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button 
            onClick={handleSaveSettings}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Game Type Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Game Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gameTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveGame(type.id)}
              className={`p-4 border-2 rounded-xl transition-all ${
                activeGame === type.id
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-semibold">{type.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800">
            Important: Changes to game settings will affect all future games. Active games will continue with current settings.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {gameTypes.find(type => type.id === activeGame)?.name} Settings
        </h2>
        
        {renderSettings()}

        {/* Common Settings */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Commission (%)
              </label>
              <div className="relative">
                <Percent className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={
                    activeGame === 'lottery' ? lotterySettings.commission :
                    activeGame === 'bigsmall' ? bigSmallSettings.commission :
                    colorSettings.commission
                  }
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (activeGame === 'lottery') {
                      setLotterySettings({...lotterySettings, commission: value});
                    } else if (activeGame === 'bigsmall') {
                      setBigSmallSettings({...bigSmallSettings, commission: value});
                    } else {
                      setColorSettings({...colorSettings, commission: value});
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-7">
              <input
                type="checkbox"
                id="autoStartGame"
                checked={
                  activeGame === 'lottery' ? lotterySettings.autoStart :
                  activeGame === 'bigsmall' ? bigSmallSettings.autoStart :
                  colorSettings.autoStart
                }
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (activeGame === 'lottery') {
                    setLotterySettings({...lotterySettings, autoStart: checked});
                  } else if (activeGame === 'bigsmall') {
                    setBigSmallSettings({...bigSmallSettings, autoStart: checked});
                  } else {
                    setColorSettings({...colorSettings, autoStart: checked});
                  }
                }}
                className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
              />
              <label htmlFor="autoStartGame" className="text-sm font-medium text-gray-700">
                Auto-start games
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Game Status Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Game Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Lottery Games</h4>
            <p className="text-sm text-green-600 mt-1">2 active games running</p>
            <p className="text-xs text-green-500 mt-2">Next draw: 2 hours 15 minutes</p>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">Big & Small</h4>
            <p className="text-sm text-blue-600 mt-1">1 active game running</p>
            <p className="text-xs text-blue-500 mt-2">Next round: 45 seconds</p>
          </div>
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800">Color Prediction</h4>
            <p className="text-sm text-purple-600 mt-1">2 active games running</p>
            <p className="text-xs text-purple-500 mt-2">Next round: 1 minute 30 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;