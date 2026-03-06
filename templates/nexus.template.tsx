'use client';

import { useState, useEffect, useRef, useMemo, type ReactNode, type CSSProperties } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'motion/react';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string | null;
  previewUrl: string | null;
  screenshot: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  followers: number;
  contributions: number;
}

export interface PortfolioData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  githubUsername?: string;
  profileImage?: string;
  summary?: string;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: Project[];
  education: EducationItem[];
  githubStats: GitHubStats;
}

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

const DEFAULT_DATA: PortfolioData = {
  fullName: 'Alex Rivera',
  jobTitle: 'Full-Stack Engineer & Creative Technologist',
  email: 'alex@rivera.dev',
  phone: '+1 (555) 012-3456',
  location: 'San Francisco, CA',
  linkedin: 'https://linkedin.com/in/alexrivera',
  github: 'https://github.com/alexrivera',
  githubUsername: 'alexrivera',
  profileImage:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  summary:
    'I craft digital experiences at the intersection of engineering and design. 8+ years shipping products used by millions — from real-time collaboration tools to ML-powered interfaces.',
  experience: [
    {
      company: 'Vercel',
      role: 'Senior Software Engineer',
      period: '2022 — Present',
      location: 'Remote',
      description: [
        'Led the redesign of the deployment pipeline UI, reducing time-to-deploy by 40%.',
        'Built the Edge Config SDK used by 50,000+ projects worldwide.',
        'Mentored a team of 4 engineers across two time zones.',
      ],
    },
    {
      company: 'Stripe',
      role: 'Software Engineer II',
      period: '2019 — 2022',
      location: 'San Francisco, CA',
      description: [
        'Developed the Radar fraud detection dashboard, processing 2B+ daily events.',
        'Reduced dashboard p95 load time from 4.2s to 800ms via query optimisation.',
        'Shipped the redesigned Payments API docs with interactive code samples.',
      ],
    },
    {
      company: 'Airbnb',
      role: 'Frontend Engineer',
      period: '2017 — 2019',
      location: 'San Francisco, CA',
      description: [
        'Built the host onboarding flow with a 30% improvement in completion rate.',
        'Contributed to the design system used across 200+ product teams.',
      ],
    },
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'WebGL'] },
    { category: 'Backend', items: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'GraphQL', 'REST'] },
    { category: 'Infrastructure', items: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
    { category: 'Design', items: ['Figma', 'Design Systems', 'Prototyping', 'Motion Design', 'A/B Testing'] },
  ],
  projects: [
    {
      name: 'Liveblocks Clone',
      description:
        'A real-time collaborative whiteboard with multiplayer cursors, rich presence, and conflict-free document sync built on CRDTs.',
      technologies: ['Next.js', 'TypeScript', 'WebSockets', 'CRDTs', 'Canvas API'],
      link: 'https://example.com',
      previewUrl: 'https://example.com',
      screenshot: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=800&h=500&fit=crop',
    },
    {
      name: 'AI Code Review',
      description:
        'GitHub App that provides AI-powered inline code review suggestions, security scanning, and performance analysis on every PR.',
      technologies: ['TypeScript', 'OpenAI', 'GitHub API', 'Postgres', 'Railway'],
      link: 'https://example.com',
      previewUrl: null,
      screenshot: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    },
    {
      name: 'Design System Kit',
      description:
        'An open-source component library with 80+ accessible components, Figma tokens integration, and automatic Storybook docs generation.',
      technologies: ['React', 'Radix UI', 'CSS Variables', 'Storybook', 'Figma Tokens'],
      link: 'https://example.com',
      previewUrl: 'https://example.com',
      screenshot: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop',
    },
    {
      name: 'Flux Dashboard',
      description:
        'Real-time analytics platform visualising millions of events/sec with WebGL-powered charts and sub-100ms query performance.',
      technologies: ['React', 'WebGL', 'ClickHouse', 'Kafka', 'Go'],
      link: 'https://example.com',
      previewUrl: null,
      screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    },
  ],
  education: [
    {
      institution: 'Carnegie Mellon University',
      degree: 'B.S. Computer Science',
      period: '2013 — 2017',
      gpa: '3.9',
    },
  ],
  githubStats: {
    repos: 87,
    stars: 2400,
    commits: 3812,
    followers: 934,
    contributions: 1247,
  },
};

// ─────────────────────────────────────────────────────────────
// FONT STYLE  (shared inline style object avoids repetition)
// ─────────────────────────────────────────────────────────────

const FONT_DISPLAY: CSSProperties = { fontFamily: "'Syne', sans-serif" };
const FONT_BODY: CSSProperties = { fontFamily: "'Outfit', sans-serif" };
const FONT_MONO: CSSProperties = { fontFamily: "'DM Mono', monospace" };

// ─────────────────────────────────────────────────────────────
// HOOK – count-up animation
// ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, trigger = true): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let rafId: number;
    let startTime: number | null = null;

    const step = (ts: number): void => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, trigger]);

  return count;
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

interface SectionLabelProps { children: ReactNode }
function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[#39d353] mb-3"
      style={FONT_MONO}
    >
      {children}
      <span className="w-10 h-px bg-[#39d353] opacity-40" />
    </div>
  );
}

interface SectionTitleProps { children: ReactNode; className?: string }
function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-14 ${className}`}
      style={FONT_DISPLAY}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="w-full h-px bg-white/[0.07]" />;
}

// ─────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────

interface NavbarProps { name: string; email: string }
function Navbar({ name, email }: NavbarProps) {
  const navLinks = ['About', 'GitHub', 'Experience', 'Projects', 'Skills'] as const;

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between
                 px-6 md:px-12 py-5
                 bg-gradient-to-b from-[#090c10]/90 to-transparent backdrop-blur-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="text-lg font-bold tracking-tight text-white" style={FONT_DISPLAY}>
        {name.split(' ')[0]}
        <span className="text-[#39d353]">.</span>
      </span>

      <div className="hidden md:flex gap-8">
        {navLinks.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-[10px] uppercase tracking-widest text-[#7d8590]
                       hover:text-[#39d353] transition-colors duration-200"
            style={FONT_MONO}
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href={`mailto:${email}`}
        className="text-[10px] uppercase tracking-widest border border-[#39d353] text-[#39d353]
                   px-4 py-2 rounded hover:bg-[#39d353] hover:text-[#090c10] transition-all duration-200"
        style={FONT_MONO}
      >
        Hire Me
      </a>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE IMAGE
// ─────────────────────────────────────────────────────────────

interface ProfileImageProps { src?: string; name: string }
function ProfileImage({ src, name }: ProfileImageProps) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=240&background=0f1318&color=39d353`;

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
    >
      {/* Spinning conic ring – inline style required; Tailwind has no conic-gradient utility */}
      <motion.div
        className="absolute -inset-[10px] rounded-full"
        style={{
          background: 'conic-gradient(#39d353, #58a6ff, #f78166, #39d353)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <img
        src={src ?? fallback}
        alt={name}
        className="relative z-10 w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#090c10]"
      />

      <div
        className="absolute -bottom-1 -right-5 z-20 flex items-center gap-2 px-3 py-1.5
                   bg-[#161b22] border border-white/10 rounded-full
                   text-[11px] text-[#7d8590] shadow-xl shadow-black/60"
        style={FONT_MONO}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39d353] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39d353]" />
        </span>
        Open to work
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────

// Typed contact chip – either a link (has href) or a plain span
type ContactLink = { href: string; label: string; external: boolean };
type ContactSpan = { href?: undefined; label: string };
type ContactItem = ContactLink | ContactSpan;

interface HeroSectionProps { data: PortfolioData; isScaledDown: boolean }

function HeroSection({ data, isScaledDown }: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const contacts: ContactItem[] = [
    ...(data.email ? [{
      href: `mailto:${data.email}`, label: data.email,
      external: false
    } satisfies ContactLink] : []),
    ...(data.location ? [{ label: data.location } satisfies ContactSpan] : []),
    ...(data.github && data.githubUsername
      ? [{ href: data.github, label: `@${data.githubUsername}`, external: true } satisfies ContactLink]
      : []),
  ];

  const [firstName, ...rest] = data.fullName.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute -top-32 -right-32 w-150 h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(57,211,83,0.07) 0%, transparent 70%)' }}
      />

      <motion.div
        style={!isScaledDown ? { y, opacity } : {}}
        className="max-w-5xl mx-auto w-full
                   grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center"
      >
        {/* Text column */}
        <div>
          <motion.div
            className="inline-flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.15em] text-[#39d353]"
            style={FONT_MONO}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-5 h-px bg-[#39d353]" />
            Available for new opportunities
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-white mb-4"
            style={FONT_DISPLAY}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="text-[#39d353]">{firstName}</span>
            {lastName && <> {lastName}</>}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#7d8590] font-light max-w-xl leading-relaxed mb-8"
            style={FONT_BODY}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {data.jobTitle}
          </motion.p>

          {/* Contact chips */}
          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {contacts.map((item, i) =>
              item.href !== undefined ? (
                <a
                  key={i}
                  href={item.href}
                  target={(item as ContactLink).external ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[12px] text-[#7d8590]
                             hover:text-[#58a6ff] transition-colors duration-200"
                  style={FONT_MONO}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] shrink-0" />
                  {item.label}
                </a>
              ) : (
                <span
                  key={i}
                  className="flex items-center gap-2 text-[12px] text-[#7d8590]"
                  style={FONT_MONO}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] shrink-0" />
                  {item.label}
                </span>
              )
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="px-7 py-3.5 bg-[#39d353] text-[#090c10] rounded font-bold text-sm
                         tracking-wide hover:shadow-[0_8px_24px_rgba(57,211,83,0.35)]
                         transition-all duration-200"
              style={FONT_DISPLAY}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>

            {data.linkedin && (
              <motion.a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 border border-white/15 text-white rounded font-semibold
                           text-sm tracking-wide hover:border-[#58a6ff] hover:text-[#58a6ff]
                           transition-all duration-200"
                style={FONT_DISPLAY}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                LinkedIn →
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Profile image – first on mobile */}
        <div className="order-first md:order-last flex justify-center">
          <ProfileImage src={data.profileImage} name={data.fullName} />
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────

interface StatCardProps {
  value: number;
  label: string;
  icon: string;
  delay?: number;
}
function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2 p-5 md:p-6
                 bg-[#161b22] border border-white/[0.08] rounded-lg
                 cursor-default hover:border-white/[0.15] transition-colors duration-200"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
      <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none" style={FONT_DISPLAY}>
        {count.toLocaleString()}
        {value >= 1000 ? '+' : ''}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-[#7d8590]" style={FONT_MONO}>
        {label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTRIBUTION GRAPH
// ─────────────────────────────────────────────────────────────

const CONTRIB_COLORS: readonly string[] = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const CONTRIB_WEIGHTS: readonly number[] = [0.45, 0.25, 0.15, 0.1, 0.05];

interface ContributionGraphProps { contributions: number }
function ContributionGraph({ contributions }: ContributionGraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const cells = useMemo<number[]>(() => {
    return Array.from({ length: 53 * 7 }, () => {
      const r = Math.random();
      let cum = 0;
      for (let i = 0; i < CONTRIB_WEIGHTS.length; i++) {
        cum += CONTRIB_WEIGHTS[i];
        if (r < cum) return i;
      }
      return 0;
    });
  }, []);

  return (
    <div ref={ref}>
      <p className="text-xs text-[#7d8590] mb-4" style={FONT_MONO}>
        {contributions.toLocaleString()} contributions in the last year
      </p>

      {/* gridTemplateColumns must be inline – Tailwind can't generate 53-col variants at build time */}
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}>
        {cells.map((level, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-[2px] cursor-default"
            style={{ backgroundColor: CONTRIB_COLORS[level] }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.15, delay: i * 0.0007 }}
            whileHover={{ scale: 1.8, zIndex: 10 }}
            title={`${level * 3} contributions`}
          />
        ))}
      </div>

      <div
        className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-[#7d8590]"
        style={FONT_MONO}
      >
        <span>Less</span>
        {CONTRIB_COLORS.map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GITHUB SECTION
// ─────────────────────────────────────────────────────────────

type StatItemKey = keyof GitHubStats;
interface StatItemConfig {
  key: StatItemKey;
  label: string;
  icon: string;
  delay: number;
}

const STAT_ITEMS: StatItemConfig[] = [
  { key: 'repos', label: 'Repositories', icon: '📦', delay: 0 },
  { key: 'stars', label: 'Stars Earned', icon: '⭐', delay: 0.08 },
  { key: 'commits', label: 'Commits', icon: '🔨', delay: 0.16 },
  { key: 'followers', label: 'Followers', icon: '👥', delay: 0.24 },
  { key: 'contributions', label: 'This Year', icon: '📈', delay: 0.32 },
];

interface GithubSectionProps {
  github?: string;
  githubUsername?: string;
  githubStats: GitHubStats;
}
function GithubSection({ github, githubUsername, githubStats }: GithubSectionProps) {
  return (
    <section id="github" className="bg-[#0f1318] py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Open Source</SectionLabel>
            <SectionTitle className="mb-0">GitHub Activity</SectionTitle>
          </div>
          {github && githubUsername && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#58a6ff] hover:underline"
              style={FONT_MONO}
            >
              @{githubUsername}
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {STAT_ITEMS.map(({ key, label, icon, delay }) => (
            <StatCard
              key={key}
              value={githubStats[key]}
              label={label}
              icon={icon}
              delay={delay}
            />
          ))}
        </div>

        <ContributionGraph contributions={githubStats.contributions} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPERIENCE TIMELINE
// ─────────────────────────────────────────────────────────────

interface TimelineItemProps { exp: ExperienceItem; index: number }
function TimelineItem({ exp, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8"
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <span
        className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#39d353]
                   border-2 border-[#090c10] shadow-[0_0_0_3px_rgba(57,211,83,0.2)]"
      />

      <div className="flex flex-wrap justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight" style={FONT_DISPLAY}>
            {exp.role}
          </h3>
          <p className="text-sm text-[#58a6ff] font-medium mt-0.5" style={FONT_BODY}>
            {exp.company}
            <span className="text-[#7d8590] font-normal"> · {exp.location}</span>
          </p>
        </div>
        <span className="text-xs text-[#7d8590] mt-1 whitespace-nowrap" style={FONT_MONO}>
          {exp.period}
        </span>
      </div>

      <ul className="space-y-2.5">
        {exp.description.map((desc, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] text-[#7d8590] leading-relaxed" style={FONT_BODY}>
            <span className="text-[#39d353] text-xs mt-1.5 shrink-0" aria-hidden="true">▸</span>
            {desc}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface ExperienceSectionProps { experience: ExperienceItem[] }
function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Career</SectionLabel>
        <SectionTitle>Professional Experience</SectionTitle>

        <div className="relative border-l border-white/[0.08] space-y-14">
          {experience.map((exp, i) => (
            <TimelineItem key={`${exp.company}-${exp.period}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────

interface SkillsSectionProps { skills: SkillGroup[] }
function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Expertise</SectionLabel>
        <SectionTitle>Technical Skills</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((group) => (
            <motion.div
              key={group.category}
              className="p-7 bg-[#161b22] border border-white/[0.08] rounded-lg
                         hover:border-white/[0.15] transition-colors duration-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#39d353] mb-4" style={FONT_MONO}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-white/[0.05]
                               border border-white/[0.08] rounded cursor-default
                               hover:bg-[#58a6ff]/10 hover:border-[#58a6ff]/40 hover:text-[#58a6ff]
                               transition-all duration-200"
                    style={FONT_BODY}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────

type PreviewMode = 'screenshot' | 'preview';

interface ProjectCardProps { project: Project; index: number }
function ProjectCard({ project, index }: ProjectCardProps) {
  const [mode, setMode] = useState<PreviewMode>('screenshot');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className="group bg-[#161b22] border border-white/[0.08] rounded-lg overflow-hidden
                 hover:border-white/[0.15] transition-colors duration-200"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#0f1318] border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shrink-0" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shrink-0" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c841] shrink-0" aria-hidden="true" />

        <span className="flex-1 mx-2 text-[10px] text-[#7d8590] truncate" style={FONT_MONO}>
          {project.link ?? 'localhost:3000'}
        </span>

        {project.previewUrl !== null && (
          <div className="flex border border-white/10 rounded overflow-hidden shrink-0">
            {(['screenshot', 'preview'] as PreviewMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={[
                  'px-2.5 py-1 text-[10px] cursor-pointer transition-all duration-150',
                  mode === m
                    ? 'bg-[#39d353] text-[#090c10] font-bold'
                    : 'bg-transparent text-[#7d8590] hover:text-white',
                ].join(' ')}
                style={FONT_MONO}
              >
                {m === 'screenshot' ? 'Screenshot' : 'Live'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preview area */}
      <div className="relative aspect-video overflow-hidden bg-[#0f1318]">
        <AnimatePresence mode="wait">
          {mode === 'screenshot' || project.previewUrl === null ? (
            <motion.div
              key="screenshot"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <img src={project.screenshot} alt={project.name} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0 bg-[#090c10]/60 flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {project.link !== null && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-white text-[#090c10] rounded font-bold text-sm
                               hover:bg-[#39d353] transition-colors duration-200"
                    style={FONT_DISPLAY}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    ↗ Visit Project
                  </motion.a>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="iframe"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <iframe
                src={project.previewUrl}
                title={project.name}
                className="border-none"
                style={{
                  width: '200%',
                  height: '200%',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-snug" style={FONT_DISPLAY}>
            {project.name}
          </h3>
          {project.link !== null && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-xl text-[#7d8590] hover:text-[#39d353] transition-colors shrink-0"
              aria-label={`Visit ${project.name}`}
              whileHover={{ rotate: 45, scale: 1.2 }}
            >
              ↗
            </motion.a>
          )}
        </div>

        <p className="text-sm text-[#7d8590] leading-relaxed line-clamp-3 mb-4" style={FONT_BODY}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#39d353]
                         bg-[#39d353]/[0.08] border border-[#39d353]/20 rounded cursor-default
                         hover:bg-[#39d353]/[0.15] transition-colors duration-150"
              style={FONT_MONO}
              whileHover={{ scale: 1.08 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

interface ProjectsSectionProps { projects: Project[] }
function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Work</SectionLabel>
        <SectionTitle>Selected Projects</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────

interface EducationSectionProps { education: EducationItem[] }
function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Education</SectionLabel>
        <SectionTitle>Academic Background</SectionTitle>

        <div className="space-y-4">
          {education.map((edu) => (
            <motion.div
              key={`${edu.institution}-${edu.period}`}
              className="flex flex-wrap justify-between items-center gap-4 p-6 md:p-7
                         bg-[#161b22] border border-white/[0.08] rounded-lg
                         hover:border-white/[0.15] transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ x: 4 }}
            >
              <div>
                <p className="text-lg font-bold text-white tracking-tight mb-1" style={FONT_DISPLAY}>
                  {edu.institution}
                </p>
                <p className="text-sm text-[#7d8590]" style={FONT_BODY}>
                  {edu.degree}
                </p>
                {edu.gpa !== undefined && (
                  <p className="text-xs text-[#39d353] mt-1" style={FONT_MONO}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
              <span className="text-sm text-[#7d8590] whitespace-nowrap" style={FONT_MONO}>
                {edu.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────

interface FooterLink { href: string; label: string }
interface FooterProps {
  fullName: string;
  email: string;
  linkedin?: string;
  github?: string;
}
function Footer({ fullName, email, linkedin, github }: FooterProps) {
  const links: FooterLink[] = [
    ...(linkedin ? [{ href: linkedin, label: 'LinkedIn' }] : []),
    ...(github ? [{ href: github, label: 'GitHub' }] : []),
    { href: `mailto:${email}`, label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/[0.07] py-16 px-6 md:px-12 flex flex-col items-center gap-6">
      <motion.p
        className="text-sm font-semibold tracking-widest text-[#7d8590] uppercase"
        style={FONT_MONO}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {fullName}
      </motion.p>

      <nav className="flex gap-6" aria-label="Footer navigation">
        {links.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="text-[11px] uppercase tracking-[0.1em] text-[#7d8590]
                       hover:text-[#39d353] transition-colors duration-200"
            style={FONT_MONO}
          >
            {label}
          </a>
        ))}
      </nav>

      <p className="text-[11px] text-[#7d8590]/50 text-center" style={FONT_MONO}>
        © {new Date().getFullYear()} · Built with care · All rights reserved
      </p>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────

interface CreativeThemeProps { data?: PortfolioData, isScaledDown?: boolean }
export default function CreativeTheme({ data = DEFAULT_DATA, isScaledDown = false }: CreativeThemeProps) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#090c10] text-white antialiased">
      {/* Google Fonts – loaded in <head> via Next.js layout or similar in production */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Outfit:wght@300;400;500;600&display=swap"
      />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 inset-x-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #39d353, #58a6ff)',
        }}
      />

      <Navbar name={data.fullName} email={data.email} />

      <HeroSection data={data} isScaledDown={isScaledDown} />
      <Divider />

      <GithubSection
        github={data.github}
        githubUsername={data.githubUsername}
        githubStats={data.githubStats}
      />
      <Divider />

      <ExperienceSection experience={data.experience} />
      <Divider />

      <SkillsSection skills={data.skills} />
      <Divider />

      <ProjectsSection projects={data.projects} />
      <Divider />

      <EducationSection education={data.education} />

      <Footer
        fullName={data.fullName}
        email={data.email}
        linkedin={data.linkedin}
        github={data.github}
      />
    </div>
  );
}