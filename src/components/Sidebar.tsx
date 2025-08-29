import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Gamepad2, 
  Settings, 
  LogOut,
  Menu,
  X,
  Crown,
  Dices,
  TrendingUp,
  Palette
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed,
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'agents', label: 'Agents', icon: UserCheck },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'lottery-games', label: 'Lottery Games', icon: Dices },
    { id: 'bigsmall-games', label: 'Big & Small', icon: TrendingUp },
    { id: 'color-games', label: 'Color Prediction', icon: Palette },
    { id: 'lottery-settings', label: 'Lottery Settings', icon: Settings },
    { id: 'bigsmall-settings', label: 'Big & Small Settings', icon: Settings },
    { id: 'color-settings', label: 'Color Settings', icon: Settings },
  ];

  return (
    <div className={`bg-sky-600 min-h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sky-500">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">Lottery Admin</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 text-white hover:bg-sky-700 rounded-lg transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-sky-700 text-white shadow-lg'
                        : 'text-sky-100 hover:bg-sky-700 hover:text-white'
                    }`}
                    title={collapsed ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sky-500">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-3 py-3 text-sky-100 hover:bg-sky-700 hover:text-white rounded-lg transition-all duration-200"
            title={collapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;