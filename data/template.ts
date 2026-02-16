import ModernTheme from '@/templates/modern-1';

// ─────────────────────────────────────────────────────────────────────────────
// Mock portfolio data for the ModernTheme snapshot preview
// ─────────────────────────────────────────────────────────────────────────────
export const MOCK_PORTFOLIO = {
  fullName: 'Jordan Blake',
  jobTitle: 'Full-Stack Engineer',
  email: 'jordan@blake.dev',
  phone: '+1 555 000 1234',
  location: 'San Francisco, CA',
  linkedin: '#',
  github: '#',
  summary:
    'Passionate engineer with 8+ years building scalable products at the intersection of design and engineering.',
  experience: [
    {
      company: 'Vercel',
      role: 'Senior Engineer',
      period: '2021 – Present',
      location: 'Remote',
      description: ['Led edge runtime migration', 'Reduced TTFB by 40%'],
    },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Node', 'Postgres', 'Redis'] },
  ],
  projects: [
    {
      name: 'EdgeKit',
      description: 'Open-source edge middleware toolkit used by 2k+ projects.',
      technologies: ['TypeScript', 'Cloudflare Workers'],
      link: '#',
    },
  ],
  education: [
    {
      institution: 'MIT',
      degree: 'B.Sc. Computer Science',
      period: '2013 – 2017',
      gpa: '3.9',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Template data and types
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATES = [
  {
    id: 1,
    tag: 'Portfolio',
    title: 'Modern Theme',
    description:
      'Animated hero, experience timeline, skill grid, and project showcase. Dark-header, white-body — sharp and professional.',
    author: 'Lena Brandt',
    avatar: 'LB',
    uses: '6.1k',
    accent: '#6366F1',
    preview: 'modern',
  },
  {
    id: 2,
    tag: 'Marketing',
    title: 'Launch Campaign',
    description:
      'A full-funnel campaign kit — hero copy, email sequence, social briefs, and A/B variants ready to ship.',
    author: 'Aria Chen',
    avatar: 'AC',
    uses: '4.2k',
    accent: '#FF6B35',
    preview: 'abstract',
  },
  {
    id: 3,
    tag: 'Engineering',
    title: 'API Blueprint',
    description:
      'OpenAPI spec scaffold, error-handling patterns, auth middleware, and rate-limit strategy out of the box.',
    author: 'Dev Patel',
    avatar: 'DP',
    uses: '9.8k',
    accent: '#00D9C0',
    preview: 'abstract',
  },
  {
    id: 4,
    tag: 'Analytics',
    title: 'KPI Dashboard',
    description:
      'Pre-wired charts, metric cards, and filter logic. Connect your data source and go live in minutes.',
    author: 'Sam Torres',
    avatar: 'ST',
    uses: '3.5k',
    accent: '#F7D35E',
    preview: 'abstract',
  },
];



export const templatesData = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with smooth animations',
    Component: ModernTheme,
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant with focus on content',
    Component: ModernTheme,
  },
];

export const CATEGORIES = [
  'All',
  'Portfolio',
  'Marketing',
  'Engineering',
  'Analytics',
];
