export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface PortfolioData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  interests?: string[];
}

export type ThemeType = 'modern' | 'minimalist' | 'creative';
