'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { motion } from 'motion/react';
import ModernTheme from '@/templates/modern-1';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchResumes } from '@/redux/thunks';
import { selectResumes } from '@/redux/selectors';
import { PortfolioData } from '@/types/portfolio';
import Link from 'next/link';

interface ResumeData {
	_id: string;
	title: string;
	data: PortfolioData;
	templateType?: string;
	createdAt?: string;
	updatedAt?: string;
}

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function ResumeViewPage({ params }: PageProps) {
	const resolvedParams = use(params);
	const searchParams = useSearchParams();
	const template = searchParams.get('template') || 'modern';
	const dispatch = useAppDispatch();
	const resumes = useAppSelector(selectResumes);
	const [resume, setResume] = useState<ResumeData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadResume = async () => {
			try {
				if (resumes.length === 0) {
					// Get userId from localStorage or Redux store
					const userId = localStorage.getItem('userId') || '';
					if (userId) {
						dispatch(fetchResumes(userId));
					}
				}
				const found = resumes.find((r: any) => r._id === resolvedParams.id) as ResumeData | undefined;
				if (found) {
					setResume(found);
				}
			} finally {
				setLoading(false);
			}
		};
		loadResume();
	}, [dispatch, resolvedParams.id, resumes]);

	const renderTemplate = (data: PortfolioData | undefined): React.ReactNode => {
		if (!data) {
			return (
				<div className="p-8 text-center text-slate-500">
					<p>Resume data not found</p>
				</div>
			);
		}
		switch (template) {
			case 'modern':
				return <ModernTheme data={data} />;
			case 'minimalist':
				return <ModernTheme data={data} />;
			case 'creative':
				return <ModernTheme data={data} />;
			default:
				return <ModernTheme data={data} />;
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-900 flex items-center justify-center">
				<motion.div
					className="flex flex-col items-center gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.div
						className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
					/>
					<p className="text-white text-lg">Loading resume...</p>
				</motion.div>
			</div>
		);
	}

	if (!resume) {
		return (
			<div className="min-h-screen bg-slate-900 flex items-center justify-center">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<p className="text-white text-xl mb-4">Resume not found</p>
					<Link
						href="/dashboard/resumes"
						className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
					>
						Back to Resumes
					</Link>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900">
			{/* Header with navigation */}
			<motion.div
				className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 py-4 px-6"
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div>
						<h1 className="text-white text-xl font-bold">{resume.title}</h1>
						<p className="text-slate-400 text-sm">Template: {template}</p>
					</div>
					<div className="flex items-center gap-4">
						<motion.button
							onClick={() => window.print()}
							className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<i className="fas fa-print"></i>
							Print
						</motion.button>
						<Link
							href="/dashboard/resumes"
							className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 flex items-center gap-2"
						>
							<i className="fas fa-arrow-left"></i>
							Back
						</Link>
					</div>
				</div>
			</motion.div>

			{/* Template Rendering */}
			<motion.div
				className="bg-white"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				{resume ? renderTemplate(resume.data) : renderTemplate(undefined)}
			</motion.div>
		</div>
	);
}
