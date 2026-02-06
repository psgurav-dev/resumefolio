"use client";

import ResumeData from "@/components/dashboard/resume-data";
import { useAppwriteUser } from "@/hooks/appwrite-user";

const DashboardPage = () => {
	const user = useAppwriteUser();
	return (
		<div className="p-8 flex flex-col gap-y-2 w-full">
			<h2 className="text-xl font-light  font-poppins">
				Hello, {user?.name ?? "User"} 👋
			</h2>
			<ResumeData />
		</div>
	);
};

export default DashboardPage;
