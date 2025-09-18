import React, { useState } from 'react';
import { BookOpen, Clock, Star, Play, CheckCircle, Award, TrendingUp, ExternalLink } from 'lucide-react';
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

const LearningPaths: React.FC<LearningPathsProps> = ({ userProfile }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());

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
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Paths</h2>
        <p className="text-gray-600">Personalized learning journeys to achieve your career goals</p>
      </div>

      {/* Learning Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map(path => (
          <div
            key={path.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
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

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{path.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Target Career:</span>
                <span className="font-medium text-blue-600">{path.targetCareer}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{path.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Resources:</span>
                <span className="font-medium text-gray-900">{path.resources.length} items</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Gap Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Gap Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600 mb-2">5</div>
            <p className="text-sm text-red-700">Skills to Develop</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl font-bold text-yellow-600 mb-2">3</div>
            <p className="text-sm text-yellow-700">Skills to Improve</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-2">8</div>
            <p className="text-sm text-green-700">Skills Mastered</p>
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