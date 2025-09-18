import { UserProfile } from '../types/user';

export const generateInitialProfile = (): UserProfile => {
  return {
    personalInfo: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      age: 24,
      education: 'Bachelor\'s in Computer Science',
      location: 'San Francisco, CA'
    },
    skills: {
      technical: [
        { name: 'JavaScript', proficiency: 3, yearsExperience: 2 },
        { name: 'Python', proficiency: 2, yearsExperience: 1 },
        { name: 'React', proficiency: 3, yearsExperience: 2 },
      ],
      soft: [
        { name: 'Communication', proficiency: 4, yearsExperience: 3 },
        { name: 'Problem Solving', proficiency: 4, yearsExperience: 3 },
        { name: 'Teamwork', proficiency: 4, yearsExperience: 3 },
      ]
    },
    interests: [
      { category: 'Investigative', score: 4 },
      { category: 'Artistic', score: 3 },
      { category: 'Conventional', score: 2 },
    ],
    goals: {
      shortTerm: 'Become a full-stack developer',
      longTerm: 'Lead a technical team in a startup',
      salaryExpectation: '$80,000 - $100,000'
    },
    preferences: {
      workEnvironment: 'Hybrid',
      companySize: 'Startup (1-50)',
      salaryRange: '80000-100000'
    },
    careerMatches: []
  };
};