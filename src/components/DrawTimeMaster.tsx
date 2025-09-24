import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface DrawTime {
    id: number;
    drawTime: string;
    lastUnsoldMarkingTime: string;
    sellingRate: number;
    time: string;
    drawName: string;
}

const DrawTimeMaster = () => {
    const [drawTimes, setDrawTimes] = useState<DrawTime[]>([]);
    const [drawTimeData, setDrawTimeData] = useState({
        drawTime: '',
        lastUnsoldMarkingTime: '',
        sellingRate: 0.00,
        time: '',
        drawName: ''
    });

    useEffect(() => {
        const storedDrawTimes = localStorage.getItem('drawTimes');
        if (storedDrawTimes) {
            setDrawTimes(JSON.parse(storedDrawTimes));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('drawTimes', JSON.stringify(drawTimes));
    }, [drawTimes]);

    const handleInputChange = (field: keyof typeof drawTimeData, value: string | number) => {
        setDrawTimeData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddDrawTime = () => {
        const { drawTime, lastUnsoldMarkingTime, sellingRate, time, drawName } = drawTimeData;
        if (drawTime.trim() === '' || lastUnsoldMarkingTime.trim() === '' || drawName.trim() === '') return;

        const newDrawTime: DrawTime = {
            id: Date.now(),
            drawTime,
            lastUnsoldMarkingTime,
            sellingRate,
            time,
            drawName,
        };
        setDrawTimes([...drawTimes, newDrawTime]);
        setDrawTimeData({
            drawTime: '',
            lastUnsoldMarkingTime: '',
            sellingRate: 0.00,
            time: '',
            drawName: ''
        });
    };

    const handleDeleteDrawTime = (id: number) => {
        setDrawTimes(drawTimes.filter(dt => dt.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Draw Time Master</h1>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Draw time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={drawTimeData.drawTime}
                            onChange={(e) => handleInputChange('drawTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Unsold Marking time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={drawTimeData.lastUnsoldMarkingTime}
                            onChange={(e) => handleInputChange('lastUnsoldMarkingTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selling Rate</label>
                        <input
                            type="number"
                            step="0.01"
                            value={drawTimeData.sellingRate}
                            onChange={(e) => handleInputChange('sellingRate', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">DRAWNAME DETAILS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                value={drawTimeData.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Draw Name</label>
                            <input
                                type="text"
                                value={drawTimeData.drawName}
                                onChange={(e) => handleInputChange('drawName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                                placeholder="Enter draw name"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={handleAddDrawTime}
                        className="w-12 h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">#</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Draw Time</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Draw Name</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Selling Rate</th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drawTimes.map((dt, index) => (
                                <tr key={dt.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{dt.drawTime}</td>
                                    <td className="px-4 py-2 border-b">{dt.drawName}</td>
                                    <td className="px-4 py-2 border-b">{dt.sellingRate.toFixed(2)}</td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() => handleDeleteDrawTime(dt.id)}
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
        </div>
    );
};

export default DrawTimeMaster;
