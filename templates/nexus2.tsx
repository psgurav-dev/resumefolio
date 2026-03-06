'use client';

import React, { useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';


// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string[];
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string | null;
  screenshot?: string | null;
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

export interface PortfolioData {
  fullName: string;
  jobTitle: string;
  summary?: string;
  profileImage?: string;
  githubUsername?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: Project[];
  education?: EducationItem[];
}



export const resumeData: PortfolioData = {
  fullName: "Ravindra Kisan Jadhav",
  jobTitle: "Creative Frontend Developer & Game UI Designer",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500", // High-quality placeholder
  githubUsername: "ravindra-j-dev", // Used for the GitHub Stats API
  email: "ravindra.jadhav@example.com",
  phone: "+91 98765 43210",
  location: "Pune, Maharashtra",
  linkedin: "https://linkedin.com/in/ravindrajadhav",
  github: "https://github.com/ravindra-j-dev",
  summary: "A passionate Lead Generation Executive turned Frontend Developer with a flair for crafting immersive user interfaces. Specialized in React, Next.js, and Phaser JS, I bridge the gap between business logic and interactive digital experiences.",

  skills: [
    {
      category: "Frontend Tech",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Game Development",
      items: ["Phaser JS", "Game UI Design", "Asset Optimization", "Canvas API"]
    },
    {
      category: "Tools & Others",
      items: ["Figma", "Git", "Node.js", "Lead Generation", "SEO"]
    }
  ],

  experience: [
    {
      company: "AMAR (Construction)",
      role: "Operations Support",
      period: "Dec 2025 - Present",
      location: "Pune, India",
      description: [
        "Managing digital workflows and documentation for large-scale construction projects.",
        "Optimizing internal reporting systems using modern web tools."
      ]
    },
    {
      company: "Revknew Technologies Private Limited",
      role: "Lead Generation Executive",
      period: "Jan 2024 - Dec 2025",
      location: "Pune, India",
      description: [
        "Led a team to generate high-quality B2B leads, resulting in a 25% increase in conversion rates.",
        "Developed automated scripts to streamline data scraping and CRM entry."
      ]
    }
  ],

  projects: [
    {
      name: "Phaser Quest: UI Redesign",
      description: "A complete overhaul of an RPG game interface. Implemented responsive HUDs, inventory management systems, and smooth transition animations using Phaser JS and Framer Motion.",
      technologies: ["Phaser JS", "TypeScript", "GSAP"],
      link: "https://phaser.io", // Replace with actual project URL
      screenshot: "https://images.unsplash.com/photo-1542751371-adc38448a05e?fit=crop&w=800&h=450"
    },
    {
      name: "Nexus Portfolio Engine",
      description: "A Next.js based portfolio generator that uses AI to curate resume data into high-end, glassmorphic themes. Features real-time GitHub integration and dynamic iFrame previews.",
      technologies: ["Next.js 14", "Tailwind CSS", "Motion/React"],
      link: "https://vercel.com",
      screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&h=450"
    },
    {
      name: "Stranger Things Tribute",
      description: "An interactive fan experience featuring 80s synth-wave aesthetics and CSS-grid heavy layouts inspired by the Netflix series.",
      technologies: ["React", "Three.js", "CSS Modules"],
      link: "https://www.netflix.com",
      screenshot: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?fit=crop&w=800&h=450"
    }
  ],

  education: [
    {
      institution: "Savitribai Phule Pune University",
      degree: "Bachelor of Commerce (B.Com)",
      period: "2016 - 2019",
      gpa: "3.8/4.0"
    }
  ]
};
interface ThemeProps {
  data: PortfolioData;
  isScaledDown?: boolean;
}

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

// ─────────────────────────────────────────────────────────────
// FONT STYLE CONSTANT
// ─────────────────────────────────────────────────────────────

const FONT_MONO: CSSProperties = { fontFamily: 'ui-monospace, monospace' };

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Extracts initials from a full name, e.g. "Alex Rivera" → "AR" */
function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map((word) => word[0] ?? '')
    .join('');
}

// ── Profile card ──────────────────────────────────────────────
interface ProfileCardProps {
  fullName: string;
  jobTitle: string;
  summary?: string;
  profileImage?: string;
}
function ProfileCard({ fullName, jobTitle, summary, profileImage }: ProfileCardProps) {
  return (
    <motion.div
      className="lg:col-span-8 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl
                 backdrop-blur-md flex flex-col md:flex-row gap-8 items-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {/* Avatar */}
      <div className="relative group flex-shrink-0">
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500
                     rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden
                        border-2 border-slate-700 bg-slate-800">
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center
                         text-4xl font-bold bg-indigo-600 text-white"
              aria-label={`Initials for ${fullName}`}
            >
              {getInitials(fullName)}
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="text-center md:text-left flex-1">
        <span
          className="text-indigo-400 text-sm tracking-tighter mb-2 block uppercase font-bold"
          style={FONT_MONO}
        >
          {`// ${jobTitle}`}
        </span>
        <h1
          className="text-4xl md:text-6xl font-black mb-4 tracking-tight
                     bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400"
        >
          {fullName}
        </h1>
        {summary && (
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            {summary}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── GitHub stats card ─────────────────────────────────────────
interface GitHubCardProps { githubUsername?: string }
function GitHubCard({ githubUsername }: GitHubCardProps) {
  return (
    <motion.div
      className="lg:col-span-4 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl
                 backdrop-blur-md flex flex-col justify-between"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-slate-300">GitHub Activity</h3>
        {/* Font Awesome is expected to be loaded globally */}
        <i className="fab fa-github text-2xl text-slate-500" aria-hidden="true" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        {githubUsername ? (
          <img
            src={
              `https://github-readme-stats.vercel.app/api` +
              `?username=${encodeURIComponent(githubUsername)}` +
              `&show_icons=true&theme=transparent&hide_border=true` +
              `&title_color=6366f1&text_color=94a3b8&icon_color=6366f1`
            }
            alt={`GitHub stats for ${githubUsername}`}
            className="w-full"
          />
        ) : (
          <p className="text-slate-500 text-sm italic text-center">
            GitHub data not connected
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Experience timeline ───────────────────────────────────────
interface ExperienceSectionProps { experience: ExperienceItem[] }
function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-indigo-500" aria-hidden="true" />
        History
      </h2>

      <div className="space-y-6 border-l border-slate-800 ml-4">
        {experience.map((exp) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            className="relative pl-8 pb-6"
            variants={fadeInUp}
          >
            <span
              className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full
                         bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              aria-hidden="true"
            />
            <p className="text-xs text-indigo-400 mb-1" style={FONT_MONO}>
              {exp.period}
            </p>
            <h4 className="font-bold text-lg">{exp.role}</h4>
            <p className="text-slate-400 text-sm">{exp.company}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Skills cloud ──────────────────────────────────────────────
interface SkillsSectionProps { skills: SkillGroup[] }
function SkillsSection({ skills }: SkillsSectionProps) {
  const allSkills = skills.flatMap((s) => s.items);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-indigo-500" aria-hidden="true" />
        Toolkit
      </h2>

      <div className="flex flex-wrap gap-3">
        {allSkills.map((skill) => (
          <motion.span
            key={skill}
            variants={fadeInUp}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm
                       hover:border-indigo-500 transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Single project row ────────────────────────────────────────
interface ProjectRowProps {
  project: Project;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}
function ProjectRow({ project, index, isActive, onActivate }: ProjectRowProps) {
  const isEven = index % 2 === 0;

  const screenshotSrc =
    project.screenshot ??
    (project.link
      ? `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url`
      : null);

  return (
    <motion.div
      className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      {/* Browser mockup */}
      <div className={`order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        {/* Browser chrome bar */}
        <div className="bg-slate-800 rounded-t-xl p-3 flex gap-2 border-x border-t border-slate-700">
          <span className="w-3 h-3 rounded-full bg-red-500/50" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/50" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-green-500/50" aria-hidden="true" />
          <span
            className="ml-4 flex-1 bg-slate-900 rounded text-[10px] px-2
                       text-slate-500 flex items-center overflow-hidden whitespace-nowrap"
            style={FONT_MONO}
          >
            {project.link ?? 'https://local-preview.dev'}
          </span>
        </div>

        {/* Preview area */}
        <div
          className="relative aspect-video rounded-b-xl overflow-hidden border border-slate-700
                     bg-slate-900 group-hover:border-indigo-500/50 transition-colors shadow-2xl"
        >
          {isActive && project.link ? (
            <iframe
              src={project.link}
              className="w-full h-full border-none"
              title={`Live preview of ${project.name}`}
              loading="lazy"
            />
          ) : (
            <>
              {screenshotSrc && (
                <img
                  src={screenshotSrc}
                  alt={`Screenshot of ${project.name}`}
                  className="w-full h-full object-cover opacity-80
                             group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {/* Overlay – only shown when project has a live URL */}
              {project.link && (
                <div
                  className="absolute inset-0 bg-slate-900/40 flex items-center justify-center
                             opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    type="button"
                    onClick={onActivate}
                    className="px-6 py-3 bg-white text-black font-bold rounded-full
                               shadow-xl hover:scale-110 transition-transform"
                  >
                    Launch Live Preview
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Project info */}
      <div className={`order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
        <h3 className="text-3xl font-bold tracking-tight group-hover:text-indigo-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full cursor-default"
              style={FONT_MONO}
            >
              #{tech}
            </span>
          ))}
        </div>

        <div className="pt-4 flex gap-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white font-bold
                         hover:text-indigo-400 transition-colors"
            >
              View Website
              <i className="fas fa-external-link-alt text-sm" aria-hidden="true" />
            </a>
          )}
          <a
            href="#"
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors"
          >
            Source Code
            <i className="fab fa-github text-sm" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Projects section ──────────────────────────────────────────
interface ProjectsSectionProps { projects: Project[] }
function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-12 text-center">Featured Work</h2>
      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, idx) => (
          <ProjectRow
            key={project.name}
            project={project}
            index={idx}
            isActive={activeProject === idx}
            onActivate={() => setActiveProject(idx)}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────

const NexusTheme: React.FC<ThemeProps> = ({ data = resumeData, isScaledDown = false }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 font-sans">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Hero – bento grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <ProfileCard
            fullName={data.fullName}
            jobTitle={data.jobTitle}
            summary={data.summary}
            profileImage={data.profileImage}
          />
          <GitHubCard githubUsername={data.githubUsername} />
        </section>

        {/* Experience + Skills */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ExperienceSection experience={data.experience} />
          <SkillsSection skills={data.skills} />
        </section>

        {/* Projects */}
        <ProjectsSection projects={data.projects} />
      </main>

      <footer className="border-t border-slate-900 py-12 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} — Built with Precision</p>
      </footer>
    </div>
  );
};

export default NexusTheme;