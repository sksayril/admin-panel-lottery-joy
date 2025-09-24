import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ManageMaster from './ManageMaster';
import DistrictMaster from './DistrictMaster';
import DrawTimeMaster from './DrawTimeMaster';

const MasterController = () => {
    const navigate = useNavigate();
    const { activeSection } = useParams();

    const getInitialTab = () => {
        switch (activeSection) {
            case 'district-master': return 'district';
            case 'drawtime-master': return 'drawtime';
            case 'manage-master':
            default: return 'manage';
        }
    };

    const [activeMainTab, setActiveMainTab] = useState<'manage' | 'district' | 'drawtime'>(getInitialTab());

    useEffect(() => {
        const newTab = getInitialTab();
        setActiveMainTab(newTab);
    }, [activeSection]);

    const handleTabChange = (tab: 'manage' | 'district' | 'drawtime') => {
        setActiveMainTab(tab);
        switch (tab) {
            case 'manage':
                navigate('/master/manage-master');
                break;
            case 'district':
                navigate('/master/district-master');
                break;
            case 'drawtime':
                navigate('/master/drawtime-master');
                break;
        }
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
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeMainTab === 'manage'
                                        ? 'border-sky-500 text-sky-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Manage Master
                            </button>
                            <button
                                onClick={() => handleTabChange('district')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeMainTab === 'district'
                                        ? 'border-sky-500 text-sky-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                District Master
                            </button>
                            <button
                                onClick={() => handleTabChange('drawtime')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeMainTab === 'drawtime'
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
                {activeMainTab === 'manage' && <ManageMaster />}
                {activeMainTab === 'district' && <DistrictMaster />}
                {activeMainTab === 'drawtime' && <DrawTimeMaster />}
            </div>
        </div>
    );
};

export default MasterController;
