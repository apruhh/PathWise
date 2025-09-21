import React, { useState } from 'react';
import { BookOpen, Clock, Star, Play, CheckCircle, Award, TrendingUp, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { UserProfile } from '../types/user';

interface LearningPathsProps {
  userProfile: UserProfile;
}

interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'certification' | 'project' | 'book';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  price: 'Free' | 'Paid' | string;
  description: string;
  skills: string[];
  url?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetCareer: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resources: LearningResource[];
  milestones: string[];
}

interface GeneratedLearningStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface GeneratedLearningPath {
  learningPath: GeneratedLearningStep[] | null;
  rawResponse?: string;
  message?: string;
}

const LearningPaths: React.FC<LearningPathsProps> = ({ userProfile }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [generatedPath, setGeneratedPath] = useState<GeneratedLearningStep[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Generate personalized learning path using AI
  const generatePersonalizedPath = async () => {
    console.log('🚀 [FRONTEND] Starting learning path generation...');
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      // Extract skills, interests, and weaknesses from user profile
      const skills = userProfile.skills.technical.map(skill => skill.name);
      const interests = userProfile.interests.map(interest => interest.category);
      const weaknesses = userProfile.skills.technical
        .filter(skill => skill.proficiency < 3)
        .map(skill => skill.name);

      console.log('📝 [FRONTEND] Extracted data:', { skills, interests, weaknesses });

      const requestBody = {
        skills,
        interests,
        weaknesses
      };

      console.log('📤 [FRONTEND] Sending request to:', 'http://localhost:3001/api/generate-path');
      console.log('📤 [FRONTEND] Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('http://localhost:3001/api/generate-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 [FRONTEND] Response status:', response.status);
      console.log('📥 [FRONTEND] Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [FRONTEND] HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: GeneratedLearningPath = await response.json();
      console.log('📥 [FRONTEND] Response data:', data);
      
      if (data.learningPath) {
        console.log('✅ [FRONTEND] Successfully received learning path with', data.learningPath.length, 'steps');
        setGeneratedPath(data.learningPath);
      } else {
        console.log('⚠️ [FRONTEND] No learning path in response, message:', data.message);
        setGenerationError(data.message || 'Failed to generate learning path');
        console.error('Raw response:', data.rawResponse);
      }
    } catch (error) {
      console.error('❌ [FRONTEND] Error generating learning path:', error);
      console.error('❌ [FRONTEND] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      setGenerationError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      console.log('🏁 [FRONTEND] Learning path generation completed');
      setIsGenerating(false);
    }
  };

  // Generate learning paths based on user profile
  const learningPaths: LearningPath[] = [
    {
      id: 'data-scientist',
      title: 'Data Scientist Learning Path',
      description: 'Comprehensive path to become a data scientist with focus on machine learning and analytics',
      targetCareer: 'Data Scientist',
      estimatedTime: '6-8 months',
      difficulty: 'Intermediate',
      milestones: [
        'Master Python fundamentals',
        'Learn data manipulation with Pandas',
        'Understanding statistics and probability',
        'Master machine learning algorithms',
        'Complete real-world projects'
      ],
      resources: [
        {
          id: 'python-basics',
          title: 'Python for Data Science',
          provider: 'DataCamp',
          type: 'course',
          duration: '20 hours',
          difficulty: 'Beginner',
          rating: 4.8,
          price: 'Paid',
          description: 'Learn Python programming fundamentals with focus on data science applications',
          skills: ['Python', 'Data Analysis'],
          url: 'https://datacamp.com'
        },
        {
          id: 'ml-course',
          title: 'Machine Learning Specialization',
          provider: 'Coursera',
          type: 'certification',
          duration: '3 months',
          difficulty: 'Intermediate',
          rating: 4.9,
          price: 'Paid',
          description: 'Comprehensive machine learning course by Andrew Ng',
          skills: ['Machine Learning', 'Statistics'],
          url: 'https://coursera.org'
        },
        {
          id: 'data-viz',
          title: 'Data Visualization with Python',
          provider: 'Kaggle Learn',
          type: 'course',
          duration: '4 hours',
          difficulty: 'Beginner',
          rating: 4.6,
          price: 'Free',
          description: 'Create compelling visualizations using matplotlib and seaborn',
          skills: ['Data Visualization', 'Python'],
          url: 'https://kaggle.com/learn'
        }
      ]
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer Learning Path',
      description: 'Complete roadmap to become a full-stack software engineer',
      targetCareer: 'Software Engineer',
      estimatedTime: '4-6 months',
      difficulty: 'Beginner',
      milestones: [
        'Learn HTML, CSS, JavaScript',
        'Master React framework',
        'Understand backend development',
        'Learn database management',
        'Build full-stack applications'
      ],
      resources: [
        {
          id: 'web-dev-bootcamp',
          title: 'The Complete Web Developer Bootcamp',
          provider: 'Udemy',
          type: 'course',
          duration: '65 hours',
          difficulty: 'Beginner',
          rating: 4.7,
          price: 'Paid',
          description: 'Learn full-stack web development from scratch',
          skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
          url: 'https://udemy.com'
        },
        {
          id: 'react-advanced',
          title: 'Advanced React Patterns',
          provider: 'Frontend Masters',
          type: 'course',
          duration: '8 hours',
          difficulty: 'Advanced',
          rating: 4.8,
          price: 'Paid',
          description: 'Master advanced React concepts and patterns',
          skills: ['React', 'JavaScript'],
          url: 'https://frontendmasters.com'
        }
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager Learning Path',
      description: 'Develop product management skills and strategic thinking',
      targetCareer: 'Product Manager',
      estimatedTime: '3-4 months',
      difficulty: 'Intermediate',
      milestones: [
        'Learn product strategy',
        'Master user research methods',
        'Understand agile methodology',
        'Practice data-driven decisions',
        'Build product roadmaps'
      ],
      resources: [
        {
          id: 'product-management',
          title: 'Product Management Fundamentals',
          provider: 'Coursera',
          type: 'certification',
          duration: '2 months',
          difficulty: 'Intermediate',
          rating: 4.7,
          price: 'Paid',
          description: 'Learn core product management skills and frameworks',
          skills: ['Product Strategy', 'User Research', 'Analytics'],
          url: 'https://coursera.org'
        }
      ]
    }
  ];

  const toggleResourceComplete = (resourceId: string) => {
    const newCompleted = new Set(completedResources);
    if (newCompleted.has(resourceId)) {
      newCompleted.delete(resourceId);
    } else {
      newCompleted.add(resourceId);
    }
    setCompletedResources(newCompleted);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <Play className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      case 'project': return <TrendingUp className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Learning Paths</h2>
          <p className="text-gray-600 dark:text-gray-300">Personalized learning journeys to achieve your career goals</p>
        </div>
        <button
          onClick={generatePersonalizedPath}
          disabled={isGenerating}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span>{isGenerating ? 'Generating...' : 'Generate Personalized Path'}</span>
        </button>
      </div>

      {/* Generated Learning Path */}
      {generatedPath && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 dark:bg-[#1a1a2e] dark:border-purple-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Personalized Learning Path</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-generated based on your skills, interests, and areas for improvement</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {generatedPath.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 dark:bg-[#16213e] dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Duration: {step.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generation Error */}
      {generationError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200">Generation Error</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">{generationError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Learning Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map(path => (
          <div
            key={path.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer dark:bg-[#1a2233] dark:border-[#232a3d] dark:text-white"
            onClick={() => setSelectedPath(path)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}>
                {path.difficulty}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{path.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 dark:text-white">{path.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Target Career:</span>
                <span className="font-medium text-blue-600 dark:text-white">{path.targetCareer}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Duration:</span>
                <span className="font-medium text-gray-900 dark:text-white">{path.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-white">Resources:</span>
                <span className="font-medium text-gray-900 dark:text-white">{path.resources.length} items</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-white">Progress</span>
                <span className="text-sm font-medium text-blue-600 dark:text-white">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Gap Analysis */}
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-[#181e2a] dark:border-[#232a3d] dark:text-white">
  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Skill Gap Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-xl dark:bg-[#1e1e2e] dark:border dark:border-[#232a3d]">
            <div className="text-2xl font-bold text-red-600 mb-2 dark:text-[#f87171]">5</div>
            <p className="text-sm text-red-700 dark:text-white">Skills to Develop</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl dark:bg-[#1e1e2e] dark:border dark:border-[#232a3d]">
            <div className="text-2xl font-bold text-yellow-600 mb-2 dark:text-[#fde047]">3</div>
            <p className="text-sm text-yellow-700 dark:text-white">Skills to Improve</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl dark:bg-[#1e1e2e] dark:border dark:border-[#232a3d]">
            <div className="text-2xl font-bold text-green-600 mb-2 dark:text-[#4ade80]">8</div>
            <p className="text-sm text-green-700 dark:text-white">Skills Mastered</p>
          </div>
        </div>
      </div>

      {/* Learning Path Detail Modal */}
      {selectedPath && (
        <LearningPathModal
          path={selectedPath}
          onClose={() => setSelectedPath(null)}
          completedResources={completedResources}
          onToggleComplete={toggleResourceComplete}
        />
      )}
    </div>
  );
};

// Learning Path Detail Modal
interface LearningPathModalProps {
  path: LearningPath;
  onClose: () => void;
  completedResources: Set<string>;
  onToggleComplete: (resourceId: string) => void;
}

const LearningPathModal: React.FC<LearningPathModalProps> = ({ 
  path, 
  onClose, 
  completedResources, 
  onToggleComplete 
}) => {
  const completedCount = path.resources.filter(r => completedResources.has(r.id)).length;
  const progressPercentage = (completedCount / path.resources.length) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <Play className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      case 'project': return <TrendingUp className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h2>
              <p className="text-gray-600">{path.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <p className="text-gray-600">
                  {completedCount} of {path.resources.length} resources completed
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Learning Resources */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Resources</h3>
              <div className="space-y-4">
                {path.resources.map((resource, index) => {
                  const isCompleted = completedResources.has(resource.id);
                  return (
                    <div
                      key={resource.id}
                      className={`border rounded-xl p-4 transition-all duration-200 ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <button
                          onClick={() => onToggleComplete(resource.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-blue-500'
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-4 h-4" />}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1 text-blue-600">
                              {getTypeIcon(resource.type)}
                              <span className="text-sm font-medium capitalize">{resource.type}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                              {resource.difficulty}
                            </span>
                            <span className="text-sm text-gray-500">{resource.duration}</span>
                          </div>

                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">by {resource.provider}</p>
                          <p className="text-gray-700 mb-3">{resource.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{resource.rating}</span>
                              </div>
                              <span className={`text-sm font-medium ${
                                resource.price === 'Free' ? 'text-green-600' : 'text-blue-600'
                              }`}>
                                {resource.price}
                              </span>
                            </div>
                            {resource.url && (
                              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <span>Visit</span>
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {resource.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Path Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Path Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Target Career</span>
                    <span className="font-medium text-blue-600">{path.targetCareer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">{path.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
                <div className="space-y-3">
                  {path.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700 flex-1">{milestone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Start Learning Path
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Bookmark Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;