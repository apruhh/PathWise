import React, { useState } from 'react';
import { User, Brain, TrendingUp, Target, BookOpen, Users, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import CareerMatching from './components/CareerMatching';
import LearningPaths from './components/LearningPaths';
import Progress from './components/Progress';
import { UserProfile } from './types/user';
import { generateInitialProfile } from './utils/profileGenerator';

type ActiveTab = 'dashboard' | 'assessment' | 'careers' | 'learning' | 'progress';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile>(generateInitialProfile());
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'assessment', label: 'Assessment', icon: Brain },
    { id: 'careers', label: 'Career Match', icon: Target },
    { id: 'learning', label: 'Learning Paths', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Users },
  ];

  const handleAssessmentComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setHasCompletedAssessment(true);
    setActiveTab('careers');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} hasCompletedAssessment={hasCompletedAssessment} />;
      case 'assessment':
        return <Assessment onComplete={handleAssessmentComplete} currentProfile={userProfile} />;
      case 'careers':
        return <CareerMatching userProfile={userProfile} />;
      case 'learning':
        return <LearningPaths userProfile={userProfile} />;
      case 'progress':
        return <Progress userProfile={userProfile} />;
      default:
        return <Dashboard userProfile={userProfile} hasCompletedAssessment={hasCompletedAssessment} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header userProfile={userProfile} />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ArrowRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;