import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Phone, Calendar, Plus, X, Download, RefreshCw, ArrowLeft, AlertCircle, CheckCircle, Info, Ticket } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface LotteryTicket {
  id: string;
  mrp: number;
  same: number;
  fno: number;
  tno: number;
  tkt: number;
  totalAmount: number;
  timestamp: Date;
}

interface LotteryGameProps {
  onBack?: () => void;
}

interface FormErrors {
  mobileNo?: string;
  firstNumber?: string;
  secondNumber?: string;
  mrp?: string;
  same?: string;
}

const LotteryGame: React.FC<LotteryGameProps> = ({ onBack }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const actualGameId = gameId || '1';
  const [mobileNo, setMobileNo] = useState('');
  const [drawDateTime, setDrawDateTime] = useState(new Date('2025-06-30T12:30:00'));
  const [mrp, setMrp] = useState(6);
  const [same, setSame] = useState(5);
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [timeLeft, setTimeLeft] = useState(7013);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Available sem options
  const semOptions = [5, 10, 20, 25, 30, 40, 50];

  // Calculate total tickets and points
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.tkt, 0);
  const totalPoints = tickets.reduce((sum, ticket) => sum + ticket.totalAmount, 0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('Draw time has expired!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Form validation effect
  useEffect(() => {
    const newErrors: FormErrors = {};

    // Mobile number validation
    if (mobileNo && !/^[0-9]{10,15}$/.test(mobileNo)) {
      newErrors.mobileNo = 'Please enter a valid mobile number (10-15 digits)';
    }

    // First number validation
    if (firstNumber) {
      const fno = parseInt(firstNumber);
      if (isNaN(fno) || fno < 1) {
        newErrors.firstNumber = 'Please enter a valid positive number';
      }
    }

    // Second number validation
    if (secondNumber) {
      const tno = parseInt(secondNumber);
      if (isNaN(tno) || tno < 1) {
        newErrors.secondNumber = 'Please enter a valid positive number';
      } else if (firstNumber && parseInt(firstNumber) >= tno) {
        newErrors.secondNumber = 'Second number must be greater than first number';
      }
    }

    // MRP validation
    if (mrp < 1) {
      newErrors.mrp = 'MRP must be greater than 0';
    }

    // SAME validation
    if (same < 1) {
      newErrors.same = 'SAME must be greater than 0';
    }

    setErrors(newErrors);
    setIsFormValid(
      Boolean(mobileNo && 
      firstNumber && 
      secondNumber && 
      Object.keys(newErrors).length === 0)
    );
  }, [mobileNo, firstNumber, secondNumber, mrp, same]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const validateForm = (): boolean => {
    if (!mobileNo) {
      toast.error('Please enter mobile number');
      return false;
    }
    if (!firstNumber) {
      toast.error('Please enter first number');
      return false;
    }
    if (!secondNumber) {
      toast.error('Please enter second number');
      return false;
    }
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the form errors');
      return false;
    }
    return true;
  };

  const handleAddTicket = () => {
    if (!validateForm()) return;

    const fno = parseInt(firstNumber);
    const tno = parseInt(secondNumber);
    const ticketCount = tno - fno + 1;
    const totalAmount = mrp * ticketCount;

    const newTicket: LotteryTicket = {
      id: Date.now().toString(),
      mrp,
      same,
      fno,
      tno,
      tkt: ticketCount,
      totalAmount,
      timestamp: new Date()
    };

    setTickets([...tickets, newTicket]);
    setFirstNumber('');
    setSecondNumber('');
    
    toast.success(`Added ${ticketCount} tickets successfully!`);
  };

  const handleRemoveTicket = (id: string) => {
    const ticket = tickets.find(t => t.id === id);
    setTickets(tickets.filter(ticket => ticket.id !== id));
    if (ticket) {
      toast.success(`Removed ${ticket.tkt} tickets`);
    }
  };

  const handleUpdate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Game updated successfully!');
    }, 1000);
  };

  const handleLastPDF = () => {
    // Simulate PDF download
    toast.success('Downloading last draw PDF...');
  };

  const handleReset = () => {
    if (tickets.length > 0) {
      toast.success('All tickets cleared');
    }
    setTickets([]);
    setMobileNo('');
    setFirstNumber('');
    setSecondNumber('');
    setErrors({});
  };

  const handleSubmitAll = () => {
    if (tickets.length === 0) {
      toast.error('No tickets to submit');
      return;
    }
    
    toast.success(`Successfully submitted ${totalTickets} tickets worth ₹${totalPoints.toFixed(2)}`);
    // Here you would typically send to API
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
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
              <h1 className="text-3xl font-bold">BILLING</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2 text-red-200">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">Left: {formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Draw: {formatDateTime(drawDateTime)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Update
            </button>
            <button
              onClick={handleLastPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Last PDF
            </button>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile No <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder="Enter mobile number"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                  errors.mobileNo ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.mobileNo && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.mobileNo}
              </p>
            )}
          </div>

          {/* Draw Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Draw Date & Time
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <DatePicker
                selected={drawDateTime}
                onChange={(date: Date | null) => date && setDrawDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy h:mm aa"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                placeholderText="Select date and time"
              />
            </div>
          </div>
        </div>

        {/* MRP and SAME Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MRP (Price per ticket)
            </label>
            <select
              value={mrp}
              onChange={(e) => setMrp(Number(e.target.value))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                errors.mrp ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              {semOptions.map(option => (
                <option key={option} value={option}>₹{option}</option>
              ))}
            </select>
            {errors.mrp && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.mrp}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SAME (Multiplier)
            </label>
            <select
              value={same}
              onChange={(e) => setSame(Number(e.target.value))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                errors.same ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              {semOptions.map(option => (
                <option key={option} value={option}>{option}x</option>
              ))}
            </select>
            {errors.same && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.same}
              </p>
            )}
          </div>
        </div>

        {/* Available Status */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">Available for booking!</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Current draw will close in {formatTime(timeLeft)}
          </p>
        </div>

        {/* Lottery Numbers Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              placeholder="Enter first number"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                errors.firstNumber ? 'border-red-300 bg-red-50' : 'border-yellow-400'
              }`}
            />
            {errors.firstNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              placeholder="Enter second number"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                errors.secondNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.secondNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.secondNumber}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAddTicket}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-200 font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tickets
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">Total Tickets</span>
              <p className="text-2xl font-bold text-gray-900">{totalTickets}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Total Amount</span>
              <p className="text-2xl font-bold text-sky-600">₹{totalPoints.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Average Price</span>
              <p className="text-lg font-semibold text-gray-700">
                ₹{totalTickets > 0 ? (totalPoints / totalTickets).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="text-red-600 hover:text-red-700 font-medium px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              Reset
            </button>
            {tickets.length > 0 && (
              <button
                onClick={handleSubmitAll}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Submit All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      {tickets.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Added Tickets</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Total: {tickets.length} entries</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">MRP</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">SAME</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">From</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tickets</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium">₹{ticket.mrp}</td>
                    <td className="py-3 px-4">{ticket.same}x</td>
                    <td className="py-3 px-4 font-mono">{ticket.fno}</td>
                    <td className="py-3 px-4 font-mono">{ticket.tno}</td>
                    <td className="py-3 px-4 font-medium text-sky-600">{ticket.tkt}</td>
                    <td className="py-3 px-4 font-medium text-green-600">₹{ticket.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {ticket.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRemoveTicket(ticket.id)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center transition-colors"
                        title="Remove ticket"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets added yet</h3>
          <p className="text-gray-500">Add your first lottery ticket using the form above</p>
        </div>
      )}
    </div>
  );
};

export default LotteryGame;
