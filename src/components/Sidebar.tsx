import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Settings, 
  LogOut,
  Menu,
  X,
  Crown,
  Shield,
  UserCog,
  UserPlus,
  User,
  UserMinus,
  Store,
  ChevronDown,
  ChevronRight,
  Settings2,
  Gamepad2
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  children?: MenuItem[];
}

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
  const [expandedItems, setExpandedItems] = useState<string[]>(['controller', 'master']);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'administration', label: 'Administration', icon: Shield },
    { 
      id: 'controller', 
      label: 'Controller', 
      icon: Settings2,
      children: [
        { id: 'district-master', label: 'District Master', icon: Shield },
        { id: 'drawtime-master', label: 'Draw Time Master', icon: Settings },
        { id: 'game-master', label: 'Game Master', icon: Gamepad2 }
      ]
    },
    {
      id: 'master',
      label: 'Master',
      icon: UserCog,
      children: [
        { id: 'manage-master', label: 'Manage Master', icon: UserCog },
      ]
    },
    { id: 'super-stockist', label: 'Super Stockist', icon: UserPlus },
    { id: 'stockist', label: 'Stockist', icon: User },
    { id: 'sub-stockist', label: 'Sub Stockist', icon: UserMinus },
    { id: 'retailer', label: 'Retailer', icon: Store },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'agents', label: 'Agents', icon: UserCheck },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpandedItem = isExpanded(item.id);
    const isActive = activeSection === item.id;
    
    return (
      <li key={item.id}>
        <div>
          <button
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.id);
              } else {
                setActiveSection(item.id);
              }
            }}
            className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-sky-700 text-white shadow-lg'
                : 'text-sky-100 hover:bg-sky-700 hover:text-white'
            }`}
            title={collapsed ? item.label : ''}
            style={{ paddingLeft: `${12 + level * 16}px` }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 font-medium">{item.label}</span>
                {hasChildren && (
                  <div className="ml-auto">
                    {isExpandedItem ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </>
            )}
          </button>
          
          {hasChildren && isExpandedItem && !collapsed && (
            <ul className="mt-1 space-y-1">
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </ul>
          )}
        </div>
      </li>
    );
  };

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
            {menuItems.map((item) => renderMenuItem(item))}
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