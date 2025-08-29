import React, { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, Eye, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [agents] = useState([
    {
      id: 1,
      name: 'Alice Cooper',
      email: 'alice.cooper@lottery.com',
      status: 'Active',
      commission: '5.5%',
      totalSales: '₹25,890',
      gamesManaged: ['Lottery', 'Big & Small'],
      joinDate: '2023-08-15',
      lastActive: '2024-01-15 11:30'
    },
    {
      id: 2,
      name: 'Bob Martinez',
      email: 'bob.martinez@lottery.com',
      status: 'Active',
      commission: '6.0%',
      totalSales: '₹38,750',
      gamesManaged: ['Color Prediction', 'Lottery'],
      joinDate: '2023-07-20',
      lastActive: '2024-01-15 15:45'
    },
    {
      id: 3,
      name: 'Carol Thompson',
      email: 'carol.thompson@lottery.com',
      status: 'Pending',
      commission: '4.5%',
      totalSales: '₹0',
      gamesManaged: [],
      joinDate: '2024-01-10',
      lastActive: 'Never'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@lottery.com',
      status: 'Suspended',
      commission: '5.0%',
      totalSales: '₹15,420',
      gamesManaged: ['Big & Small'],
      joinDate: '2023-09-12',
      lastActive: '2024-01-08 10:15'
    }
  ]);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agents Management</h1>
        <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Agents</h3>
          <p className="text-3xl font-bold text-sky-600 mt-2">234</p>
          <p className="text-sm text-green-600 mt-1">+12 this month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Active Agents</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">198</p>
          <p className="text-sm text-green-600 mt-1">84.6% active</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Pending Approval</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">18</p>
          <p className="text-sm text-yellow-600 mt-1">Needs review</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Commission</h3>
          <p className="text-3xl font-bold text-sky-600 mt-2">₹12,450</p>
          <p className="text-sm text-green-600 mt-1">This month</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
            <option>All Games</option>
            <option>Lottery</option>
            <option>Big & Small</option>
            <option>Color Prediction</option>
          </select>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Games
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-sky-600 font-semibold">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className="text-sm text-gray-500">{agent.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agent.commission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agent.totalSales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {agent.gamesManaged.length > 0 ? (
                        agent.gamesManaged.map((game, idx) => (
                          <span key={idx} className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded-full">
                            {game}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">None assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-sky-600 hover:text-sky-900 p-1 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      {agent.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agents;