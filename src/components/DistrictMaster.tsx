import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface District {
    id: number;
    name: string;
    state: string;
}

const DistrictMaster = () => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [districtName, setDistrictName] = useState('');
    const [stateName] = useState('West Bengal');

    useEffect(() => {
        const storedDistricts = localStorage.getItem('districts');
        if (storedDistricts) {
            setDistricts(JSON.parse(storedDistricts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('districts', JSON.stringify(districts));
    }, [districts]);

    const handleAddDistrict = () => {
        if (districtName.trim() === '') return;
        const newDistrict: District = {
            id: Date.now(),
            name: districtName.trim(),
            state: stateName,
        };
        setDistricts([...districts, newDistrict]);
        setDistrictName('');
    };

    const handleDeleteDistrict = (id: number) => {
        setDistricts(districts.filter(district => district.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">District Master</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
                <div className='md:col-span-1'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District Name</label>
                    <input
                        type="text"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Enter district name"
                    />
                </div>
                <div className='md:col-span-1'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        type="text"
                        value={stateName}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                </div>
                <div className='md:col-span-1'>
                    <button 
                        onClick={handleAddDistrict}
                        className="w-full flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add District
                    </button>
                </div>
            </div>

            {/* Districts Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">#</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">District Name</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">State</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {districts.map((district, index) => (
                            <tr key={district.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{district.name}</td>
                                <td className="px-4 py-2 border-b">{district.state}</td>
                                <td className="px-4 py-2 border-b">
                                    <button 
                                        onClick={() => handleDeleteDistrict(district.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DistrictMaster;
