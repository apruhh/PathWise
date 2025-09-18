export interface PersonalInfo {
  name: string;
  email: string;
  age?: number;
  education?: string;
  location?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 1-5 scale
  yearsExperience?: number;
}

export interface InterestArea {
  category: string; // RIASEC categories
  score: number; // 1-5 scale
}

export interface Goal {
  shortTerm?: string;
  longTerm?: string;
  salaryExpectation?: string;
}

export interface Preferences {
  workEnvironment?: string;
  companySize?: string;
  salaryRange?: string;
  industryPreferences?: string[];
}

export interface CareerStep {
  title: string;
  description: string;
  timeframe: string;
}

export interface CareerMatch {
  title: string;
  description: string;
  matchScore: number; // 0-1 scale
  salaryRange: string;
  growthOutlook: string;
  demandLevel: string;
  experienceLevel: string;
  requiredSkills: string[];
  careerPath?: CareerStep[];
  industryTrends?: string[];
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  skills: {
    technical: Skill[];
    soft: Skill[];
  };
  interests: InterestArea[];
  goals?: Goal;
  preferences?: Preferences;
  careerMatches?: CareerMatch[];
  lastAssessmentDate?: string;
}