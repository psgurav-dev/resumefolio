'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectResumes, selectResumesLoading, selectResumesError, selectCurrentUserId } from '@/redux/selectors';
import { fetchResumes } from '@/redux/thunks';
import { PortfolioData } from '@/types/portfolio';

interface Resume {
	_id: string;
	title: string;
	data: PortfolioData;
	templateType?: string;
	createdAt?: string;
	updatedAt?: string;
}

const ResumeTemplateLink = () => {
	const dispatch = useAppDispatch();
	const resumes = useAppSelector(selectResumes);
	const loading = useAppSelector(selectResumesLoading);
	const error = useAppSelector(selectResumesError);
	const userId = useAppSelector(selectCurrentUserId);

	const [selectedResume, setSelectedResume] = useState<string | null>(null);
	const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isLinking, setIsLinking] = useState(false);
	const [linkError, setLinkError] = useState<string | null>(null);

	console.log('Resumes:', resumes);

	useEffect(() => {
		const loadResumes = async () => {
			if (!hasLoaded && resumes.length === 0 && !loading) {
				
				if (userId) {
					dispatch(fetchResumes(userId));
					setHasLoaded(true);
				}
			}
		};
		loadResumes();
	}, [dispatch, hasLoaded, resumes.length, loading]);

	const templates = [
		{
			id: 'modern',
			name: 'Modern Professional',
			icon: '📄',
			color: 'from-blue-500 to-blue-600',
		},
		{
			id: 'minimalist',
			name: 'Minimalist',
			icon: '✨',
			color: 'from-gray-500 to-gray-600',
		},
		{
			id: 'creative',
			name: 'Creative Portfolio',
			icon: '🎨',
			color: 'from-purple-500 to-purple-600',
		},
	];

	const handleLink = async () => {
		if (!selectedResume || !selectedTemplate) return;

		setIsLinking(true);
		setLinkError(null);

		try {
			// Get the authorization token from localStorage or from Appwrite
			const token = localStorage.getItem('appwrite_session_token') || '';

			console.log('Frontend: Sending userId:', userId);
			console.log('Frontend: Token:', token);

			// Update the user's selectedResume
			const response = await fetch('/api/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({
					selectedResume,
					userId : userId || '',
					
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to link resume');
			}

			// Navigate to the resume view with template
			window.location.href = `/dashboard/resumes/${selectedResume}?template=${selectedTemplate}`;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An error occurred';
			setLinkError(errorMessage);
			setIsLinking(false);
		}
	};

	return (
		<motion.div
			className="space-y-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div>
				<h3 className="text-lg font-bold text-slate-900 mb-4">Select Resume</h3>
				{loading ? (
					<div className="flex items-center justify-center py-8">
						<motion.div
							className="text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<motion.div
								className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-3"
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
							/>
							<p className="text-sm text-slate-500">Loading your resumes...</p>
						</motion.div>
					</div>
				) : error ? (
					<motion.div
						className="p-4 bg-red-50 border border-red-200 rounded-lg"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<p className="text-sm text-red-800 font-medium">Failed to load resumes</p>
						<p className="text-xs text-red-600 mt-2">{error}</p>
						<motion.button
							onClick={() => {
								const userId = localStorage.getItem('userId') || '';
								if (userId) {
									dispatch(fetchResumes(userId));
									setHasLoaded(false);
								}
							}}
							className="mt-3 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Retry
						</motion.button>
					</motion.div>
				) : resumes.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{resumes.map((resume: any) => (
							<motion.button
								key={resume._id}
								onClick={() => setSelectedResume(resume._id)}
								className={`p-4 rounded-lg border-2 transition-all text-left ${
									selectedResume === resume._id
										? 'border-indigo-600 bg-indigo-50'
										: 'border-slate-200 hover:border-indigo-300'
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="font-semibold text-slate-900">{resume.name}</div>
								<div className="text-xs text-slate-500 mt-1">
									{resume.templateType || 'No template selected'}
								</div>
							</motion.button>
						))}
					</div>
				) : (
					<motion.div
						className="text-center py-8 text-slate-500"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<p className="mb-3">No resumes found. Create one first.</p>
						<Link href="/dashboard/resumes" className="text-indigo-600 hover:underline inline-block">
							Create Resume
						</Link>
					</motion.div>
				)}
			</div>

			<div>
				<h3 className="text-lg font-bold text-slate-900 mb-4">Select Template</h3>
				<div className="grid grid-cols-1 gap-3">
					{templates.map((template) => (
						<motion.button
							key={template.id}
							onClick={() => setSelectedTemplate(template.id)}
							className={`p-4 rounded-lg border-2 transition-all text-left flex items-start gap-4 ${
								selectedTemplate === template.id
									? 'border-indigo-600 bg-indigo-50'
									: 'border-slate-200 hover:border-indigo-300'
							}`}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<span className="text-2xl">{template.icon}</span>
							<div className="flex-1">
								<div className="font-semibold text-slate-900">{template.name}</div>
								<div className="text-xs text-slate-500 mt-1">Professional design</div>
							</div>
						</motion.button>
					))}
				</div>
			</div>

			<motion.button
				onClick={handleLink}
				disabled={!selectedResume || !selectedTemplate || isLinking}
				className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
					selectedResume && selectedTemplate
						? 'bg-indigo-600 text-white hover:bg-indigo-700'
						: 'bg-slate-200 text-slate-400 cursor-not-allowed'
				}`}
				whileHover={selectedResume && selectedTemplate && !isLinking ? { scale: 1.02 } : {}}
				whileTap={selectedResume && selectedTemplate && !isLinking ? { scale: 0.98 } : {}}
			>
				{isLinking ? (
					<>
						<motion.div
							className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						/>
						Linking...
					</>
				) : (
					<>
						<i className="fas fa-link"></i>
						Link Resume to Template
					</>
				)}
			</motion.button>

			<AnimatePresence>
				{linkError && (
					<motion.div
						className="p-4 bg-red-50 border border-red-200 rounded-lg"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
					>
						<p className="text-sm text-red-800 font-semibold">Error</p>
						<p className="text-xs text-red-600 mt-1">{linkError}</p>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedResume && selectedTemplate && !linkError && (
					<motion.div
						className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
					>
						<p className="text-sm text-indigo-800">
							<span className="font-semibold">Ready to link:</span> Your resume will be set as your default and rendered with the selected template.
						</p>
						<p className="text-xs text-indigo-600 mt-2">
							Click the button above to proceed.
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default ResumeTemplateLink;
