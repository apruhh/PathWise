import React, { useState } from 'react';
import { TrendingUp, Award, Target, Clock, Star, ChevronRight, Calendar, BarChart3 } from 'lucide-react';
import { UserProfile } from '../types/user';

interface ProgressProps {
  userProfile: UserProfile;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'learning' | 'career' | 'milestone';
  earnedDate: string;
  icon: any;
}

interface SkillProgress {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  lastUpdated: string;
}

const Progress: React.FC<ProgressProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'achievements' | 'goals'>('overview');

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Assessment Complete',
      description: 'Completed your first career assessment',
      category: 'milestone',
      earnedDate: '2024-01-15',
      icon: Target
    },
    {
      id: '2',
      title: 'Python Proficiency',
      description: 'Reached intermediate level in Python',
      category: 'skill',
      earnedDate: '2024-01-20',
      icon: Star
    },
    {
      id: '3',
      title: 'Learning Streak',
      description: 'Maintained 7-day learning streak',
      category: 'learning',
      earnedDate: '2024-01-25',
      icon: TrendingUp
    }
  ];

  // Mock skill progress data
  const skillProgress: SkillProgress[] = [
    { skill: 'Python', currentLevel: 3, targetLevel: 5, progress: 60, lastUpdated: '2 days ago' },
    { skill: 'Machine Learning', currentLevel: 2, targetLevel: 4, progress: 50, lastUpdated: '1 week ago' },
    { skill: 'JavaScript', currentLevel: 4, targetLevel: 5, progress: 80, lastUpdated: '3 days ago' },
    { skill: 'Communication', currentLevel: 3, targetLevel: 4, progress: 75, lastUpdated: '1 day ago' },
  ];

  const overallProgress = {
    careerReadiness: 78,
    skillCompleteness: 65,
    learningMomentum: 85,
    profileStrength: 72
  };

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.8 },
  ];

  const getAchievementIcon = (achievement: Achievement) => {
    const IconComponent = achievement.icon;
    return <IconComponent className="w-6 h-6" />;
  };

  const getAchievementColor = (category: string) => {
    switch (category) {
      case 'skill': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'learning': return 'bg-green-100 text-green-600 border-green-200';
      case 'career': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'milestone': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Career Readiness</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.careerReadiness}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                style={{ width: `${overallProgress.careerReadiness}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">+5% from last week</p>
        </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Skill Progress</h3>
            <Star className="w-5 h-5 text-green-600" />
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.skillCompleteness}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
                style={{ width: `${overallProgress.skillCompleteness}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">3 skills improved</p>
        </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Learning Streak</h3>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.learningMomentum}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                style={{ width: `${overallProgress.learningMomentum}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">12-day streak</p>
        </div>

  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Profile Strength</h3>
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.profileStrength}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full"
                style={{ width: `${overallProgress.profileStrength}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Complete assessment</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Learning Activity</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">18.9 hours this week</span>
        </div>
        <div className="flex items-end space-x-3 h-32">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg w-full transition-all duration-300 hover:opacity-80"
                style={{ height: `${(day.hours / 4) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2 dark:text-gray-400">{day.day}</span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{day.hours}h</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Achievements</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 dark:text-blue-400 dark:hover:text-blue-300">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {achievements.slice(0, 3).map(achievement => (
            <div key={achievement.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors dark:hover:bg-[#232a3d]">
              <div className={`p-2 rounded-lg border ${getAchievementColor(achievement.category)}`}>
                {getAchievementIcon(achievement)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.earnedDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skill Development Progress</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"> 
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillProgress.map((skill, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.skill}</h4>
              <span className="text-sm text-gray-600 dark:text-gray-300">Level {skill.currentLevel}/{skill.targetLevel}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1 dark:text-gray-300">
                <span>Progress</span>
                <span>{skill.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Last updated: {skill.lastUpdated}</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Achievements</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => (
          <div key={achievement.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-full border ${getAchievementColor(achievement.category)}`}>
                {getAchievementIcon(achievement)}
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
                  {achievement.category}
                </span>
                <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
              </div>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-300">{achievement.description}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Earned {achievement.earnedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Career Goals</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
          Set New Goal
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Current Goals</h4>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2 dark:border-blue-400">
            <h5 className="font-medium text-gray-900 dark:text-white">Become a Data Scientist</h5>
            <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">Target completion: June 2024</p>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-blue-500 h-2 rounded-full w-3/4 dark:bg-blue-400"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">75% complete</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-2 dark:border-green-400">
            <h5 className="font-medium text-gray-900 dark:text-white">Master Python Programming</h5>
            <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">Target completion: April 2024</p>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-green-500 h-2 rounded-full w-3/5 dark:bg-green-400"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">60% complete</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Your Progress</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your career development journey and achievements</p>
      </div>

      {/* Tab Navigation */}
  <div className="border-b border-gray-200 dark:border-[#232a3d]">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'skills', label: 'Skills', icon: Star },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'goals', label: 'Goals', icon: Target },
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'skills' && renderSkills()}
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'goals' && renderGoals()}
      </div>
    </div>
  );
};

export default Progress;