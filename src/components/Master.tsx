import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Search, Trash2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface MasterData {
  fullName: string;
  aadhaarId: string;
  panNumber: string;
  address1: string;
  address2: string;
  district: string;
  cityVillage: string;
  pincode: string;
  mobileNo: string;
  email: string;
  userid: string;
  tradeLicense: string;
  gstNo: string;
  returnPercentage: number;
}

interface RateData {
  srno: number;
  sellingRate: number;
  purchaseRate: number;
}

interface MasterProps {
  activeSection?: string;
}

const Master: React.FC<MasterProps> = ({ activeSection = 'manage-master' }) => {
  const navigate = useNavigate();
  
  const getInitialTab = () => {
    switch (activeSection) {
      case 'district-master': return 'district';
      case 'drawtime-master': return 'drawtime';
      default: return 'manage';
    }
  };

  const [activeMainTab, setActiveMainTab] = useState<'manage' | 'district' | 'drawtime'>(getInitialTab());
  const [activeRateTab, setActiveRateTab] = useState<'purchase' | 'ac'>('purchase');

  // Update tab when activeSection changes
  useEffect(() => {
    const newTab = getInitialTab();
    setActiveMainTab(newTab);
  }, [activeSection]);

  const handleTabChange = (tab: 'manage' | 'district' | 'drawtime') => {
    setActiveMainTab(tab);
    switch (tab) {
      case 'manage':
        navigate('/master/manage');
        break;
      case 'district':
        navigate('/master/district');
        break;
      case 'drawtime':
        navigate('/master/drawtime');
        break;
    }
  };
  const [masterData, setMasterData] = useState<MasterData>({
    fullName: '',
    aadhaarId: '',
    panNumber: '',
    address1: '',
    address2: '',
    district: 'Alipurduar',
    cityVillage: '',
    pincode: '',
    mobileNo: '',
    email: '',
    userid: '',
    tradeLicense: '',
    gstNo: '',
    returnPercentage: 100.00
  });

  const [rateData, setRateData] = useState<RateData[]>([
    { srno: 1, sellingRate: 5.00, purchaseRate: 0.00 },
    { srno: 2, sellingRate: 20.00, purchaseRate: 0.00 },
    { srno: 3, sellingRate: 50.00, purchaseRate: 0.00 }
  ]);

  const districts = [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
    'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram',
    'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
    'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas',
    'Uttar Dinajpur'
  ];

  const handleInputChange = (field: keyof MasterData, value: string | number) => {
    setMasterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRateChange = (index: number, field: 'sellingRate' | 'purchaseRate', value: number) => {
    setRateData(prev => prev.map((rate, i) => 
      i === index ? { ...rate, [field]: value } : rate
    ));
  };

  // District Master state
  const [districtData, setDistrictData] = useState({
    districtName: '',
    state: 'West Bengal'
  });

  // Draw Time Master state
  const [drawTimeData, setDrawTimeData] = useState({
    drawTime: '',
    lastUnsoldMarkingTime: '',
    sellingRate: 0.00,
    time: '',
    drawname: ''
  });

  const handleSave = () => {
    console.log('Saving master data:', masterData);
    console.log('Saving rate data:', rateData);
    // Implement save logic here
  };

  const handleFind = () => {
    console.log('Finding master data');
    // Implement find logic here
  };

  const handleDelete = () => {
    console.log('Deleting master data');
    // Implement delete logic here
  };

  const handleClear = () => {
    setMasterData({
      fullName: '',
      aadhaarId: '',
      panNumber: '',
      address1: '',
      address2: '',
      district: 'Alipurduar',
      cityVillage: '',
      pincode: '',
      mobileNo: '',
      email: '',
      userid: '',
      tradeLicense: '',
      gstNo: '',
      returnPercentage: 100.00
    });
    setRateData([
      { srno: 1, sellingRate: 5.00, purchaseRate: 0.00 },
      { srno: 2, sellingRate: 20.00, purchaseRate: 0.00 },
      { srno: 3, sellingRate: 50.00, purchaseRate: 0.00 }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
               <button
                 onClick={() => handleTabChange('manage')}
                 className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                   activeMainTab === 'manage'
                     ? 'border-sky-500 text-sky-600'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                 }`}
               >
                 Manage Master
               </button>
               <button
                 onClick={() => handleTabChange('district')}
                 className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                   activeMainTab === 'district'
                     ? 'border-sky-500 text-sky-600'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                 }`}
               >
                 District Master
               </button>
               <button
                 onClick={() => handleTabChange('drawtime')}
                 className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                   activeMainTab === 'drawtime'
                     ? 'border-sky-500 text-sky-600'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                 }`}
               >
                 Draw Time Master
               </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeMainTab === 'manage' && (
          <div>
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Master</h1>
          
          {/* Parent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
              <input
                type="text"
                value="Administrator"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={masterData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AADHAAR Id <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={masterData.aadhaarId}
                onChange={(e) => handleInputChange('aadhaarId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter AADHAAR ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
              <input
                type="text"
                value={masterData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter PAN number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
              <input
                type="text"
                value="Yes"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
              <input
                type="text"
                value={masterData.address1}
                onChange={(e) => handleInputChange('address1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter address 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
              <input
                type="text"
                value={masterData.address2}
                onChange={(e) => handleInputChange('address2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter address 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={masterData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City/Village <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={masterData.cityVillage}
                onChange={(e) => handleInputChange('cityVillage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter city/village"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                value={masterData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter pincode"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile no <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={masterData.mobileNo}
                onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={masterData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Userid</label>
              <input
                type="text"
                value={masterData.userid}
                onChange={(e) => handleInputChange('userid', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter user ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trade License</label>
              <input
                type="text"
                value={masterData.tradeLicense}
                onChange={(e) => handleInputChange('tradeLicense', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter trade license"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST No</label>
              <input
                type="text"
                value={masterData.gstNo}
                onChange={(e) => handleInputChange('gstNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter GST number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Percentage %</label>
              <input
                type="number"
                step="0.01"
                value={masterData.returnPercentage}
                onChange={(e) => handleInputChange('returnPercentage', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter return percentage"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Information Bar */}
        <div className="bg-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-green-600 font-medium">Draw Time: 11:55 AM</span>
            <span className="text-gray-600">Last Unsold Time:</span>
            <span className="text-red-600">--:--</span>
          </div>
        </div>

        {/* Other Rate Updation Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Rate Updation</h2>
          
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveRateTab('purchase')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeRateTab === 'purchase'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Purchase Rate
            </button>
            <button
              onClick={() => setActiveRateTab('ac')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeRateTab === 'ac'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              AC Rate
            </button>
          </div>

          {/* Rate Table */}
          {activeRateTab === 'purchase' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Srno</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Selling Rate</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">Purchase Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {rateData.map((rate, index) => (
                    <tr key={rate.srno}>
                      <td className="border border-gray-300 px-4 py-2">{rate.srno}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={rate.sellingRate}
                          onChange={(e) => handleRateChange(index, 'sellingRate', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={rate.purchaseRate}
                          onChange={(e) => handleRateChange(index, 'purchaseRate', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeRateTab === 'ac' && (
            <div className="text-center py-8 text-gray-500">
              AC Rate configuration coming soon...
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleFind}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Find</span>
          </button>
          
          <button
            onClick={handleSave}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save/Update</span>
          </button>
          
          <button
            onClick={handleDelete}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
          
          <button
            onClick={handleClear}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>First</span>
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md flex items-center space-x-2 transition-colors">
            <ChevronRight className="w-4 h-4" />
            <span>Prev</span>
          </button>
        </div>
          </div>
        )}

        {/* District Master Tab */}
        {activeMainTab === 'district' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">District Master</h1>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District Name</label>
                  <input
                    type="text"
                    value={districtData.districtName}
                    onChange={(e) => setDistrictData(prev => ({ ...prev, districtName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter district name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={districtData.state}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setDistrictData({ districtName: '', state: 'West Bengal' })}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
                <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Draw Time Master Tab */}
        {activeMainTab === 'drawtime' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Draw Time Master</h1>
            
            <div className="space-y-6">
              {/* Draw Time Configuration Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Draw time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={drawTimeData.drawTime}
                      onChange={(e) => setDrawTimeData(prev => ({ ...prev, drawTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Unsold Marking time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={drawTimeData.lastUnsoldMarkingTime}
                      onChange={(e) => setDrawTimeData(prev => ({ ...prev, lastUnsoldMarkingTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-8"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={drawTimeData.sellingRate}
                      onChange={(e) => setDrawTimeData(prev => ({ ...prev, sellingRate: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-8"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* DRAWNAME DETAILS Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">DRAWNAME DETAILS</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={drawTimeData.time}
                      onChange={(e) => setDrawTimeData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drawname</label>
                    <input
                      type="text"
                      value={drawTimeData.drawname}
                      onChange={(e) => setDrawTimeData(prev => ({ ...prev, drawname: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Enter draw name"
                    />
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <div className="flex justify-center">
                <button className="w-12 h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-2">
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <Search className="w-4 h-4" />
                  <span>Find</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save/Update</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                
                <button
                  onClick={() => setDrawTimeData({ drawTime: '', lastUnsoldMarkingTime: '', sellingRate: 0.00, time: '', drawname: '' })}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  <span>First</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev.</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  <span>Next</span>
                </button>
                
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                  <span>Last</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Master;
