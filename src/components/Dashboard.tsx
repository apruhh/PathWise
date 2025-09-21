import React from 'react';
import { TrendingUp, Target, Brain, BookOpen, Award, ArrowRight, BarChart3, Users, Globe } from 'lucide-react';
import { UserProfile } from '../types/user';

interface DashboardProps {
  userProfile: UserProfile;
  hasCompletedAssessment: boolean;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, hasCompletedAssessment, setActiveTab }) => {
  const stats = [
    { label: 'Career Matches', value: hasCompletedAssessment ? '12' : '0', icon: Target, color: 'bg-blue-500', tab: 'careers' },
    { label: 'Skills Assessed', value: userProfile.skills.technical.length + userProfile.skills.soft.length, icon: Brain, color: 'bg-green-500', tab: 'assessment' },
    { label: 'Learning Paths', value: hasCompletedAssessment ? '8' : '0', icon: BookOpen, color: 'bg-purple-500', tab: 'learning' },
    { label: 'Progress Score', value: hasCompletedAssessment ? '78%' : '15%', icon: Award, color: 'bg-orange-500', tab: 'progress' },
  ];

  const industryTrends = [
    { industry: 'Artificial Intelligence', growth: '+24%', jobs: '2.3M', icon: Brain },
    { industry: 'Data Science', growth: '+18%', jobs: '1.8M', icon: BarChart3 },
    { industry: 'Cybersecurity', growth: '+15%', jobs: '3.5M', icon: Globe },
    { industry: 'Cloud Computing', growth: '+22%', jobs: '1.6M', icon: TrendingUp },
  ];

  const recentActivities = [
    { action: 'Completed Python skill assessment', time: '2 hours ago', type: 'skill' },
    { action: 'New career match: Data Scientist', time: '1 day ago', type: 'career' },
    { action: 'Started Machine Learning course', time: '3 days ago', type: 'learning' },
    { action: 'Updated profile preferences', time: '5 days ago', type: 'profile' },
  ];

  return (
  <div className="space-y-8">
      {/* Welcome Section */}
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile.personalInfo.name.split(' ')[0]}!
            </h2>
            <p className="text-blue-100 text-lg">
              {hasCompletedAssessment 
                ? "Your personalized career insights are ready to explore."
                : "Complete your assessment to unlock personalized career recommendations."
              }
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        {!hasCompletedAssessment && (
          <div className="mt-6">
            <button
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
              onClick={() => setActiveTab('assessment')}
            >
              <Brain className="w-5 h-5" />
              <span>Start Career Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <button
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 w-full text-left focus:outline-none dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white"
              onClick={() => setActiveTab(stat.tab)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Industry Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Industry Trends</h3>
              <span className="text-sm text-gray-500 dark:text-white">Real-time data</span>
            </div>
          <div className="space-y-4">
            {industryTrends.map((trend, index) => {
              const IconComponent = trend.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-[#232a3d] dark:hover:bg-[#232a3d]">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{trend.industry}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{trend.jobs} open positions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">{trend.growth}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">growth</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
            <h3 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors dark:hover:bg-[#232a3d]">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  activity.type === 'skill' ? 'bg-green-400' :
                  activity.type === 'career' ? 'bg-blue-400' :
                  activity.type === 'learning' ? 'bg-purple-400' : 'bg-gray-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white">
  <h3 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group dark:bg-[#232a3d] dark:border-[#232a3d]">
            <Target className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2 dark:text-blue-400" />
            <p className="font-medium text-gray-700 group-hover:text-blue-600 dark:text-white">Explore Careers</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group dark:bg-[#232a3d] dark:border-[#232a3d]">
            <BookOpen className="w-8 h-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2 dark:text-green-400" />
            <p className="font-medium text-gray-700 group-hover:text-green-600 dark:text-white">Start Learning</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group dark:bg-[#232a3d] dark:border-[#232a3d]">
            <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mx-auto mb-2 dark:text-purple-400" />
            <p className="font-medium text-gray-700 group-hover:text-purple-600 dark:text-white">Connect</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;