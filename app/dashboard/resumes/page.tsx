"use client"
import ResumeData from "@/components/dashboard/resume-data";
import { useAppwriteUser } from "@/hooks/appwrite-user";

const ResumeDataPage = () => {
	const user = useAppwriteUser();
	return (<ResumeData />
	)
}

export default ResumeDataPage;