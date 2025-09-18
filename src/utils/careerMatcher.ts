import { UserProfile, CareerMatch } from '../types/user';

export const calculateCareerMatches = (profile: UserProfile): CareerMatch[] => {
  const careers: CareerMatch[] = [
    {
      title: 'Software Engineer',
      description: 'Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to build scalable solutions.',
      matchScore: calculateMatchScore(profile, ['JavaScript', 'Python', 'React', 'Problem Solving']),
      salaryRange: '$85,000 - $130,000',
      growthOutlook: 'Excellent (+22%)',
      demandLevel: 'Very High',
      experienceLevel: 'Entry to Mid',
      requiredSkills: ['JavaScript', 'Python', 'React', 'Git', 'Problem Solving', 'Teamwork'],
      careerPath: [
        { title: 'Junior Developer', description: 'Learn fundamentals and work on small features', timeframe: '0-2 years' },
        { title: 'Software Engineer', description: 'Develop full features and contribute to architecture', timeframe: '2-4 years' },
        { title: 'Senior Engineer', description: 'Lead projects and mentor junior developers', timeframe: '4-7 years' },
        { title: 'Tech Lead', description: 'Guide technical decisions and manage teams', timeframe: '7+ years' }
      ]
    },
    {
      title: 'Data Scientist',
      description: 'Analyze complex data to extract insights and build predictive models. Use statistical methods and machine learning to solve business problems.',
      matchScore: calculateMatchScore(profile, ['Python', 'Machine Learning', 'Statistics', 'Problem Solving']),
      salaryRange: '$95,000 - $150,000',
      growthOutlook: 'Excellent (+35%)',
      demandLevel: 'Very High',
      experienceLevel: 'Entry to Mid',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Critical Thinking'],
      careerPath: [
        { title: 'Data Analyst', description: 'Basic data analysis and reporting', timeframe: '0-2 years' },
        { title: 'Data Scientist', description: 'Build models and extract insights', timeframe: '2-5 years' },
        { title: 'Senior Data Scientist', description: 'Lead data science projects', timeframe: '5-8 years' },
        { title: 'Principal Data Scientist', description: 'Define data strategy and architecture', timeframe: '8+ years' }
      ]
    },
    {
      title: 'Full Stack Developer',
      description: 'Work on both frontend and backend development. Build complete web applications from user interface to database.',
      matchScore: calculateMatchScore(profile, ['JavaScript', 'React', 'Node.js', 'Problem Solving']),
      salaryRange: '$80,000 - $125,000',
      growthOutlook: 'Very Good (+15%)',
      demandLevel: 'High',
      experienceLevel: 'Entry to Senior',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Database Design', 'Problem Solving'],
      careerPath: [
        { title: 'Junior Full Stack Developer', description: 'Learn both frontend and backend basics', timeframe: '0-2 years' },
        { title: 'Full Stack Developer', description: 'Build complete applications', timeframe: '2-4 years' },
        { title: 'Senior Full Stack Developer', description: 'Architect complex applications', timeframe: '4-7 years' },
        { title: 'Full Stack Architect', description: 'Design system architecture', timeframe: '7+ years' }
      ]
    },
    {
      title: 'Product Manager',
      description: 'Guide product development from conception to launch. Work with cross-functional teams to define requirements and strategy.',
      matchScore: calculateMatchScore(profile, ['Communication', 'Problem Solving', 'Leadership', 'Project Management']),
      salaryRange: '$90,000 - $140,000',
      growthOutlook: 'Good (+10%)',
      demandLevel: 'High',
      experienceLevel: 'Mid to Senior',
      requiredSkills: ['Communication', 'Project Management', 'User Research', 'Data Analysis', 'Leadership', 'Strategic Thinking'],
      careerPath: [
        { title: 'Associate Product Manager', description: 'Support senior PMs on product features', timeframe: '0-2 years' },
        { title: 'Product Manager', description: 'Own product features and roadmap', timeframe: '2-5 years' },
        { title: 'Senior Product Manager', description: 'Lead multiple products or complex features', timeframe: '5-8 years' },
        { title: 'Director of Product', description: 'Manage product strategy and teams', timeframe: '8+ years' }
      ]
    },
    {
      title: 'UX Designer',
      description: 'Design user experiences for digital products. Research user needs and create intuitive, accessible interfaces.',
      matchScore: calculateMatchScore(profile, ['Creativity', 'Problem Solving', 'Communication', 'User Research']),
      salaryRange: '$75,000 - $120,000',
      growthOutlook: 'Good (+8%)',
      demandLevel: 'Moderate',
      experienceLevel: 'Entry to Senior',
      requiredSkills: ['Design Thinking', 'User Research', 'Prototyping', 'Communication', 'Creativity', 'Empathy'],
      careerPath: [
        { title: 'Junior UX Designer', description: 'Create wireframes and basic prototypes', timeframe: '0-2 years' },
        { title: 'UX Designer', description: 'Own end-to-end design process', timeframe: '2-4 years' },
        { title: 'Senior UX Designer', description: 'Lead design projects and mentor juniors', timeframe: '4-7 years' },
        { title: 'UX Design Lead', description: 'Define design strategy and standards', timeframe: '7+ years' }
      ]
    },
    {
      title: 'DevOps Engineer',
      description: 'Bridge development and operations teams. Automate deployment pipelines and manage cloud infrastructure.',
      matchScore: calculateMatchScore(profile, ['Python', 'Problem Solving', 'Systems Thinking', 'Cloud Computing']),
      salaryRange: '$90,000 - $135,000',
      growthOutlook: 'Excellent (+20%)',
      demandLevel: 'Very High',
      experienceLevel: 'Mid to Senior',
      requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'Cloud Platforms', 'Python', 'Automation', 'Problem Solving'],
      careerPath: [
        { title: 'Junior DevOps Engineer', description: 'Learn infrastructure basics and tooling', timeframe: '0-2 years' },
        { title: 'DevOps Engineer', description: 'Manage CI/CD and cloud infrastructure', timeframe: '2-5 years' },
        { title: 'Senior DevOps Engineer', description: 'Architect deployment strategies', timeframe: '5-8 years' },
        { title: 'DevOps Manager', description: 'Lead infrastructure and platform teams', timeframe: '8+ years' }
      ]
    }
  ];

  // Sort by match score and return top matches
  return careers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12);
};

const calculateMatchScore = (profile: UserProfile, requiredSkills: string[]): number => {
  const allUserSkills = [...profile.skills.technical, ...profile.skills.soft];
  let matchCount = 0;
  let totalProficiency = 0;

  requiredSkills.forEach(requiredSkill => {
    const userSkill = allUserSkills.find(skill => 
      skill.name.toLowerCase().includes(requiredSkill.toLowerCase()) ||
      requiredSkill.toLowerCase().includes(skill.name.toLowerCase())
    );

    if (userSkill) {
      matchCount++;
      totalProficiency += userSkill.proficiency;
    }
  });

  // Calculate base score from skill matches
  const skillMatchRatio = matchCount / requiredSkills.length;
  const avgProficiency = matchCount > 0 ? totalProficiency / matchCount : 0;
  const skillScore = (skillMatchRatio * 0.7) + ((avgProficiency / 5) * 0.3);

  // Add interest alignment bonus
  const investigativeBonus = profile.interests.find(i => i.category === 'Investigative')?.score || 0;
  const interestBonus = (investigativeBonus / 5) * 0.2;

  // Final score (capped at 1.0)
  const finalScore = Math.min(skillScore + interestBonus, 1.0);
  
  // Ensure minimum score for demonstration
  return Math.max(finalScore, 0.4);
};