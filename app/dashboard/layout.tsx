import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex items-start w-full h-screen ">
			<Sidebar />
			<div className="w-full p-8">
				{children}
			</div>
		</div>
	);
}
