import React, { useState, useEffect } from 'react';
import { Search, Plus, Play, Pause, Settings, Eye, BarChart3, Dices, MoreVertical, ArrowRight, Gamepad2, TrendingUp, TrendingDown, Palette } from 'lucide-react';

interface GamesProps {
  onGameSelect?: (gameId: string, gameType: string) => void;
  onSettingsClick?: (gameType: string) => void;
  gameType?: string;
}

const Games: React.FC<GamesProps> = ({ onGameSelect, onSettingsClick, gameType = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(() => {
    // Initialize activeTab based on gameType prop
    return gameType === 'all' ? 'all' : gameType;
  });
  
  const [games] = useState([
    // Lottery Games
    {
      id: 1,
      name: 'Daily Lottery',
      type: 'lottery',
      status: 'Active',
      players: 1247,
      revenue: '₹8,450',
      nextDraw: '2025-06-30 12:30',
      prize: '₹50,000',
      ticketPrice: '₹5.00',
      semOptions: [5, 10, 20, 25, 30, 40, 50],
      timeLeft: '2:15:30'
    },
    {
      id: 2,
      name: 'Evening Lottery',
      type: 'lottery',
      status: 'Active',
      players: 892,
      revenue: '₹4,235',
      nextDraw: '2025-06-30 18:00',
      prize: '₹25,000',
      ticketPrice: '₹3.00',
      semOptions: [5, 10, 20, 25, 30, 40, 50],
      timeLeft: '8:45:12'
    },
    {
      id: 3,
      name: 'Weekly Lottery',
      type: 'lottery',
      status: 'Scheduled',
      players: 0,
      revenue: '₹0',
      nextDraw: '2025-07-07 14:00',
      prize: '₹100,000',
      ticketPrice: '₹10.00',
      semOptions: [10, 20, 25, 30, 40, 50],
      timeLeft: '168:00:00'
    },
    // Big & Small Games
    {
      id: 4,
      name: 'Big & Small Classic',
      type: 'bigsmall',
      status: 'Active',
      players: 567,
      revenue: '₹3,200',
      nextDraw: 'Next Round',
      prize: '₹15,000',
      minBet: 1,
      maxBet: 500,
      timeLeft: '0:25:10'
    },
    {
      id: 5,
      name: 'Big & Small Pro',
      type: 'bigsmall',
      status: 'Scheduled',
      players: 0,
      revenue: '₹0',
      nextDraw: 'Next Round',
      prize: '₹25,000',
      minBet: 5,
      maxBet: 1000,
      timeLeft: '0:45:30'
    },
    // Color Prediction Games
    {
      id: 6,
      name: 'Color Prediction',
      type: 'color',
      status: 'Active',
      players: 423,
      revenue: '₹2,800',
      nextDraw: 'Next Round',
      prize: '₹20,000',
      minBet: 1,
      maxBet: 1000,
      timeLeft: '0:35:45'
    },
    {
      id: 7,
      name: 'Color Prediction VIP',
      type: 'color',
      status: 'Active',
      players: 156,
      revenue: '₹5,600',
      nextDraw: 'Next Round',
      prize: '₹50,000',
      minBet: 10,
      maxBet: 5000,
      timeLeft: '0:15:20'
    }
  ]);

  // Set default active tab based on gameType prop
  useEffect(() => {
    if (gameType === 'all') {
      setActiveTab('all');
    } else {
      setActiveTab(gameType);
    }
  }, [gameType]);

  // Generate game types based on current context
  const gameTypes = gameType === 'all' ? [
    { id: 'all', label: 'All Games', count: games.length },
    { id: 'lottery', label: 'Lottery Games', count: games.filter(g => g.type === 'lottery').length },
    { id: 'bigsmall', label: 'Big & Small', count: games.filter(g => g.type === 'bigsmall').length },
    { id: 'color', label: 'Color Prediction', count: games.filter(g => g.type === 'color').length },
    { id: 'active', label: 'Active', count: games.filter(g => g.status === 'Active').length },
    { id: 'scheduled', label: 'Scheduled', count: games.filter(g => g.status === 'Scheduled').length }
  ] : [
    { id: gameType, label: gameType === 'lottery' ? 'Lottery Games' : gameType === 'bigsmall' ? 'Big & Small' : 'Color Prediction', count: games.filter(g => g.type === gameType).length },
    { id: 'active', label: 'Active', count: games.filter(g => g.type === gameType && g.status === 'Active').length },
    { id: 'scheduled', label: 'Scheduled', count: games.filter(g => g.type === gameType && g.status === 'Scheduled').length }
  ];

  // Improved filtering logic with better handling of edge cases
  const filteredGames = games.filter(game => {
    // Search filter - handle empty search term
    const matchesSearch = searchTerm === '' || game.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Game type filter (lottery, bigsmall, color)
    const matchesGameType = gameType === 'all' || game.type === gameType;
    
    // Active tab filter
    let matchesActiveTab = true;
    if (activeTab === 'active') {
      matchesActiveTab = game.status === 'Active';
    } else if (activeTab === 'scheduled') {
      matchesActiveTab = game.status === 'Scheduled';
    } else if (activeTab === 'lottery') {
      matchesActiveTab = game.type === 'lottery';
    } else if (activeTab === 'bigsmall') {
      matchesActiveTab = game.type === 'bigsmall';
    } else if (activeTab === 'color') {
      matchesActiveTab = game.type === 'color';
    }
    // For 'all' tab, matchesActiveTab remains true
    
    return matchesSearch && matchesGameType && matchesActiveTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Paused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGameIcon = (type: string) => {
    switch (type) {
      case 'lottery':
        return <Dices className="w-5 h-5" />;
      case 'bigsmall':
        return <TrendingUp className="w-5 h-5" />;
      case 'color':
        return <Palette className="w-5 h-5" />;
      default:
        return <Gamepad2 className="w-5 h-5" />;
    }
  };

  const getGameTypeColor = (type: string) => {
    switch (type) {
      case 'lottery':
        return 'bg-sky-100 text-sky-600';
      case 'bigsmall':
        return 'bg-purple-100 text-purple-600';
      case 'color':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleGameSelect = (gameId: string, gameType: string) => {
    onGameSelect?.(gameId, gameType);
  };

  const handleSettingsClick = (gameType: string) => {
    onSettingsClick?.(gameType);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId}, Game type: ${gameType}, Filtered games: ${filteredGames.length}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {gameType === 'all' ? 'Games Management' : 
           gameType === 'lottery' ? 'Lottery Games' :
           gameType === 'bigsmall' ? 'Big & Small Games' : 'Color Prediction Games'}
        </h1>
        <div className="flex space-x-3">
          <button
            onClick={() => handleSettingsClick(gameType === 'all' ? 'lottery' : gameType)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create {gameType === 'all' ? 'Game' : 
                   gameType === 'lottery' ? 'Lottery Game' :
                   gameType === 'bigsmall' ? 'Big & Small Game' : 'Color Game'}
          </button>
        </div>
      </div>

      {/* Game Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2">
        <nav className="flex space-x-1 overflow-x-auto">
          {gameTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTabChange(type.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === type.id
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              <span>{type.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === type.id
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Search & Filter</h3>
          {(searchTerm || activeTab !== (gameType === 'all' ? 'all' : gameType)) && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Active filters:</span>
              {activeTab !== (gameType === 'all' ? 'all' : gameType) && (
                <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs">
                  {gameTypes.find(t => t.id === activeTab)?.label}
                </span>
              )}
              {searchTerm && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${gameType === 'all' ? 'games' : 
                         gameType === 'lottery' ? 'lottery games' :
                         gameType === 'bigsmall' ? 'big & small games' : 'color games'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-100 rounded-lg">
                  {getGameIcon(game.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(game.status)}`}>
                      {game.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGameTypeColor(game.type)}`}>
                      {game.type === 'lottery' ? 'Lottery' : game.type === 'bigsmall' ? 'Big & Small' : 'Color'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Players</span>
                <span className="text-sm font-medium text-gray-900">{game.players.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="text-sm font-medium text-gray-900">{game.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Draw</span>
                <span className="text-sm font-medium text-gray-900">{game.nextDraw}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Prize Pool</span>
                <span className="text-sm font-medium text-sky-600">{game.prize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time Left</span>
                <span className="text-sm font-medium text-red-600">{game.timeLeft}</span>
              </div>
              {game.type === 'lottery' && game.semOptions && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">SEM Options</span>
                  <span className="text-sm font-medium text-gray-900">{game.semOptions.join(', ')}</span>
                </div>
              )}
              {(game.type === 'bigsmall' || game.type === 'color') && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bet Range</span>
                  <span className="text-sm font-medium text-gray-900">₹{game.minBet} - ₹{game.maxBet}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleGameSelect(game.id.toString(), game.type)}
                  className="text-sky-600 hover:text-sky-700 p-1 rounded transition-colors"
                  title="Play Game"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleSettingsClick(game.type)}
                  className="text-green-600 hover:text-green-700 p-1 rounded transition-colors" 
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                game.status === 'Active'
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}>
                {game.status === 'Active' ? (
                  <>
                    <Pause className="w-3 h-3 inline mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 inline mr-1" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? `No games match "${searchTerm}"` : 
             activeTab === 'active' ? 'No active games found' :
             activeTab === 'scheduled' ? 'No scheduled games found' :
             `No ${activeTab} games found`}
          </p>
          {(searchTerm || activeTab !== (gameType === 'all' ? 'all' : gameType)) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveTab(gameType === 'all' ? 'all' : gameType);
              }}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Games;