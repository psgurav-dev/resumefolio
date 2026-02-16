
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '@/types/portfolio';

interface ThemeProps {
	data: PortfolioData;
}

const ModernTheme: React.FC<ThemeProps> = ({ data }) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const scaleVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5 },
		},
	};

	return (
		<div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
			{/* Header / Hero */}
			<header className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full opacity-10">
					<motion.div
						className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -mr-48 -mt-48"
						animate={{
							y: [0, 30, 0],
							x: [0, 20, 0],
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
					<motion.div
						className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -ml-48 -mb-48"
						animate={{
							y: [0, -30, 0],
							x: [0, -20, 0],
						}}
						transition={{
							duration: 7,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>

				<motion.div
					className="max-w-5xl mx-auto relative z-10"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="inline-block px-3 py-1 bg-indigo-500 text-xs font-bold uppercase tracking-widest rounded-full mb-6"
						variants={itemVariants}
					>
						Available for Hire
					</motion.div>
					<motion.h1
						className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
						variants={itemVariants}
					>
						{data.fullName}
					</motion.h1>
					<motion.p
						className="text-2xl md:text-3xl text-slate-400 font-light mb-8 italic"
						variants={itemVariants}
					>
						{data.jobTitle}
					</motion.p>
					<motion.div
						className="flex flex-wrap gap-6 text-sm text-slate-300"
						variants={itemVariants}
					>
						{data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-envelope"></i> {data.email}</a>}
						{data.phone && <span className="flex items-center gap-2"><i className="fas fa-phone"></i> {data.phone}</span>}
						{data.location && <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {data.location}</span>}
						{data.linkedin && <a href={data.linkedin} target="_blank" className="hover:text-white"><i className="fab fa-linkedin"></i> LinkedIn</a>}
						{data.github && <a href={data.github} target="_blank" className="hover:text-white"><i className="fab fa-github"></i> GitHub</a>}
					</motion.div>
				</motion.div>
			</header>

			<main className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-32">
				{/* About */}
				<motion.section
					id="about"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.h2 className="text-3xl font-bold mb-8 flex items-center gap-4" variants={itemVariants}>
						<span className="w-12 h-0.5 bg-indigo-500"></span> About Me
					</motion.h2>
					<motion.p
						className="text-xl text-slate-600 leading-relaxed max-w-3xl"
						variants={itemVariants}
					>
						{data.summary}
					</motion.p>
				</motion.section>

				{/* Experience */}
				<motion.section
					id="experience"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.h2 className="text-3xl font-bold mb-12 flex items-center gap-4" variants={itemVariants}>
						<span className="w-12 h-0.5 bg-indigo-500"></span> Professional Experience
					</motion.h2>
					<div className="space-y-16">
						{data?.experience.map((exp, idx) => (
							<motion.div
								key={idx}
								className="grid md:grid-cols-[1fr_2fr] gap-8"
								variants={itemVariants}
								whileHover={{ x: 10 }}
								transition={{ type: 'spring', stiffness: 300, damping: 10 }}
							>
								<div>
									<h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
									<p className="text-indigo-600 font-medium">{exp.role}</p>
									<p className="text-sm text-slate-400 mt-2 uppercase tracking-wide">{exp.period}</p>
									<p className="text-xs text-slate-400 uppercase tracking-wide">{exp.location}</p>
								</div>
								<ul className="space-y-3">
									{exp.description.map((item, i) => (
										<motion.li
											key={i}
											className="text-slate-600 flex gap-3"
											variants={itemVariants}
										>
											<span className="text-indigo-500 mt-1.5">•</span>
											<span>{item}</span>
										</motion.li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Skills */}
				<motion.section
					id="skills"
					className="bg-slate-50 -mx-6 md:-mx-12 px-6 md:px-12 py-20"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.h2 className="text-3xl font-bold mb-12 flex items-center gap-4" variants={itemVariants}>
						<span className="w-12 h-0.5 bg-indigo-500"></span> Expertises
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
						{data.skills.map((skillGroup, idx) => (
							<motion.div key={idx} variants={itemVariants}>
								<h3 className="font-bold text-lg mb-6 text-slate-800 uppercase tracking-wider">{skillGroup.category}</h3>
								<div className="flex flex-wrap gap-2">
									{skillGroup.items.map((skill, i) => (
										<motion.span
											key={i}
											className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded text-slate-600 text-sm font-medium cursor-default"
											variants={scaleVariants}
											whileHover={{
												scale: 1.05,
												boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
											}}
										>
											{skill}
										</motion.span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Projects */}
				<motion.section
					id="projects"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.h2 className="text-3xl font-bold mb-12 flex items-center gap-4" variants={itemVariants}>
						<span className="w-12 h-0.5 bg-indigo-500"></span> Selected Projects
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{data.projects.map((project, idx) => (
							<motion.div
								key={idx}
								className="group p-8 bg-white border border-slate-200 hover:border-indigo-500 transition-all duration-300"
								variants={itemVariants}
								whileHover={{
									y: -5,
									boxShadow: '0 20px 25px rgba(99, 102, 241, 0.1)',
								}}
							>
								<h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
								<p className="text-slate-600 mb-6 line-clamp-3">{project.description}</p>
								<div className="flex flex-wrap gap-2 mb-6">
									{project.technologies.map((tech, i) => (
										<motion.span
											key={i}
											className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 px-2 py-1 bg-indigo-50 rounded"
											whileHover={{ scale: 1.1 }}
										>
											{tech}
										</motion.span>
									))}
								</div>
								{project.link && (
									<motion.a
										href={project.link}
										target="_blank"
										className="text-sm font-bold flex items-center gap-2 text-slate-900 hover:gap-4 transition-all"
										whileHover={{ x: 5 }}
									>
										View Project <i className="fas fa-arrow-right text-indigo-500"></i>
									</motion.a>
								)}
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Education */}
				<motion.section
					id="education"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.h2 className="text-3xl font-bold mb-12 flex items-center gap-4" variants={itemVariants}>
						<span className="w-12 h-0.5 bg-indigo-500"></span> Academic Background
					</motion.h2>
					<div className="space-y-8">
						{data.education.map((edu, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-slate-100 pb-8 last:border-0"
								variants={itemVariants}
								whileHover={{ x: 10 }}
							>
								<div>
									<h3 className="text-xl font-bold">{edu.institution}</h3>
									<p className="text-slate-600 italic">{edu.degree}</p>
									{edu.gpa && <p className="text-sm text-indigo-600 font-medium mt-1">GPA: {edu.gpa}</p>}
								</div>
								<p className="text-slate-400 font-medium md:mt-1">{edu.period}</p>
							</motion.div>
						))}
					</div>
				</motion.section>
			</main>

			<motion.footer
				className="bg-slate-900 text-white py-12 px-6 md:px-12"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
					<motion.div variants={itemVariants}>
						<p className="font-bold text-xl">{data.fullName}</p>
						<p className="text-slate-400 text-sm">© {new Date().getFullYear()} FolioGenius AI. All rights reserved.</p>
					</motion.div>
					<motion.div className="flex gap-6" variants={itemVariants}>
						{data.linkedin && (
							<motion.a
								href={data.linkedin}
								className="text-2xl text-slate-400 hover:text-white"
								whileHover={{ scale: 1.2 }}
							>
								<i className="fab fa-linkedin"></i>
							</motion.a>
						)}
						{data.github && (
							<motion.a
								href={data.github}
								className="text-2xl text-slate-400 hover:text-white"
								whileHover={{ scale: 1.2 }}
							>
								<i className="fab fa-github"></i>
							</motion.a>
						)}
					</motion.div>
				</div>
			</motion.footer>
		</div>
	);
};

export default ModernTheme;
