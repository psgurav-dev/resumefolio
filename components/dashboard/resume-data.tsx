"use client";

import { useEffect, useState, useTransition } from "react";
import { FileUpload } from "../ui/file-upload";
import { extractResumeJSON } from "@/lib/gemini";
import { fileToBase64 } from "@/lib/utils";
import { ResumePreview } from "./resume-preview";
import { PortfolioData } from "@/types/portfolio";
import { testData } from "@/data/test/resume";
import ResumeDataVariantsList from "./resume-variants-list";
import {
	useAppDispatch,
	useAppSelector,
	createResume,
	setCurrentResume,
	fetchResumes,
	Resume,
	useCurrentUser,
} from "@/redux";
import { selectPreviewData, selectResumesData, selectCurrentUserId } from "@/redux/selectors";

const UploadNewDocument = ({ currentUserId }: { currentUserId: string }) => {
	const [files, setFiles] = useState<File[]>([])
	const [isPending, setTransition] = useTransition()
	const [isProcessing, setIsProcessing] = useState(false)

	const dispatch = useAppDispatch();
	const previewData = useAppSelector(selectPreviewData);

	const handleFileUpload = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		if (!files || files.length === 0) return;
		const file = files[0]
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
						dispatch(setCurrentResume(tempResume as Resume));
					}
				}
			} catch (error) {
				console.error('Error processing file:', error)
			} finally {
				setIsProcessing(false)
			}
		})
	}

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
				// Clear preview
				dispatch(setCurrentResume(null));
				setFiles([]);
				console.log('Resume saved successfully')
			} catch (error) {
				console.error('Error saving resume:', error)
			}
		})
	}

	if (previewData) {
		return (
			<ResumePreview
				data={testData}
				onSave={handleSaveResume}
				isSaving={isPending}
				onCancel={() => dispatch(setCurrentResume(null))}
			/>
		)
	}

	return (
		<div className="w-full">
			<div className="bg-white border-dashed border w-full rounded">
				<FileUpload
					files={files}
					setFiles={setFiles}
					handleConvertToPortfolio={handleFileUpload}
					isLoading={isPending || isProcessing}
					isGrid={false}
				/>
			</div>
		</div>
	)
}



const ResumeData = () => {
	const dispatch = useAppDispatch();
	const { resumes, loading } = useAppSelector(selectResumesData);
	// Get current user ID from Redux
	const currentUserId = useAppSelector(selectCurrentUserId);
	console.log('Current User ID:', currentUserId, resumes);
	useEffect(() => {
		if (currentUserId) {
			dispatch(fetchResumes(currentUserId));
		}
	}, [currentUserId, dispatch]);

	return (
		<div className="w-full h-screen overflow-y-auto">
			{resumes && resumes.length > 0 ? (
				<ResumeDataVariantsList data={resumes} />
			) : (
				<UploadNewDocument currentUserId={currentUserId} />
			)}
		</div>
	)
}



export default ResumeData;