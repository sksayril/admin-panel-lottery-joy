import React, { useState } from 'react';
import { Save, Clock, Calendar, Settings, AlertTriangle, DollarSign, Percent, Users, Ticket, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface LotterySettingsData {
  gameName: string;
  drawTime: string;
  drawDate: string;
  drawInterval: number;
  semOptions: number[];
  ticketPrice: number;
  maxTickets: number;
  commission: number;
  minPrize: number;
  autoStart: boolean;
  maintenanceMode: boolean;
  allowMultipleTickets: boolean;
  maxNumbersPerTicket: number;
  winningNumberRange: {
    min: number;
    max: number;
  };
}

interface LotterySettingsProps {
  onBack?: () => void;
}

const LotterySettings: React.FC<LotterySettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState<LotterySettingsData>({
    gameName: 'Daily Lottery',
    drawTime: '12:30',
    drawDate: '2025-06-30',
    drawInterval: 24,
    semOptions: [5, 10, 20, 25, 30, 40, 50],
    ticketPrice: 5,
    maxTickets: 1000,
    commission: 10,
    minPrize: 10000,
    autoStart: true,
    maintenanceMode: false,
    allowMultipleTickets: true,
    maxNumbersPerTicket: 100,
    winningNumberRange: {
      min: 1,
      max: 99999
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Lottery settings saved successfully!');
    } catch (error) {
      toast.error('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSemOptionToggle = (value: number) => {
    const newSemOptions = settings.semOptions.includes(value)
      ? settings.semOptions.filter(option => option !== value)
      : [...settings.semOptions, value].sort((a, b) => a - b);
    
    setSettings({ ...settings, semOptions: newSemOptions });
    
    if (newSemOptions.includes(value)) {
      toast.success(`${value} SEM option enabled`);
    } else {
      toast.success(`${value} SEM option disabled`);
    }
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'draw', label: 'Draw Settings', icon: Clock },
    { id: 'pricing', label: 'Pricing & Payouts', icon: DollarSign },
    { id: 'rules', label: 'Game Rules', icon: Ticket }
  ];

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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Price (₹)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.ticketPrice}
              onChange={(e) => setSettings({ ...settings, ticketPrice: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tickets Per Draw
          </label>
          <input
            type="number"
            value={settings.maxTickets}
            onChange={(e) => setSettings({ ...settings, maxTickets: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            House Commission (%)
          </label>
          <div className="relative">
            <Percent className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.commission}
              onChange={(e) => setSettings({ ...settings, commission: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="autoStart"
            checked={settings.autoStart}
            onChange={(e) => setSettings({ ...settings, autoStart: e.target.checked })}
            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <label htmlFor="autoStart" className="text-sm font-medium text-gray-700">
            Auto-start next draw after completion
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
            Maintenance mode (disable new tickets)
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="allowMultipleTickets"
            checked={settings.allowMultipleTickets}
            onChange={(e) => setSettings({ ...settings, allowMultipleTickets: e.target.checked })}
            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <label htmlFor="allowMultipleTickets" className="text-sm font-medium text-gray-700">
            Allow multiple tickets per user
          </label>
        </div>
      </div>
    </div>
  );

  const renderDrawSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Draw Date
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={settings.drawDate}
              onChange={(e) => setSettings({ ...settings, drawDate: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Draw Time
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="time"
              value={settings.drawTime}
              onChange={(e) => setSettings({ ...settings, drawTime: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Draw Interval (hours)
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.drawInterval}
              onChange={(e) => setSettings({ ...settings, drawInterval: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Prize Pool (₹)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.minPrize}
              onChange={(e) => setSettings({ ...settings, minPrize: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Draw Information</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-blue-600">Next Draw Date:</span>
              <p className="font-semibold text-blue-900">{settings.drawDate}</p>
            </div>
            <div>
              <span className="text-sm text-blue-600">Draw Time:</span>
              <p className="font-semibold text-blue-900">{settings.drawTime}</p>
            </div>
            <div>
              <span className="text-sm text-blue-600">Time Until Draw:</span>
              <p className="font-semibold text-blue-900">2 hours 15 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Price (₹)
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={settings.ticketPrice}
              onChange={(e) => setSettings({ ...settings, ticketPrice: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
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
              value={settings.commission}
              onChange={(e) => setSettings({ ...settings, commission: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Calculation</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Revenue:</span>
              <p className="font-semibold">₹5,000</p>
            </div>
            <div>
              <span className="text-gray-600">Commission ({settings.commission}%):</span>
              <p className="font-semibold">₹{(5000 * settings.commission / 100).toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-600">Prize Pool:</span>
              <p className="font-semibold text-green-600">₹{(5000 * (100 - settings.commission) / 100).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGameRules = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEM Options</h3>
        <p className="text-sm text-gray-600 mb-4">Select which SEM values are available for players:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[5, 10, 20, 25, 30, 40, 50].map((value) => (
            <button
              key={value}
              onClick={() => handleSemOptionToggle(value)}
              className={`p-4 border-2 rounded-lg transition-all duration-200 font-medium ${
                settings.semOptions.includes(value)
                  ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {settings.semOptions.includes(value) && (
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                )}
                <span>{value} SEM</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Numbers Per Ticket
          </label>
          <input
            type="number"
            value={settings.maxNumbersPerTicket}
            onChange={(e) => setSettings({ ...settings, maxNumbersPerTicket: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Winning Number Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={settings.winningNumberRange.min}
              onChange={(e) => setSettings({
                ...settings,
                winningNumberRange: { ...settings.winningNumberRange, min: Number(e.target.value) }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={settings.winningNumberRange.max}
              onChange={(e) => setSettings({
                ...settings,
                winningNumberRange: { ...settings.winningNumberRange, max: Number(e.target.value) }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Game Rules Summary</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Players can select from {settings.semOptions.length} SEM options</li>
          <li>• Maximum {settings.maxNumbersPerTicket} numbers per ticket</li>
          <li>• Winning numbers range from {settings.winningNumberRange.min} to {settings.winningNumberRange.max}</li>
          <li>• House commission: {settings.commission}%</li>
                        <li>• Minimum prize pool: ₹{settings.minPrize.toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'draw':
        return renderDrawSettings();
      case 'pricing':
        return renderPricingSettings();
      case 'rules':
        return renderGameRules();
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
          <h1 className="text-3xl font-bold text-gray-900">Lottery Game Settings</h1>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800">
            Important: Changes to lottery settings will affect all future draws. Active tickets will continue with current settings.
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
                      ? 'border-sky-500 text-sky-600'
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

      {/* Current Game Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Game Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-800">Active Tickets</h4>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">1,247</p>
            <p className="text-sm text-green-600 mt-1">Total sold</p>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">Players</h4>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">892</p>
            <p className="text-sm text-blue-600 mt-1">Active players</p>
          </div>
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-800">Revenue</h4>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">₹6,235</p>
            <p className="text-sm text-purple-600 mt-1">This draw</p>
          </div>
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <h4 className="font-medium text-orange-800">Time Left</h4>
            </div>
            <p className="text-2xl font-bold text-orange-900 mt-2">2:15:30</p>
            <p className="text-sm text-orange-600 mt-1">Until draw</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotterySettings;
