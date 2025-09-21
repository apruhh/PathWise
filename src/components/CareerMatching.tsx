import React, { useState } from 'react';
import { ActiveTab } from '../App';
import { Star, TrendingUp, DollarSign, MapPin, Clock, Users, ArrowRight, BookOpen } from 'lucide-react';
import { UserProfile, CareerMatch } from '../types/user';

interface CareerMatchingProps {
  userProfile: UserProfile;
  setActiveTab?: (tab: ActiveTab) => void;
}

const CareerMatching: React.FC<CareerMatchingProps> = ({ userProfile, setActiveTab }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const careerMatches = userProfile.careerMatches || [];

  if (careerMatches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 dark:bg-[#232a3d]">
          <Star className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">No Career Matches Yet</h3>
        <p className="text-gray-600 mb-6 dark:text-gray-300">Complete your assessment to discover personalized career recommendations.</p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => setActiveTab && setActiveTab('assessment')}
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
  <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Matches</h2>
          <p className="text-gray-600 dark:text-gray-300">Personalized recommendations based on your profile</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#232a3d]'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#232a3d]'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Career Matches */}
  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {careerMatches.map((career, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white ${
              viewMode === 'list' ? 'flex items-center space-x-6' : ''
            }`}
            onClick={() => setSelectedCareer(career)}
          >
            {/* Match Score */}
            <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                  viewMode === 'list' ? 'mb-0' : ''
                }`}>
                  {Math.round(career.matchScore * 100)}% Match
                </div>
                {viewMode !== 'list' && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
              </div>
            </div>

            {/* Career Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{career.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-300">{career.description}</p>

              {/* Career Stats */}
              <div className={`${viewMode === 'list' ? 'flex items-center space-x-6' : 'space-y-2'}`}>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>{career.salaryRange}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>{career.growthOutlook}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{career.demandLevel}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            {viewMode === 'list' && (
              <div className="flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Career Detail Modal */}
      {selectedCareer && (
        <CareerDetailModal
          career={selectedCareer}
          onClose={() => setSelectedCareer(null)}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

// Career Detail Modal
interface CareerDetailModalProps {
  career: CareerMatch;
  onClose: () => void;
  userProfile: UserProfile;
}

const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ career, onClose, userProfile }) => {
  const skillGaps = career.requiredSkills.filter(
    reqSkill => !userProfile.skills.technical.some(userSkill => 
      userSkill.name.toLowerCase().includes(reqSkill.toLowerCase()) && userSkill.proficiency >= 3
    ) && !userProfile.skills.soft.some(userSkill => 
      userSkill.name.toLowerCase().includes(reqSkill.toLowerCase()) && userSkill.proficiency >= 3
    )
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto dark:bg-[#1a2233] dark:text-white">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{career.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold">
                  {Math.round(career.matchScore * 100)}% Match
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-700 leading-relaxed">{career.description}</p>
              </div>

              {/* Required Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, index) => {
                    const hasSkill = userProfile.skills.technical.some(userSkill => 
                      userSkill.name.toLowerCase().includes(skill.toLowerCase())
                    ) || userProfile.skills.soft.some(userSkill => 
                      userSkill.name.toLowerCase().includes(skill.toLowerCase())
                    );
                    
                    return (
                      <span
                        key={index}
                        className={`px-3 py-2 rounded-xl text-sm font-medium ${
                          hasSkill 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Skill Gaps */}
              {skillGaps.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Skills to Develop</h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-orange-800 font-medium mb-2">
                      Focus on developing these skills to improve your match:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillGaps.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Career Path */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Typical Career Path</h3>
                <div className="space-y-3">
                  {career.careerPath?.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">Salary</span>
                    </div>
                    <span className="font-semibold text-gray-900">{career.salaryRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Growth</span>
                    </div>
                    <span className="font-semibold text-gray-900">{career.growthOutlook}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Demand</span>
                    </div>
                    <span className="font-semibold text-gray-900">{career.demandLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-gray-600">Experience</span>
                    </div>
                    <span className="font-semibold text-gray-900">{career.experienceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  View Learning Path
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Save Career</span>
                </button>
              </div>

              {/* Related Careers */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Related Careers</h3>
                <div className="space-y-2">
                  {['Software Engineer', 'Product Manager', 'UX Designer'].map((related, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <p className="font-medium text-gray-900 text-sm">{related}</p>
                      <p className="text-xs text-gray-600">Similar skills required</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMatching;