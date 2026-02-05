import Sidebar from "@/components/dashboard/sidebar";


export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
}
