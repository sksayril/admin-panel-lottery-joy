import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebarCollapsed');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem('activeSection') || 'dashboard';
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
    }, [collapsed]);

    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logging out...');
        navigate('/login');
    };

    const handleSetActiveSection = (section: string) => {
        setActiveSection(section);
        if (section === 'dashboard') {
            navigate('/');
        } else if (section.endsWith('-master') && section !== 'game-master') {
            navigate(`/master/${section}`);
        }
        else {
            navigate(`/${section}`);
        }
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={handleSetActiveSection}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                onLogout={handleLogout}
            />
            <main
                className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'
                    }`}
            >
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
