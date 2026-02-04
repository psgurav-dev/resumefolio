
import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface ThemeProps {
	data: PortfolioData;
}

const ModernTheme: React.FC<ThemeProps> = ({ data }) => {
	return (
		<div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
			{/* Header / Hero */}
			<header className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full opacity-10">
					<div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
					<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -ml-48 -mb-48"></div>
				</div>

				<div className="max-w-5xl mx-auto relative z-10">
					<div className="inline-block px-3 py-1 bg-indigo-500 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
						Available for Hire
					</div>
					<h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
						{data.fullName}
					</h1>
					<p className="text-2xl md:text-3xl text-slate-400 font-light mb-8 italic">
						{data.jobTitle}
					</p>
					<div className="flex flex-wrap gap-6 text-sm text-slate-300">
						{data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-envelope"></i> {data.email}</a>}
						{data.phone && <span className="flex items-center gap-2"><i className="fas fa-phone"></i> {data.phone}</span>}
						{data.location && <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {data.location}</span>}
						{data.linkedin && <a href={data.linkedin} target="_blank" className="hover:text-white"><i className="fab fa-linkedin"></i> LinkedIn</a>}
						{data.github && <a href={data.github} target="_blank" className="hover:text-white"><i className="fab fa-github"></i> GitHub</a>}
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-32">
				{/* About */}
				<section id="about">
					<h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
						<span className="w-12 h-[2px] bg-indigo-500"></span> About Me
					</h2>
					<p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
						{data.summary}
					</p>
				</section>

				{/* Experience */}
				<section id="experience">
					<h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
						<span className="w-12 h-[2px] bg-indigo-500"></span> Professional Experience
					</h2>
					<div className="space-y-16">
						{data?.experience.map((exp, idx) => (
							<div key={idx} className="grid md:grid-cols-[1fr_2fr] gap-8">
								<div>
									<h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
									<p className="text-indigo-600 font-medium">{exp.role}</p>
									<p className="text-sm text-slate-400 mt-2 uppercase tracking-wide">{exp.period}</p>
									<p className="text-xs text-slate-400 uppercase tracking-wide">{exp.location}</p>
								</div>
								<ul className="space-y-3">
									{exp.description.map((item, i) => (
										<li key={i} className="text-slate-600 flex gap-3">
											<span className="text-indigo-500 mt-1.5">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				{/* Skills */}
				<section id="skills" className="bg-slate-50 -mx-6 md:-mx-12 px-6 md:px-12 py-20">
					<h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
						<span className="w-12 h-[2px] bg-indigo-500"></span> Expertises
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
						{data.skills.map((skillGroup, idx) => (
							<div key={idx}>
								<h3 className="font-bold text-lg mb-6 text-slate-800 uppercase tracking-wider">{skillGroup.category}</h3>
								<div className="flex flex-wrap gap-2">
									{skillGroup.items.map((skill, i) => (
										<span key={i} className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded text-slate-600 text-sm font-medium">
											{skill}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Projects */}
				<section id="projects">
					<h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
						<span className="w-12 h-[2px] bg-indigo-500"></span> Selected Projects
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{data.projects.map((project, idx) => (
							<div key={idx} className="group p-8 bg-white border border-slate-200 hover:border-indigo-500 transition-all duration-300">
								<h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
								<p className="text-slate-600 mb-6 line-clamp-3">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{project.technologies.map((tech, i) => (
										<span key={i} className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 px-2 py-1 bg-indigo-50 rounded">
											{tech}
										</span>
									))}
								</div>
								{project.link && (
									<a href={project.link} target="_blank" className="text-sm font-bold flex items-center gap-2 text-slate-900 hover:gap-4 transition-all">
										View Project <i className="fas fa-arrow-right text-indigo-500"></i>
									</a>
								)}
							</div>
						))}
					</div>
				</section>

				{/* Education */}
				<section id="education">
					<h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
						<span className="w-12 h-[2px] bg-indigo-500"></span> Academic Background
					</h2>
					<div className="space-y-8">
						{data.education.map((edu, idx) => (
							<div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-slate-100 pb-8 last:border-0">
								<div>
									<h3 className="text-xl font-bold">{edu.institution}</h3>
									<p className="text-slate-600 italic">{edu.degree}</p>
									{edu.gpa && <p className="text-sm text-indigo-600 font-medium mt-1">GPA: {edu.gpa}</p>}
								</div>
								<p className="text-slate-400 font-medium md:mt-1">{edu.period}</p>
							</div>
						))}
					</div>
				</section>
			</main>

			<footer className="bg-slate-900 text-white py-12 px-6 md:px-12">
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<div>
						<p className="font-bold text-xl">{data.fullName}</p>
						<p className="text-slate-400 text-sm">© {new Date().getFullYear()} FolioGenius AI. All rights reserved.</p>
					</div>
					<div className="flex gap-6">
						{data.linkedin && <a href={data.linkedin} className="text-2xl text-slate-400 hover:text-white"><i className="fab fa-linkedin"></i></a>}
						{data.github && <a href={data.github} className="text-2xl text-slate-400 hover:text-white"><i className="fab fa-github"></i></a>}
					</div>
				</div>
			</footer>
		</div>
	);
};

export default ModernTheme;
