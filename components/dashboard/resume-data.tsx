"use client";

import { getCurrentUserResumeData } from "@/lib/api/resumes";
import { useEffect, useState, useTransition } from "react";
import { FileUpload } from "../ui/file-upload";
import { extractResumeJSON } from "@/lib/gemini";
import { fileToBase64 } from "@/lib/utils";


const UploadNewDocument = () => {
	const [files, setFiles] = useState<File[]>([])
	const [isPending, setTransition] = useTransition()

	const handleFileUpload = () => {
		if (!files) return;
		const file = files[0]
		setTransition(async () => {
			if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
				const base64 = await fileToBase64(file);
				const res = extractResumeJSON({
					data: base64,
					mimeType: file.type,
					name: file.name
				})
			}

		})
	}
	return (
		<div className="w-full">
			<div className="bg-gray-500 w-full rounded">
				<FileUpload files={files} setFiles={setFiles} handleConvertToPortfolio={handleFileUpload} isLoading={isPending} isGrid={false} />
			</div>
		</div>
	)
}

const ResumeData = () => {
	const [resumeData, setResumeData] = useState(null)

	useEffect(() => {
		async function loadResume() {
			const resume = await getCurrentUserResumeData();
			if (resume) {
				console.log("Resume exists:", resume);
				setResumeData(resume)
			} else {
				console.log("No resume found");
			}
		}
		loadResume();
	}, []);

	return (
		<div className="w-full">
			{resumeData ? <></> : <UploadNewDocument />}
		</div>
	)
}

export default ResumeData;