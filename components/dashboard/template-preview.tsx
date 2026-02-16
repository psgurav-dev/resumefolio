'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import ModernTheme from '@/templates/modern-1';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentResume, selectCurrentUserId } from '@/redux/selectors';
import { PortfolioData } from '@/types/portfolio';

const TemplatePreview = ({ id }: { id: string }) => {
	const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'minimalist' | 'creative'>('modern');
	const currentResume = useAppSelector(selectCurrentResume);
	const userId = useAppSelector(selectCurrentUserId);

	const [resumeData, setResumeData] = useState<PortfolioData | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		console.log("id", id)
		// Fetch the resume data for the given userId
		const fetchResumeData = async () => {
			try {
				const response = await fetch(`/api/resume-data/id`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId: id }),
					// body: JSON.stringify({ userId: '64b8c9e5f1d2c3a456789012' }), --- IGNORE ---
				});
				if (response.ok) {
					const data = await response.json();
					console.log(data)
					if (data?.resume?.parsedData) {
						setResumeData(data.resume.parsedData);
					}
					// setResumeData(data);

				} else {
					console.error('Failed to fetch resume data');
				}
			} catch (error) {
				console.error('Error fetching resume data:', error);
			}
			finally {
				setLoading(false);
			}
		};

		fetchResumeData();
	}, [userId]);
	// Mock resume data for preview if no current resume
	const mockData: PortfolioData = {
		fullName: 'John Doe',
		jobTitle: 'Full Stack Developer',
		email: 'john@example.com',
		phone: '+1 234 567 8900',
		location: 'San Francisco, CA',
		linkedin: 'https://linkedin.com/in/johndoe',
		github: 'https://github.com/johndoe',
		summary: 'Experienced full stack developer with 5+ years of expertise in building scalable web applications. Passionate about clean code and user experience.',
		skills: [
			{
				category: 'Frontend',
				items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
			},
			{
				category: 'Backend',
				items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
			},
			{
				category: 'Tools',
				items: ['Git', 'Docker', 'AWS', 'Redux'],
			},
		],
		experience: [
			{
				company: 'Tech Company Inc',
				role: 'Senior Developer',
				location: 'San Francisco, CA',
				period: '2022 - Present',
				description: [
					'Led development of microservices architecture',
					'Improved performance by 40% through optimization',
					'Mentored junior developers and code reviews',
				],
			},
			{
				company: 'Startup XYZ',
				role: 'Full Stack Developer',
				location: 'Remote',
				period: '2020 - 2022',
				description: [
					'Built and maintained React applications',
					'Developed REST APIs with Node.js',
					'Implemented real-time features using WebSockets',
				],
			},
		],
		education: [
			{
				institution: 'University of Technology',
				degree: 'Bachelor of Science in Computer Science',
				period: '2016 - 2020',
				gpa: '3.8',
			},
		],
		projects: [
			{
				name: 'E-Commerce Platform',
				description: 'A full-featured e-commerce platform built with React and Node.js',
				technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
				link: 'https://example.com',
			},
			{
				name: 'Real-time Chat Application',
				description: 'Chat app with real-time messaging and notifications',
				technologies: ['Socket.io', 'React', 'Node.js'],
				link: 'https://example.com',
			},
		],
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<motion.div

					className="text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.div

						className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-3"
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
					/>
					<p className="text-sm text-slate-500">Loading resume...</p>
				</motion.div>
			</div>
		)

	}

	const templates = [
		{
			id: 'modern',
			name: 'Modern Professional',
			description: 'Clean and contemporary design with smooth animations',
		},
		{
			id: 'minimalist',
			name: 'Minimalist',
			description: 'Simple and elegant with focus on content',
		},
		{
			id: 'creative',
			name: 'Creative Portfolio',
			description: 'Stand out with creative flair and bold design',
		},
	];

	const renderTemplate = () => {
		switch (selectedTemplate) {
			case 'modern':
				return <ModernTheme data={resumeData} />;
			case 'minimalist':
				// Placeholder for minimalist template
				return <ModernTheme data={resumeData} />;
			case 'creative':
				// Placeholder for creative template
				return <ModernTheme data={resumeData} />;
			default:
				return <ModernTheme data={resumeData} />;
		}
	};

	return (
		<>
			{/* Template Preview */}
			<motion.div
				className="flex-1 overflow-y-auto"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<div className="bg-white">{renderTemplate()}</div>
			</motion.div>
		</>
	);
};

export default TemplatePreview;
