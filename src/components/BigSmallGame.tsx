import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, DollarSign, TrendingUp, TrendingDown, ArrowLeft, Play, Pause, BarChart3, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BigSmallGameProps {
  onBack?: () => void;
}

interface Bet {
  id: string;
  type: 'big' | 'small';
  amount: number;
  timestamp: Date;
  playerId: string;
}

const BigSmallGame: React.FC<BigSmallGameProps> = ({ onBack }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isBettingOpen, setIsBettingOpen] = useState(true);
  const [isGameActive, setIsGameActive] = useState(true);
  const [bets, setBets] = useState<Bet[]>([]);
  const [totalBigBets, setTotalBigBets] = useState(0);
  const [totalSmallBets, setTotalSmallBets] = useState(0);
  const [minBet, setMinBet] = useState(1);
  const [maxBet, setMaxBet] = useState(500);
  const [betAmount, setBetAmount] = useState('');
  const [selectedBetType, setSelectedBetType] = useState<'big' | 'small' | null>(null);
  const [lastResult, setLastResult] = useState<'big' | 'small' | null>(null);
  const [lastNumber, setLastNumber] = useState<number | null>(null);

  // Calculate totals
  useEffect(() => {
    const bigTotal = bets.filter(bet => bet.type === 'big').reduce((sum, bet) => sum + bet.amount, 0);
    const smallTotal = bets.filter(bet => bet.type === 'small').reduce((sum, bet) => sum + bet.amount, 0);
    setTotalBigBets(bigTotal);
    setTotalSmallBets(smallTotal);
  }, [bets]);

  // Timer effect
  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRoundEnd();
          return 30; // Reset for next round
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
      const result = Math.random() > 0.5 ? 'big' : 'small';
      const number = Math.floor(Math.random() * 100) + 1;
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
    if (!selectedBetType) {
      toast.error('Please select Big or Small');
      return;
    }

    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount < minBet || amount > maxBet) {
      toast.error(`Bet amount must be between ₹${minBet} and ₹${maxBet}`);
      return;
    }

    const newBet: Bet = {
      id: Date.now().toString(),
      type: selectedBetType,
      amount,
      timestamp: new Date(),
      playerId: 'player-' + Math.floor(Math.random() * 1000)
    };

    setBets([...bets, newBet]);
    setBetAmount('');
    setSelectedBetType(null);
    
    toast.success(`Bet placed: ₹${amount} on ${selectedBetType.toUpperCase()}`);
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

  const getBetTypeColor = (type: 'big' | 'small') => {
    return type === 'big' ? 'text-red-600' : 'text-blue-600';
  };

  const getBetTypeIcon = (type: 'big' | 'small') => {
    return type === 'big' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
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
              <h1 className="text-3xl font-bold">Big & Small</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big Bets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
              Big Bets
            </h3>
            <span className="text-2xl font-bold text-red-600">₹{totalBigBets.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bets:</span>
              <span className="font-medium">{bets.filter(bet => bet.type === 'big').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Bet:</span>
              <span className="font-medium">
                ${bets.filter(bet => bet.type === 'big').length > 0 
                  ? (totalBigBets / bets.filter(bet => bet.type === 'big').length).toFixed(2) 
                  : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Small Bets */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingDown className="w-5 h-5 text-blue-600 mr-2" />
              Small Bets
            </h3>
            <span className="text-2xl font-bold text-blue-600">₹{totalSmallBets.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bets:</span>
              <span className="font-medium">{bets.filter(bet => bet.type === 'small').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Bet:</span>
              <span className="font-medium">
                ${bets.filter(bet => bet.type === 'small').length > 0 
                  ? (totalSmallBets / bets.filter(bet => bet.type === 'small').length).toFixed(2) 
                  : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Last Result */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Last Result</h3>
          {lastResult ? (
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getBetTypeColor(lastResult)}`}>
                {lastResult.toUpperCase()}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {lastNumber}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
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
                        {getBetTypeIcon(bet.type)}
                        <span className={`font-medium ${getBetTypeColor(bet.type)}`}>
                          {bet.type.toUpperCase()}
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
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bets placed yet</h3>
          <p className="text-gray-500">Be the first to place a bet in this round!</p>
        </div>
      )}
    </div>
  );
};

export default BigSmallGame;
