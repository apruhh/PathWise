import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Brain, Heart, Zap } from 'lucide-react';
import { UserProfile, Skill, InterestArea } from '../types/user';
import { calculateCareerMatches } from '../utils/careerMatcher';

interface AssessmentProps {
  onComplete: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

type AssessmentStep = 'skills' | 'interests' | 'goals' | 'preferences';

const Assessment: React.FC<AssessmentProps> = ({ onComplete, currentProfile }) => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('skills');
  const [profile, setProfile] = useState<UserProfile>(currentProfile);

  const steps = [
    { id: 'skills', title: 'Skills Assessment', icon: Brain, description: 'Evaluate your technical and soft skills' },
    { id: 'interests', title: 'Interest Mapping', icon: Heart, description: 'Discover your career interests using RIASEC framework' },
    { id: 'goals', title: 'Career Goals', icon: Zap, description: 'Define your aspirations and priorities' },
    { id: 'preferences', title: 'Work Preferences', icon: Check, description: 'Set your work environment and lifestyle preferences' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as AssessmentStep);
    } else {
      // Complete assessment
      const updatedProfile = {
        ...profile,
        careerMatches: calculateCareerMatches(profile)
      };
      onComplete(updatedProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as AssessmentStep);
    }
  };

  const updateSkills = (skillType: 'technical' | 'soft', skills: Skill[]) => {
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillType]: skills
      }
    }));
  };

  const updateInterests = (interests: InterestArea[]) => {
    setProfile(prev => ({
      ...prev,
      interests
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'skills':
        return <SkillsAssessment profile={profile} updateSkills={updateSkills} />;
      case 'interests':
        return <InterestsAssessment profile={profile} updateInterests={updateInterests} />;
      case 'goals':
        return <GoalsAssessment profile={profile} setProfile={setProfile} />;
      case 'preferences':
        return <PreferencesAssessment profile={profile} setProfile={setProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCompleted 
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStepIndex].title}
          </h2>
          <p className="text-gray-600">{steps[currentStepIndex].description}</p>
        </div>

        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Complete Assessment' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Skills Assessment Component
interface SkillsAssessmentProps {
  profile: UserProfile;
  updateSkills: (skillType: 'technical' | 'soft', skills: Skill[]) => void;
}

const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({ profile, updateSkills }) => {
  const technicalSkillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Machine Learning', 
    'Data Analysis', 'Cloud Computing', 'Cybersecurity', 'Mobile Development', 'DevOps'
  ];

  const softSkillOptions = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability',
    'Critical Thinking', 'Creativity', 'Time Management', 'Project Management', 'Public Speaking'
  ];

  const handleSkillToggle = (skillType: 'technical' | 'soft', skillName: string) => {
    const currentSkills = profile.skills[skillType];
    const existingSkill = currentSkills.find(s => s.name === skillName);
    
    if (existingSkill) {
      // Remove skill
      const updatedSkills = currentSkills.filter(s => s.name !== skillName);
      updateSkills(skillType, updatedSkills);
    } else {
      // Add skill with default proficiency
      const newSkill: Skill = { name: skillName, proficiency: 3, yearsExperience: 1 };
      updateSkills(skillType, [...currentSkills, newSkill]);
    }
  };

  const handleProficiencyChange = (skillType: 'technical' | 'soft', skillName: string, proficiency: number) => {
    const currentSkills = profile.skills[skillType];
    const updatedSkills = currentSkills.map(skill =>
      skill.name === skillName ? { ...skill, proficiency } : skill
    );
    updateSkills(skillType, updatedSkills);
  };

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalSkillOptions.map(skillName => {
            const selectedSkill = profile.skills.technical.find(s => s.name === skillName);
            const isSelected = !!selectedSkill;
            
            return (
              <div key={skillName} className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => handleSkillToggle('technical', skillName)}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {skillName}
                  </button>
                  {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                </div>
                {isSelected && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Proficiency Level:</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          onClick={() => handleProficiencyChange('technical', skillName, level)}
                          className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                            selectedSkill.proficiency >= level
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedSkill.proficiency === 1 && 'Beginner'}
                      {selectedSkill.proficiency === 2 && 'Basic'}
                      {selectedSkill.proficiency === 3 && 'Intermediate'}
                      {selectedSkill.proficiency === 4 && 'Advanced'}
                      {selectedSkill.proficiency === 5 && 'Expert'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Soft Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {softSkillOptions.map(skillName => {
            const selectedSkill = profile.skills.soft.find(s => s.name === skillName);
            const isSelected = !!selectedSkill;
            
            return (
              <div key={skillName} className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => handleSkillToggle('soft', skillName)}
                    className="font-medium text-gray-900 hover:text-green-600 transition-colors"
                  >
                    {skillName}
                  </button>
                  {isSelected && <Check className="w-5 h-5 text-green-600" />}
                </div>
                {isSelected && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Proficiency Level:</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          onClick={() => handleProficiencyChange('soft', skillName, level)}
                          className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                            selectedSkill.proficiency >= level
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Interests Assessment Component
interface InterestsAssessmentProps {
  profile: UserProfile;
  updateInterests: (interests: InterestArea[]) => void;
}

const InterestsAssessment: React.FC<InterestsAssessmentProps> = ({ profile, updateInterests }) => {
  const riasecCategories = [
    {
      type: 'Realistic',
      description: 'Hands-on, practical, physical activities',
      examples: 'Building, fixing, working with tools and machinery',
      color: 'bg-red-500'
    },
    {
      type: 'Investigative',
      description: 'Thinking, analyzing, researching problems',
      examples: 'Scientific research, data analysis, problem-solving',
      color: 'bg-blue-500'
    },
    {
      type: 'Artistic',
      description: 'Creating, designing, expressing creativity',
      examples: 'Art, music, writing, design, creative expression',
      color: 'bg-purple-500'
    },
    {
      type: 'Social',
      description: 'Helping, teaching, caring for others',
      examples: 'Healthcare, education, counseling, community service',
      color: 'bg-green-500'
    },
    {
      type: 'Enterprising',
      description: 'Leading, persuading, managing others',
      examples: 'Business, sales, management, entrepreneurship',
      color: 'bg-orange-500'
    },
    {
      type: 'Conventional',
      description: 'Organizing, processing data, following procedures',
      examples: 'Administration, accounting, data entry, organization',
      color: 'bg-gray-500'
    }
  ];

  const handleInterestChange = (category: string, score: number) => {
    const updatedInterests = profile.interests.map(interest =>
      interest.category === category ? { ...interest, score } : interest
    );
    
    // If interest doesn't exist, add it
    if (!profile.interests.find(interest => interest.category === category)) {
      updatedInterests.push({ category, score });
    }
    
    updateInterests(updatedInterests);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">
        Rate your interest level in each category based on the Holland Code (RIASEC) framework.
        This helps identify careers that align with your natural preferences.
      </p>
      
      {riasecCategories.map(category => {
        const currentInterest = profile.interests.find(i => i.category === category.type);
        const score = currentInterest?.score || 0;
        
        return (
          <div key={category.type} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{category.type[0]}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.type}</h4>
                <p className="text-gray-700 mb-1">{category.description}</p>
                <p className="text-sm text-gray-500 mb-4">{category.examples}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Interest Level:</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Low</span>
                    {[1, 2, 3, 4, 5].map(level => (
                      <button
                        key={level}
                        onClick={() => handleInterestChange(category.type, level)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
                          score >= level
                            ? `${category.color} text-white shadow-md`
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                    <span className="text-sm text-gray-500">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Goals Assessment Component
interface GoalsAssessmentProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const GoalsAssessment: React.FC<GoalsAssessmentProps> = ({ profile, setProfile }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Career Aspirations</h4>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
          placeholder="Describe your career goals and aspirations..."
          value={profile.goals?.shortTerm || ''}
          onChange={(e) => setProfile({
            ...profile,
            goals: { ...profile.goals, shortTerm: e.target.value }
          })}
        />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Salary Expectations</h4>
        <select
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={profile.preferences?.salaryRange || ''}
          onChange={(e) => setProfile({
            ...profile,
            preferences: { ...profile.preferences, salaryRange: e.target.value }
          })}
        >
          <option value="">Select salary range</option>
          <option value="40000-60000">$40,000 - $60,000</option>
          <option value="60000-80000">$60,000 - $80,000</option>
          <option value="80000-100000">$80,000 - $100,000</option>
          <option value="100000-150000">$100,000 - $150,000</option>
          <option value="150000+">$150,000+</option>
        </select>
      </div>
    </div>
  );
};

// Preferences Assessment Component
interface PreferencesAssessmentProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const PreferencesAssessment: React.FC<PreferencesAssessmentProps> = ({ profile, setProfile }) => {
  const workEnvironments = ['Remote', 'Hybrid', 'On-site', 'Flexible'];
  const companySizes = ['Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)'];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Work Environment</h4>
        <div className="grid grid-cols-2 gap-3">
          {workEnvironments.map(env => (
            <button
              key={env}
              onClick={() => setProfile({
                ...profile,
                preferences: { ...profile.preferences, workEnvironment: env }
              })}
              className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                profile.preferences?.workEnvironment === env
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {env}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Size</h4>
        <div className="grid grid-cols-2 gap-3">
          {companySizes.map(size => (
            <button
              key={size}
              onClick={() => setProfile({
                ...profile,
                preferences: { ...profile.preferences, companySize: size }
              })}
              className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                profile.preferences?.companySize === size
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;