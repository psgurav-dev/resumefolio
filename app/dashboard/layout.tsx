"use client";
import Sidebar from "@/components/dashboard/sidebar";
import { useSyncAuthWithCookies } from '@/hooks/use-sync-auth';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useSyncAuthWithCookies();
	return (
		<div className="flex items-start w-full h-screen ">
			<Sidebar />
			<div className="w-full">
				{children}
			</div>
		</div>
	);
}
