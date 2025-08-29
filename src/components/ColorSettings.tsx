import React, { useState } from 'react';
import { Save, Clock, DollarSign, Users, Settings, AlertTriangle, ArrowLeft, Percent, Zap, Hand, Palette } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ColorSettingsProps {
  onBack?: () => void;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    gameName: 'Color Prediction',
    defaultRoundDuration: 45,
    autoStartRounds: true,
    maintenanceMode: false,
    winningMode: 'automated' as 'automated' | 'manual',
    redWinningPercentage: 40,
    greenWinningPercentage: 40,
    violetWinningPercentage: 20,
    redMultiplier: 2,
    greenMultiplier: 14,
    violetMultiplier: 4.5,
    globalMinBet: 1,
    globalMaxBet: 1000,
    maxPlayersPerRoom: 100,
    houseCommission: 5,
    autoCreateRooms: true,
    maxActiveRooms: 10,
    roomTimeout: 300
  });

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'winning', label: '% Winning Logic', icon: Percent },
    { id: 'multipliers', label: 'Multipliers', icon: Palette },
    { id: 'rooms', label: 'Room Management', icon: Users },
    { id: 'limits', label: '$ Betting Limits', icon: DollarSign }
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Color Prediction settings saved successfully!');
    } catch (error) {
      toast.error('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Game Name
          </label>
          <input
            type="text"
            value={settings.gameName}
            onChange={(e) => handleInputChange('gameName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Round Duration (seconds)
          </label>
          <input
            type="number"
            value={settings.defaultRoundDuration}
            onChange={(e) => handleInputChange('defaultRoundDuration', parseInt(e.target.value))}
            min="10"
            max="300"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Auto Start Rounds</h4>
            <p className="text-sm text-gray-500">Automatically start new rounds when previous round ends</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoStartRounds}
              onChange={(e) => handleInputChange('autoStartRounds', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
            <p className="text-sm text-gray-500">Temporarily disable the game for maintenance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Winning Mode
          </label>
          <select
            value={settings.winningMode}
            onChange={(e) => handleInputChange('winningMode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="automated">Automated (Random)</option>
            <option value="manual">Manual (Admin Control)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderWinningLogic = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Winning Percentage Configuration</h4>
        <p className="text-sm text-blue-700">
          Set the probability of each color winning. Total should equal 100%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-red-700 mb-2">
            Red Winning Percentage (%)
          </label>
          <input
            type="number"
            value={settings.redWinningPercentage}
            onChange={(e) => handleInputChange('redWinningPercentage', parseInt(e.target.value))}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <p className="text-xs text-red-600 mt-1">Current: {settings.redWinningPercentage}%</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-green-700 mb-2">
            Green Winning Percentage (%)
          </label>
          <input
            type="number"
            value={settings.greenWinningPercentage}
            onChange={(e) => handleInputChange('greenWinningPercentage', parseInt(e.target.value))}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-green-600 mt-1">Current: {settings.greenWinningPercentage}%</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-purple-700 mb-2">
            Violet Winning Percentage (%)
          </label>
          <input
            type="number"
            value={settings.violetWinningPercentage}
            onChange={(e) => handleInputChange('violetWinningPercentage', parseInt(e.target.value))}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-purple-600 mt-1">Current: {settings.violetWinningPercentage}%</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total Percentage:</span>
          <span className={`text-lg font-bold ${
            settings.redWinningPercentage + settings.greenWinningPercentage + settings.violetWinningPercentage === 100 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {settings.redWinningPercentage + settings.greenWinningPercentage + settings.violetWinningPercentage}%
          </span>
        </div>
        {settings.redWinningPercentage + settings.greenWinningPercentage + settings.violetWinningPercentage !== 100 && (
          <p className="text-sm text-red-600 mt-2">⚠️ Total percentage must equal 100%</p>
        )}
      </div>
    </div>
  );

  const renderMultipliers = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Multiplier Configuration</h4>
        <p className="text-sm text-yellow-700">
          Set the payout multiplier for each color. Higher multipliers mean bigger payouts but lower winning chances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-red-700 mb-2">
            Red Multiplier (x)
          </label>
          <input
            type="number"
            value={settings.redMultiplier}
            onChange={(e) => handleInputChange('redMultiplier', parseFloat(e.target.value))}
            min="1"
            max="100"
            step="0.1"
            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <p className="text-xs text-red-600 mt-1">Payout: {settings.redMultiplier}x bet amount</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-green-700 mb-2">
            Green Multiplier (x)
          </label>
          <input
            type="number"
            value={settings.greenMultiplier}
            onChange={(e) => handleInputChange('greenMultiplier', parseFloat(e.target.value))}
            min="1"
            max="100"
            step="0.1"
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-green-600 mt-1">Payout: {settings.greenMultiplier}x bet amount</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-purple-700 mb-2">
            Violet Multiplier (x)
          </label>
          <input
            type="number"
            value={settings.violetMultiplier}
            onChange={(e) => handleInputChange('violetMultiplier', parseFloat(e.target.value))}
            min="1"
            max="100"
            step="0.1"
            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-purple-600 mt-1">Payout: {settings.violetMultiplier}x bet amount</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          House Commission (%)
        </label>
        <input
          type="number"
          value={settings.houseCommission}
          onChange={(e) => handleInputChange('houseCommission', parseFloat(e.target.value))}
          min="0"
          max="20"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">Percentage taken by the house from winnings</p>
      </div>
    </div>
  );

  const renderRoomManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Players Per Room
          </label>
          <input
            type="number"
            value={settings.maxPlayersPerRoom}
            onChange={(e) => handleInputChange('maxPlayersPerRoom', parseInt(e.target.value))}
            min="1"
            max="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Active Rooms
          </label>
          <input
            type="number"
            value={settings.maxActiveRooms}
            onChange={(e) => handleInputChange('maxActiveRooms', parseInt(e.target.value))}
            min="1"
            max="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Auto Create Rooms</h4>
          <p className="text-sm text-gray-500">Automatically create new rooms when all existing rooms are full</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoCreateRooms}
            onChange={(e) => handleInputChange('autoCreateRooms', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Timeout (seconds)
        </label>
        <input
          type="number"
          value={settings.roomTimeout}
          onChange={(e) => handleInputChange('roomTimeout', parseInt(e.target.value))}
          min="60"
          max="3600"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-600 mt-1">Time before an empty room is automatically closed</p>
      </div>
    </div>
  );

  const renderBettingLimits = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Global Betting Limits</h4>
        <p className="text-sm text-green-700">
          Set the minimum and maximum bet amounts that apply to all players across all rooms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Minimum Bet ($)
          </label>
          <input
            type="number"
            value={settings.globalMinBet}
            onChange={(e) => handleInputChange('globalMinBet', parseFloat(e.target.value))}
            min="0.01"
            max="100"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Maximum Bet ($)
          </label>
          <input
            type="number"
            value={settings.globalMaxBet}
            onChange={(e) => handleInputChange('globalMaxBet', parseFloat(e.target.value))}
            min="1"
            max="10000"
            step="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Betting Range Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Minimum Bet:</span>
            <span className="font-medium">${settings.globalMinBet}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Maximum Bet:</span>
            <span className="font-medium">${settings.globalMaxBet}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Betting Range:</span>
            <span className="font-medium">${settings.globalMaxBet - settings.globalMinBet}</span>
          </div>
        </div>
        {settings.globalMinBet >= settings.globalMaxBet && (
          <p className="text-sm text-red-600 mt-2">⚠️ Minimum bet must be less than maximum bet</p>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'winning':
        return renderWinningLogic();
      case 'multipliers':
        return renderMultipliers();
      case 'rooms':
        return renderRoomManagement();
      case 'limits':
        return renderBettingLimits();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to Games"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-900">Color Prediction Settings</h1>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-yellow-800">Important Notice</h3>
          <p className="text-sm text-yellow-700">
            Changes to winning percentages, multipliers, and game logic will affect all active games.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;
