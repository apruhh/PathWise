import React, { useState } from 'react';
import { User, Bell, Search, Settings } from 'lucide-react';
import { UserProfile } from '../types/user';

interface HeaderProps {
  userProfile: UserProfile;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, setActiveTab }) => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Dummy data for careers and learning paths
  const careers = userProfile.careerMatches || [];
  const learningPaths = [
    { id: 'data-scientist', title: 'Data Scientist Learning Path' },
    { id: 'web-dev', title: 'Web Developer Learning Path' },
    { id: 'ai-engineer', title: 'AI Engineer Learning Path' },
  ];

  const filteredCareers = careers.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  const filteredPaths = learningPaths.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  return (
  <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-4 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">CareerAI Advisor</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your Personalized Career Navigator</p>
          </div>
        </div>

  <div className="flex items-center space-x-6 dark:text-white">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowResults(e.target.value.length > 0); }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => setShowResults(search.length > 0)}
              placeholder="Search careers, learning paths..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 w-64 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            {showResults && (search.length > 0) && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                {filteredCareers.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300">Careers</div>
                    {filteredCareers.map(c => (
                      <div
                        key={c.title}
                        className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer text-sm text-gray-800 dark:text-white"
                        onMouseDown={() => setActiveTab('careers')}
                      >
                        {c.title}
                      </div>
                    ))}
                  </div>
                )}
                {filteredPaths.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300">Learning Paths</div>
                    {filteredPaths.map(p => (
                      <div
                        key={p.id}
                        className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer text-sm text-gray-800 dark:text-white"
                        onMouseDown={() => setActiveTab('learning')}
                      >
                        {p.title}
                      </div>
                    ))}
                  </div>
                )}
                {filteredCareers.length === 0 && filteredPaths.length === 0 && (
                  <div className="px-4 py-2 text-gray-400 text-sm dark:text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Notifications removed */}

          {/* Sun/Moon Toggle Button */}
          <div className="flex items-center space-x-2">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${document.body.classList.contains('dark') ? 'bg-white text-gray-800' : 'bg-white text-yellow-500'}`}
              onClick={() => {
                document.body.classList.remove('dark');
              }}
              aria-label="Light Mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" /><path stroke="currentColor" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${document.body.classList.contains('dark') ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
              onClick={() => {
                document.body.classList.add('dark');
              }}
              aria-label="Dark Mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 dark:text-white">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.personalInfo.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Career Explorer</p>
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