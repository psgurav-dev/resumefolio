"use client";
import { GalleryHorizontalEnd, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

import FileDescriptionIcon from "../ui/icons/file-description-icon";
import { SidebarButton } from "../ui/buttons";
import Link from "next/link";

const Sidebar = () => {
	const [selectedRoute, setSelectedRoute] = useState("resumes");

	const routes = [
		{ name: "Resumes", icon: FileDescriptionIcon, link: "resumes", badge: 5 },
		{ name: "Templates", icon: FileDescriptionIcon, link: "templates", badge: "New" },
		{ name: "Profile", icon: User, link: "profile" }
	];

	return (
		<div className="bg-linear-to-b from-gray-50 via-gray-100 to-gray-200 w-80 h-screen flex flex-col shadow-xl border-r border-gray-200">
			{/* Header Section */}
			<motion.div
				className="w-full p-6 px-6 flex items-center gap-x-3 border-b border-gray-200/80 bg-white/50 backdrop-blur-sm"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Logo with gradient background */}
				<motion.div
					className="w-10 h-10 rounded-xl bg-linear-to-br from-{#475569} to-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-500/30"
					whileHover={{ scale: 1.05, rotate: 5 }}
					whileTap={{ scale: 0.95 }}
				>
					<GalleryHorizontalEnd size={22} className="text-white" strokeWidth={2.5} />
				</motion.div>

				{/* Brand Name */}
				<div className="flex flex-col">
					<h5 className="font-semibold text-xl font-bricolage bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
						Resumefolio
					</h5>
					{/* <p className="text-xs text-gray-500 font-medium">Variats list</p> */}
				</div>


			</motion.div>

			{/* Navigation Section */}
			<nav className="flex-1 w-full px-4 py-6 space-y-2">
				{/* Section Label */}
				<motion.div
					className="px-3 mb-4"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Navigation
					</p>
				</motion.div>

				{/* Navigation Items */}
				<motion.div
					className="space-y-2.5"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					{routes.map((route, index) => (
						<motion.div
							key={route.link}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 * index + 0.4 }}
						>
							<Link href={`/dashboard/${route.link}`}>
								<SidebarButton
									icon={route.icon}
									onClick={() => setSelectedRoute(route.link)}
									isSelected={selectedRoute === route.link}
									text={route.name}

								/></Link>
						</motion.div>
					))}
				</motion.div>
			</nav>


			{/* User Profile Card */}
			<motion.div
				className="mx-4 mb-4 p-4 rounded-xl bg-linear-to-br from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				whileHover={{ y: -2 }}
			>
				<div className="flex items-center gap-3">
					{/* Avatar */}
					<motion.div
						className="relative"
						whileHover={{ scale: 1.05 }}
					>
						<div className="w-11 h-11 rounded-xl bg-linear-to-br from-gray-200 to-zinc-800 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-black-500/30">
							JD
						</div>
						{/* Online indicator */}
						<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
					</motion.div>

					{/* User Info */}
					<div className="flex-1 min-w-0">
						<p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
						<p className="text-xs text-gray-500 truncate">john@example.com</p>
					</div>

					{/* Menu Icon */}
					<motion.button
						className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
						</svg>
					</motion.button>
				</div>
			</motion.div>

			{/* Bottom branding */}
			<motion.div
				className="px-6 py-3 border-t border-gray-200 bg-white/30 backdrop-blur-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				<p className="text-xs text-center text-gray-400">
					Made with <span className="text-orange-500">♥</span> by Resumefolio
				</p>
			</motion.div>
		</div>
	);
};

export default Sidebar;