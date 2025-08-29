import React, { useState } from 'react';
import { Save, Clock, DollarSign, Users, Settings, AlertTriangle, ArrowLeft, TrendingUp, TrendingDown, Percent, Zap, Hand } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BigSmallSettingsProps {
  onBack?: () => void;
}

interface Room {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  roundDuration: number;
  isActive: boolean;
  playerCount: number;
  totalBets: number;
  winningPercentage: {
    big: number;
    small: number;
  };
}

const BigSmallSettings: React.FC<BigSmallSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    // General Settings
    gameName: 'Big & Small',
    defaultRoundDuration: 30,
    autoStartRounds: true,
    maintenanceMode: false,
    
    // Winning Logic
    winningMode: 'automated' as 'automated' | 'manual',
    bigWinningPercentage: 50,
    smallWinningPercentage: 50,
    manualWinningNumber: 75,
    
    // Betting Limits
    globalMinBet: 1,
    globalMaxBet: 1000,
    maxPlayersPerRoom: 100,
    
    // House Edge
    houseCommission: 5,
    maxPayoutMultiplier: 2,
    
    // Room Management
    autoCreateRooms: true,
    maxActiveRooms: 10,
    roomTimeout: 300
  });

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Classic Room',
      minBet: 1,
      maxBet: 500,
      roundDuration: 30,
      isActive: true,
      playerCount: 45,
      totalBets: 1250,
      winningPercentage: { big: 48, small: 52 }
    },
    {
      id: '2',
      name: 'VIP Room',
      minBet: 10,
      maxBet: 5000,
      roundDuration: 45,
      isActive: true,
      playerCount: 12,
      totalBets: 8500,
      winningPercentage: { big: 50, small: 50 }
    },
    {
      id: '3',
      name: 'Quick Room',
      minBet: 5,
      maxBet: 200,
      roundDuration: 20,
      isActive: false,
      playerCount: 0,
      totalBets: 0,
      winningPercentage: { big: 45, small: 55 }
    }
  ]);

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'winning', label: 'Winning Logic', icon: Percent },
    { id: 'rooms', label: 'Room Management', icon: Users },
    { id: 'limits', label: 'Betting Limits', icon: DollarSign }
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Big & Small settings saved successfully!');
    } catch (error) {
      toast.error('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomToggle = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, isActive: !room.isActive } : room
    ));
    toast.success('Room status updated');
  };

  const handleWinningPercentageChange = (type: 'big' | 'small', value: number) => {
    const otherType = type === 'big' ? 'small' : 'big';
    const otherValue = 100 - value;
    
    setSettings({
      ...settings,
      bigWinningPercentage: type === 'big' ? value : otherValue,
      smallWinningPercentage: type === 'small' ? value : otherValue
    });
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
            onChange={(e) => setSettings({ ...settings, gameName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Round Duration (seconds)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.defaultRoundDuration}
              onChange={(e) => setSettings({ ...settings, defaultRoundDuration: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              value={settings.houseCommission}
              onChange={(e) => setSettings({ ...settings, houseCommission: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Payout Multiplier
          </label>
          <input
            type="number"
            value={settings.maxPayoutMultiplier}
            onChange={(e) => setSettings({ ...settings, maxPayoutMultiplier: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="autoStartRounds"
            checked={settings.autoStartRounds}
            onChange={(e) => setSettings({ ...settings, autoStartRounds: e.target.checked })}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="autoStartRounds" className="text-sm font-medium text-gray-700">
            Auto-start new rounds after completion
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
            Maintenance mode (disable all games)
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="autoCreateRooms"
            checked={settings.autoCreateRooms}
            onChange={(e) => setSettings({ ...settings, autoCreateRooms: e.target.checked })}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="autoCreateRooms" className="text-sm font-medium text-gray-700">
            Auto-create rooms when needed
          </label>
        </div>
      </div>
    </div>
  );

  const renderWinningLogic = () => (
    <div className="space-y-6">
      {/* Winning Mode Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Winning Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSettings({ ...settings, winningMode: 'automated' })}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              settings.winningMode === 'automated'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Automated</div>
                <div className="text-sm text-gray-600">Random results based on percentages</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSettings({ ...settings, winningMode: 'manual' })}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              settings.winningMode === 'manual'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Hand className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Manual</div>
                <div className="text-sm text-gray-600">Admin controls the results</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Winning Percentages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Big Winning Percentage (%)
          </label>
          <div className="relative">
            <TrendingUp className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
            <input
              type="number"
              value={settings.bigWinningPercentage}
              onChange={(e) => handleWinningPercentageChange('big', Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Numbers 51-100</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Small Winning Percentage (%)
          </label>
          <div className="relative">
            <TrendingDown className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="number"
              value={settings.smallWinningPercentage}
              onChange={(e) => handleWinningPercentageChange('small', Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Numbers 1-50</p>
        </div>
      </div>

      {/* Manual Winning Control */}
      {settings.winningMode === 'manual' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manual Winning Number (1-100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={settings.manualWinningNumber}
            onChange={(e) => setSettings({ ...settings, manualWinningNumber: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Current result: {settings.manualWinningNumber <= 50 ? 'SMALL' : 'BIG'} ({settings.manualWinningNumber})
          </p>
        </div>
      )}

      {/* Current Statistics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Current Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{settings.bigWinningPercentage}%</div>
            <div className="text-sm text-gray-600">Big Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{settings.smallWinningPercentage}%</div>
            <div className="text-sm text-gray-600">Small Wins</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoomManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Rooms</h3>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Users className="w-4 h-4 mr-2" />
          Create New Room
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{room.name}</h4>
              <button
                onClick={() => handleRoomToggle(room.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  room.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {room.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bet Range:</span>
                <span className="text-sm font-medium">₹{room.minBet} - ₹{room.maxBet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Round Duration:</span>
                <span className="text-sm font-medium">{room.roundDuration}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Players:</span>
                <span className="text-sm font-medium">{room.playerCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Bets:</span>
                <span className="text-sm font-medium">₹{room.totalBets.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Big Win %:</span>
                <span className="text-sm font-medium text-red-600">{room.winningPercentage.big}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Small Win %:</span>
                <span className="text-sm font-medium text-blue-600">{room.winningPercentage.small}%</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBettingLimits = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Minimum Bet (₹)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.globalMinBet}
              onChange={(e) => setSettings({ ...settings, globalMinBet: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Maximum Bet (₹)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.globalMaxBet}
              onChange={(e) => setSettings({ ...settings, globalMaxBet: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Players Per Room
          </label>
          <div className="relative">
            <Users className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.maxPlayersPerRoom}
              onChange={(e) => setSettings({ ...settings, maxPlayersPerRoom: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Active Rooms
          </label>
          <input
            type="number"
            value={settings.maxActiveRooms}
            onChange={(e) => setSettings({ ...settings, maxActiveRooms: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Timeout (seconds)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.roomTimeout}
              onChange={(e) => setSettings({ ...settings, roomTimeout: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'winning':
        return renderWinningLogic();
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
          <h1 className="text-3xl font-bold text-gray-900">Big & Small Settings</h1>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-yellow-800">Important Notice</h3>
          <p className="text-sm text-yellow-700">
            Changes to winning percentages and game logic will affect all active games. Please review carefully before saving.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
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
                      ? 'border-purple-500 text-purple-600'
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BigSmallSettings;
