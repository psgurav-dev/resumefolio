import ResumeTemplateLink from '@/components/dashboard/sidebar/link-resume-template';

export default function LinkResumePage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-slate-900 mb-2">Link Resume to Template</h1>
					<p className="text-slate-600">Select a resume and choose a template to view your resume in different designs.</p>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-8">
					<ResumeTemplateLink />
				</div>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-600">
						<div className="text-3xl mb-2">📋</div>
						<h3 className="font-bold text-slate-900 mb-2">Select Resume</h3>
						<p className="text-sm text-slate-600">Choose from your existing resumes to view with different templates.</p>
					</div>

					<div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-600">
						<div className="text-3xl mb-2">🎨</div>
						<h3 className="font-bold text-slate-900 mb-2">Choose Template</h3>
						<p className="text-sm text-slate-600">Pick a template design that best showcases your professional profile.</p>
					</div>

					<div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600">
						<div className="text-3xl mb-2">👁️</div>
						<h3 className="font-bold text-slate-900 mb-2">Preview & Print</h3>
						<p className="text-sm text-slate-600">View your resume live and download or print it in PDF format.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
