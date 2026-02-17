"use client"
import ResumeData from "@/components/dashboard/resume-data";
import { selectCurrentUser, useAppSelector } from "@/redux";

const ResumeDataPage = () => {
	const currentUser = useAppSelector(selectCurrentUser)
	return (
		<div className="p-8 flex flex-col gap-y-2 w-full">
			<h2 className="text-xl font-light  font-poppins">
				Hello, {currentUser?.name ?? "User"} 👋
			</h2>
			<ResumeData />
		</div>
	)
}

export default ResumeDataPage;