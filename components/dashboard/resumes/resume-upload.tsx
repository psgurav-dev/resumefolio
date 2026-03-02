import { BrandButton } from "@/components/ui/buttons";
import BrandAiStudioIcon from "@/components/ui/icons/brand-aistudio-icon";
import { extractResumeJSON } from "@/lib/gemini";
import { fileToBase64 } from "@/lib/utils";
import { createResume, Resume, selectCurrentUserId, selectPreviewData, setCurrentResume, useAppDispatch, useAppSelector } from "@/redux";
import { motion } from "motion/react";
import { useState, useRef, useCallback, useTransition } from "react";
import { ResumePreview } from "../resume-preview";
import { PortfolioData } from "@/types/portfolio";

interface UploadedFile {
	file: File;
	preview?: string;
}

const ACCEPTED_TYPES = ["application/pdf", "application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"image/jpeg", "image/png", "image/webp"];

const ACCEPTED_EXT = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp";

const ResumeUpload = () => {
	const [hover, setHover] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [isPending, setTransition] = useTransition()
	const [isProcessing, setIsProcessing] = useState(false)
	const [previewData, setPreviewData] = useState<PortfolioData | null>(null);

	const currentUserId = useAppSelector(selectCurrentUserId)
	const dispatch = useAppDispatch();

	const handleFile = useCallback((file: File) => {
		setError(null);

		if (!ACCEPTED_TYPES.includes(file.type)) {
			setError("Unsupported file type. Please upload PDF, DOC, or image.");
			return;
		}

		if (file.size > 10 * 1024 * 1024) {
			setError("File too large. Max size is 10MB.");
			return;
		}

		const preview = file.type.startsWith("image/")
			? URL.createObjectURL(file)
			: undefined;

		setUploaded({ file, preview });
	}, []);


	const handleConvertFileToJson = async (e: React.MouseEvent) => {
		// Placeholder for conversion logic
		e.stopPropagation()

		const file = uploaded?.file;
		if (!file) return;

		setTransition(async () => {
			try {
				if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
					setIsProcessing(true)
					const base64 = await fileToBase64(file);
					const res = await extractResumeJSON({
						data: base64,
						mimeType: file.type,
						name: file.name
					})
					if (res) {
						// Store preview data in Redux
						const tempResume: Partial<Resume> = {
							name: file.name.split('.')[0],
							parsedData: res,
						};
						// dispatch(setCurrentResume(tempResume as Resume));
						setUploaded(null);
						if (uploaded?.preview) URL.revokeObjectURL(uploaded.preview);
						setPreviewData(tempResume.parsedData || null);
						console.log('Resume processed successfully')
					}
				}
			} catch (error) {
				console.error('Error processing file:', error)
			} finally {
				setIsProcessing(false)
			}
		})
	};

	const handleSaveResume = async (name: string, data: PortfolioData) => {
		setTransition(async () => {
			try {
				if (!currentUserId) {
					console.error('User ID not available');
					return;
				}
				const resumeData: Resume = {
					userId: currentUserId,
					name: name,
					parsedData: data,
				};
				// Dispatch createResume thunk
				dispatch(createResume(resumeData));
				setPreviewData(null);
			} catch (error) {
				console.error('Error saving resume:', error)
			}
		})
	}


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (uploaded?.preview) URL.revokeObjectURL(uploaded.preview);
		setUploaded(null);
		setError(null);
		if (inputRef.current) inputRef.current.value = "";
	};

	const isActive = hover || dragOver;

	if (isProcessing) {
		return (
			<div className="flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white shadow-sm py-8 relative z-10 cursor-pointer min-h-52">
				<div className="w-12 h-12 mb-6 animate-spin border-4 border-stone-200 border-t-stone-400 rounded-full" />
				<p className="text-sm font-semibold text-stone-500 font-bricolage">Processing your resume...</p>
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white shadow-sm py-8 relative z-10 cursor-pointer min-h-52">
				<div className="w-12 h-12 mb-6 animate-spin border-4 border-stone-200 border-t-stone-400 rounded-full" />
				<p className="text-sm font-semibold text-stone-500 font-bricolage">Saving your resume...</p>
			</div>
		);
	}

	if (previewData) {
		return (
			<div className="absolute inset-0 bg-white rounded-2xl shadow-lg p-6 z-20 overflow-auto w-fit left-1/2 -translate-x-1/2">
				<ResumePreview
					data={previewData}
					onSave={handleSaveResume}
					isSaving={isPending}
					onCancel={() => dispatch(setCurrentResume(null))}
				/>
			</div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={() => setDragOver(false)}
			onClick={() => inputRef.current?.click()}
			className="flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 py-8 relative z-10 cursor-pointer min-h-52"
		>
			{/* Hidden input */}
			<input
				ref={inputRef}
				type="file"
				accept={ACCEPTED_EXT}
				className="hidden"
				onChange={handleInputChange}
			/>

			{/* Dashed grid background */}
			<div
				className="absolute inset-0 z-0 pointer-events-none"
				style={{
					backgroundImage: `
						linear-gradient(to right, #e7e5e4 1px, transparent 1px),
						linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
					`,
					backgroundSize: "20px 20px",
					maskImage: `
						repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
						repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
						radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
					`,
					WebkitMaskImage: `
						repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
						repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
						radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
					`,
					maskComposite: "intersect",
					WebkitMaskComposite: "source-in",
				}}
			/>

			{uploaded ? (
				/* ── Uploaded state ── */
				<motion.div
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					className="relative z-10 flex flex-col items-center gap-3 px-6 text-center"
				>
					{uploaded.preview ? (
						<img src={uploaded.preview} alt="preview"
							className="w-16 h-16 rounded-lg object-cover shadow-md" />
					) : (
						<div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center shadow-inner">
							<span className="text-2xl">📄</span>
						</div>
					)}
					<div>
						<p className="text-sm font-semibold text-stone-700 truncate max-w-45">
							{uploaded.file.name}
						</p>
						<p className="text-xs text-stone-400 mt-0.5">
							{(uploaded.file.size / 1024).toFixed(1)} KB
						</p>
					</div>
					<button
						onClick={handleRemove}
						className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
					>
						Remove
					</button>
					<div className="mt-4 mx-auto w-full flex items-center justify-center">
						{/* <EncryptButton handleConvertToPortfolio={handleConvertToPortfolio} isLoading={isLoading} /> */}
						<BrandButton text={"Save Resume"} handleClick={handleConvertFileToJson} Icon={BrandAiStudioIcon} />
					</div>
				</motion.div>
			) : (
				/* ── Default / hover state ── */
				<>
					{/* Card fan */}
					<div className="relative z-10 w-12 h-12 mb-6">
						{/* PDF — fans left */}
						<motion.img
							animate={{ rotate: isActive ? -22 : 0, x: isActive ? -28 : 0, y: isActive ? -4 : 0 }}
							transition={{ type: "spring", stiffness: 400, damping: 25 }}
							src="/assets/shared/pdf-icon.png"
							className="w-12 h-12 absolute inset-0 origin-bottom"
						/>
						{/* Word — stays center, rises slightly */}
						<motion.img
							animate={{ y: isActive ? -8 : 0 }}
							transition={{ type: "spring", stiffness: 400, damping: 25 }}
							src="/assets/shared/wordfile-icon.png"
							className="w-12 h-12 absolute inset-0 origin-bottom"
							style={{ zIndex: 2 }}
						/>
						{/* JPEG — fans right */}
						<motion.img
							animate={{ rotate: isActive ? 22 : 0, x: isActive ? 28 : 0, y: isActive ? -4 : 0 }}
							transition={{ type: "spring", stiffness: 400, damping: 25 }}
							src="/assets/shared/jpeg-icon.png"
							className="w-12 h-12 absolute inset-0 origin-bottom"
						/>
					</div>

					{/* Label */}
					<motion.div
						animate={{ y: isActive ? -4 : 0 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
						className="relative z-10 text-center"
					>
						<motion.p
							animate={{ opacity: isActive ? 0 : 1 }}
							transition={{ duration: 0.15 }}
							className="text-sm font-semibold text-stone-500 font-bricolage"
						>
							Upload your resume
						</motion.p>
						<motion.p
							animate={{ opacity: isActive ? 1 : 0 }}
							transition={{ duration: 0.15 }}
							className="text-sm font-semibold text-stone-700 font-bricolage absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap"
						>
							Click or drop a file
						</motion.p>
						<p className="text-xs text-stone-400 mt-1">PDF, DOC, JPG · max 10 MB</p>
					</motion.div>
				</>
			)}

			{/* Error */}
			{error && (
				<motion.p
					initial={{ opacity: 0, y: 4 }}
					animate={{ opacity: 1, y: 0 }}
					className="absolute bottom-3 text-xs text-red-500 font-medium z-10 px-4 text-center"
				>
					{error}
				</motion.p>
			)}

			{/* Drag-over ring */}
			{dragOver && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="absolute inset-0 rounded-2xl border-2 border-dashed border-stone-400 pointer-events-none z-20"
				/>
			)}
		</motion.div>
	);
};

export default ResumeUpload;