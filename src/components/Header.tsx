import React from 'react';
import { User, Bell, Search, Settings } from 'lucide-react';
import { UserProfile } from '../types/user';

interface HeaderProps {
  userProfile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ userProfile }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CareerAI Advisor</h1>
            <p className="text-sm text-gray-600">Your Personalized Career Navigator</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search careers, skills..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userProfile.personalInfo.name}</p>
              <p className="text-xs text-gray-600">Career Explorer</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userProfile.personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;