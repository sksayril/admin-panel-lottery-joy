import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, DollarSign, ArrowLeft, Play, Pause, BarChart3, RefreshCw, AlertCircle, CheckCircle, Palette, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ColorGameProps {
  onBack?: () => void;
}

interface ColorBet {
  id: string;
  color: 'red' | 'green' | 'violet';
  amount: number;
  timestamp: Date;
  playerId: string;
}

const ColorGame: React.FC<ColorGameProps> = ({ onBack }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isBettingOpen, setIsBettingOpen] = useState(true);
  const [isGameActive, setIsGameActive] = useState(true);
  const [bets, setBets] = useState<ColorBet[]>([]);
  const [totalRedBets, setTotalRedBets] = useState(0);
  const [totalGreenBets, setTotalGreenBets] = useState(0);
  const [totalVioletBets, setTotalVioletBets] = useState(0);
  const [minBet, setMinBet] = useState(1);
  const [maxBet, setMaxBet] = useState(1000);
  const [betAmount, setBetAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState<'red' | 'green' | 'violet' | null>(null);
  const [lastResult, setLastResult] = useState<'red' | 'green' | 'violet' | null>(null);
  const [lastNumber, setLastNumber] = useState<number | null>(null);

  // Calculate totals
  useEffect(() => {
    const redTotal = bets.filter(bet => bet.color === 'red').reduce((sum, bet) => sum + bet.amount, 0);
    const greenTotal = bets.filter(bet => bet.color === 'green').reduce((sum, bet) => sum + bet.amount, 0);
    const violetTotal = bets.filter(bet => bet.color === 'violet').reduce((sum, bet) => sum + bet.amount, 0);
    setTotalRedBets(redTotal);
    setTotalGreenBets(greenTotal);
    setTotalVioletBets(violetTotal);
  }, [bets]);

  // Timer effect
  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRoundEnd();
          return 45; // Reset for next round
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive]);

  const handleRoundEnd = () => {
    setIsBettingOpen(false);
         toast('Betting closed! Generating result...', { icon: 'ℹ️' });
    
    // Simulate result generation
    setTimeout(() => {
      const random = Math.random();
      let result: 'red' | 'green' | 'violet';
      let number: number;
      
      if (random < 0.4) {
        result = 'red';
        number = Math.floor(Math.random() * 7) + 1; // 1-7
      } else if (random < 0.8) {
        result = 'green';
        number = Math.floor(Math.random() * 5) + 8; // 8-12
      } else {
        result = 'violet';
        number = Math.floor(Math.random() * 3) + 13; // 13-15
      }
      
      setLastResult(result);
      setLastNumber(number);
      
      toast.success(`Round ${currentRound} Result: ${result.toUpperCase()} (${number})`);
      
      // Reset for next round
      setTimeout(() => {
        setCurrentRound(prev => prev + 1);
        setBets([]);
        setIsBettingOpen(true);
        setLastResult(null);
        setLastNumber(null);
        toast.success('New round started! Place your bets.');
      }, 3000);
    }, 2000);
  };

  const handlePlaceBet = () => {
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount < minBet || amount > maxBet) {
      toast.error(`Bet amount must be between ₹${minBet} and ₹${maxBet}`);
      return;
    }

    const newBet: ColorBet = {
      id: Date.now().toString(),
      color: selectedColor,
      amount,
      timestamp: new Date(),
      playerId: 'player-' + Math.floor(Math.random() * 1000)
    };

    setBets([...bets, newBet]);
    setBetAmount('');
    setSelectedColor(null);
    
    toast.success(`Bet placed: ₹${amount} on ${selectedColor.toUpperCase()}`);
  };

  const handleStartGame = () => {
    setIsGameActive(true);
    setIsBettingOpen(true);
    toast.success('Game started!');
  };

  const handlePauseGame = () => {
    setIsGameActive(false);
    setIsBettingOpen(false);
         toast('Game paused', { icon: 'ℹ️' });
  };

  const formatTime = (seconds: number) => {
    return seconds.toString().padStart(2, '0');
  };

  const getColorConfig = (color: 'red' | 'green' | 'violet') => {
    switch (color) {
      case 'red':
        return {
          bgColor: 'bg-red-500',
          borderColor: 'border-red-500',
          hoverColor: 'hover:border-red-600',
          textColor: 'text-red-600',
          bgLight: 'bg-red-50',
          numbers: '1-7',
          multiplier: '2x'
        };
      case 'green':
        return {
          bgColor: 'bg-green-500',
          borderColor: 'border-green-500',
          hoverColor: 'hover:border-green-600',
          textColor: 'text-green-600',
          bgLight: 'bg-green-50',
          numbers: '8-12',
          multiplier: '14x'
        };
      case 'violet':
        return {
          bgColor: 'bg-purple-500',
          borderColor: 'border-purple-500',
          hoverColor: 'hover:border-purple-600',
          textColor: 'text-purple-600',
          bgLight: 'bg-purple-50',
          numbers: '13-15',
          multiplier: '4.5x'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Back to Games"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold">Color Prediction</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2 text-yellow-200">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">Time: {formatTime(timeLeft)}s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Round: {currentRound}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            {isGameActive ? (
              <button
                onClick={handlePauseGame}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </button>
            ) : (
              <button
                onClick={handleStartGame}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Game Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Red Bets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              Red Bets
            </h3>
            <span className="text-2xl font-bold text-red-600">₹{totalRedBets.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bets:</span>
              <span className="font-medium">{bets.filter(bet => bet.color === 'red').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Numbers:</span>
              <span className="font-medium">1-7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Multiplier:</span>
              <span className="font-medium text-green-600">2x</span>
            </div>
          </div>
        </div>

        {/* Green Bets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              Green Bets
            </h3>
            <span className="text-2xl font-bold text-green-600">₹{totalGreenBets.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bets:</span>
              <span className="font-medium">{bets.filter(bet => bet.color === 'green').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Numbers:</span>
              <span className="font-medium">8-12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Multiplier:</span>
              <span className="font-medium text-green-600">14x</span>
            </div>
          </div>
        </div>

        {/* Violet Bets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              Violet Bets
            </h3>
            <span className="text-2xl font-bold text-purple-600">₹{totalVioletBets.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bets:</span>
              <span className="font-medium">{bets.filter(bet => bet.color === 'violet').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Numbers:</span>
              <span className="font-medium">13-15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Multiplier:</span>
              <span className="font-medium text-green-600">4.5x</span>
            </div>
          </div>
        </div>

        {/* Last Result */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Result</h3>
          {lastResult ? (
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${getColorConfig(lastResult).bgColor}`}></div>
              <div className={`text-xl font-bold mb-1 ${getColorConfig(lastResult).textColor}`}>
                {lastResult.toUpperCase()}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {lastNumber}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Palette className="w-8 h-8 mx-auto mb-2" />
              <p>No result yet</p>
            </div>
          )}
        </div>
      </div>

             {/* Admin Controls */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-semibold text-gray-900">Admin Controls</h2>
           <div className="flex items-center space-x-2">
             <span className="text-sm text-gray-600">Game Status:</span>
             <span className={`text-sm font-medium px-2 py-1 rounded-full ${
               isGameActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
             }`}>
               {isGameActive ? 'Active' : 'Paused'}
             </span>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-4">
             <h3 className="font-semibold text-gray-900">Game Management</h3>
             <div className="space-y-3">
               <button
                 onClick={handleStartGame}
                 disabled={isGameActive}
                 className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
               >
                 Start Game
               </button>
               <button
                 onClick={handlePauseGame}
                 disabled={!isGameActive}
                 className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
               >
                 Pause Game
               </button>
             </div>
           </div>

           <div className="space-y-4">
             <h3 className="font-semibold text-gray-900">Round Information</h3>
             <div className="bg-gray-50 rounded-lg p-4 space-y-2">
               <div className="flex justify-between">
                 <span className="text-sm text-gray-600">Current Round:</span>
                 <span className="text-sm font-medium">{currentRound}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-gray-600">Time Remaining:</span>
                 <span className="text-sm font-medium">{formatTime(timeLeft)}s</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-gray-600">Betting Status:</span>
                 <span className={`text-sm font-medium ${
                   isBettingOpen ? 'text-green-600' : 'text-red-600'
                 }`}>
                   {isBettingOpen ? 'Open' : 'Closed'}
                 </span>
               </div>
             </div>
           </div>
         </div>
       </div>

      {/* Recent Bets */}
      {bets.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Recent Bets</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Total: {bets.length} bets</span>
              </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Color</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Player</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {bets.slice(-10).reverse().map((bet) => (
                  <tr key={bet.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${getColorConfig(bet.color).bgColor}`}></div>
                        <span className={`font-medium ${getColorConfig(bet.color).textColor}`}>
                          {bet.color.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">₹{bet.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{bet.playerId}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {bet.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {bets.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bets placed yet</h3>
          <p className="text-gray-500">Be the first to place a bet in this round!</p>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
