'use client';

import { motion } from "motion/react";
import { useState, useCallback } from "react";
import ProfileCard from "./profile-header";
import EditProfileModal from "./edit-profile-modal";
import { useEditProfile } from "@/hooks/use-edit-profile";
import { Mail, Calendar, RefreshCcw, User, LogOut, Pencil, Shield, Zap, Settings } from "lucide-react";
import { User as UserType } from "@/redux/slices/usersSlice";

//  "user": {
//         "_id": "698483f7992e6af961b03b00",
//         "appwriteUserId": "68de38b8003d49705791",
//         "__v": 0,
//         "createdAt": "2026-02-05T11:50:10.635Z",
//         "email": "dev.psgurav@gmail.com",
//         "name": "Prasad Gurav",
//         "provider": "google",
//         "updatedAt": "2026-02-18T12:37:49.297Z",
//         "selectedResume": "6986e2020d1a3eea4a9d262f",
//         "username": "dev.psgurav"
//     }

interface InfoCardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	delay: number;
}

const InfoCard = ({ icon, label, value, delay }: InfoCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ once: true, margin: "-100px" }}
			whileHover={{ y: -4, transition: { duration: 0.2 } }}
			className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white via-zinc-50 to-white/70 p-5 shadow-md transition-all duration-300 hover:border-zinc-300/80 hover:shadow-xl hover:shadow-zinc-200/50"
		>
			{/* Gradient border effect on hover */}
			<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			<div className="relative flex items-start gap-3">
				<motion.div
					whileHover={{ scale: 1.15, rotate: 5 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
					className="mt-0.5 flex-shrink-0 text-zinc-600 group-hover:text-emerald-600 transition-colors duration-300"
				>
					{icon}
				</motion.div>
				<div className="flex-1 min-w-0">
					<p className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
						{label}
					</p>
					<p className="text-sm font-bricolage font-semibold text-zinc-900 break-words">
						{value}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ once: true, margin: "-100px" }}
			whileHover={{ y: -8, transition: { duration: 0.3 } }}
			className="group relative rounded-3xl border border-zinc-200/30 bg-gradient-to-br from-white to-zinc-50/50 p-8 text-center shadow-lg transition-all duration-300 hover:border-zinc-300/60 hover:shadow-2xl hover:shadow-zinc-200/30 overflow-hidden"
		>
			{/* Animated background gradient on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-blue-50/0 group-hover:from-emerald-50/40 group-hover:to-blue-50/20 transition-all duration-500" />

			<div className="relative">
				<motion.div
					whileHover={{ scale: 1.1, rotate: -5 }}
					transition={{ type: "spring", stiffness: 300, damping: 10 }}
					className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50 text-zinc-600 group-hover:text-emerald-600 group-hover:from-emerald-100 group-hover:to-emerald-50 transition-all duration-300"
				>
					{icon}
				</motion.div>
				<h3 className="mb-2 text-lg font-bold text-zinc-900 font-bricolage">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-600 transition-colors duration-300">
					{description}
				</p>
			</div>
		</motion.div>
	);
};

interface ActionButtonProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	delay: number;
	variant?: "default" | "danger";
}

const ActionButton = ({ icon, label, onClick, delay, variant = "default" }: ActionButtonProps) => {
	const baseClass = "relative flex items-center gap-2 pl-4 pr-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden group";
	const variantClass = variant === "danger"
		? "bg-red-50 text-red-600 border border-red-200/50 hover:bg-red-100 hover:border-red-300/80"
		: "bg-emerald-50 text-emerald-600 border border-emerald-200/50 hover:bg-emerald-100 hover:border-emerald-300/80";

	return (
		<motion.button
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ once: true }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			className={`${baseClass} ${variantClass}`}
		>
			<motion.div
				whileHover={{ rotate: 15, scale: 1.2 }}
				transition={{ type: "spring", stiffness: 400, damping: 10 }}
			>
				{icon}
			</motion.div>
			<span>{label}</span>
			<div className="absolute inset-0 -z-10 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
		</motion.button>
	);
};

const ProfileDetails = ({ user }: { user: UserType }) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const { updateProfile, isLoading: isUpdateLoading } = useEditProfile();

	const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}) : "N/A";
	const updatedDate = user.updatedAt ? new Date(user.updatedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}) : "N/A";

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const handleEditClick = useCallback(() => {
		setIsEditModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsEditModalOpen(false);
	}, []);

	const handleSaveProfile = useCallback(
		async (updatedUserData: Partial<UserType>) => {
			await updateProfile(updatedUserData);
		},
		[updateProfile]
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen w-full bg-gradient-to-br from-white via-zinc-50/50 to-white pb-16"
		>
			{/* Header Section */}
			<div className="relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-100/20 blur-3xl" />
				<div className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-blue-100/20 blur-3xl" />

				<div className="relative px-6 py-8 sm:px-8 md:px-12 lg:px-16">
					<ProfileCard user={user} />
				</div>
			</div>

			{/* Main Content */}
			<div className="relative px-6 sm:px-8 md:px-12 lg:px-16 space-y-12">
				{/* Quick Info Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
				>
					<InfoCard
						icon={<Mail size={18} />}
						label="Email"
						value={user.email}
						delay={0}
					/>
					<InfoCard
						icon={<User size={18} />}
						label="Username"
						value={`@${user.username}`}
						delay={0.1}
					/>
					<InfoCard
						icon={<Calendar size={18} />}
						label="Joined"
						value={joinedDate}
						delay={0.2}
					/>
					<InfoCard
						icon={<RefreshCcw size={18} />}
						label="Last Updated"
						value={updatedDate}
						delay={0.3}
					/>
				</motion.div>

				{/* Account Information Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true, margin: "-100px" }}
				>
					<div className="mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-bricolage">
							Account Information
						</h2>
						<p className="mt-2 text-sm text-zinc-500">
							Manage and review your account details
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<motion.div
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0 }}
							viewport={{ once: true }}
							whileHover={{ y: -2 }}
							className="rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/70 p-6 shadow-md hover:shadow-lg transition-all duration-300"
						>
							<p className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">
								User ID
							</p>
							<p className="font-mono text-xs text-zinc-600 break-all leading-relaxed">
								{user._id}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -2 }}
							className="rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/70 p-6 shadow-md hover:shadow-lg transition-all duration-300"
						>
							<p className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">
								Provider
							</p>
							<p className="text-sm font-bricolage font-semibold text-zinc-900 capitalize">
								{user.provider}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							whileHover={{ y: -2 }}
							className="rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/70 p-6 shadow-md hover:shadow-lg transition-all duration-300"
						>
							<p className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">
								Active Resume
							</p>
							<p className="font-mono text-xs text-zinc-600 break-all leading-relaxed">
								{user.selectedResume || "None selected"}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
							whileHover={{ y: -2 }}
							className="rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/70 p-6 shadow-md hover:shadow-lg transition-all duration-300"
						>
							<p className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-2">
								Auth Status
							</p>
							<div className="flex items-center gap-2">
								<span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
								<span className="text-sm font-semibold text-zinc-900">Active</span>
							</div>
						</motion.div>
					</div>
				</motion.div>

				{/* Features Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true, margin: "-100px" }}
				>
					<div className="mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-bricolage">
							Profile Features
						</h2>
						<p className="mt-2 text-sm text-zinc-500">
							Explore what you can do with your profile
						</p>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						<FeatureCard
							icon={<Shield size={24} />}
							title="Secure Account"
							description="Your account is protected with industry-standard security protocols and encryption"
							delay={0}
						/>
						<FeatureCard
							icon={<Zap size={24} />}
							title="Fast Performance"
							description="Lightning-fast resume processing and portfolio rendering with optimal performance"
							delay={0.1}
						/>
						<FeatureCard
							icon={<Settings size={24} />}
							title="Customizable"
							description="Tailor your profile and resume templates to match your unique professional style"
							delay={0.2}
						/>
					</motion.div>
				</motion.div>

				{/* Action Buttons Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true, margin: "-100px" }}
				>
					<div className="mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-bricolage">
							Account Actions
						</h2>
						<p className="mt-2 text-sm text-zinc-500">
							Manage your account settings and preferences
						</p>
					</div>

					<div className="flex flex-wrap gap-3 sm:gap-4">
						<ActionButton
							icon={<Pencil size={16} />}
							label="Edit Profile"
							onClick={handleEditClick}
							delay={0}
						/>
						<ActionButton
							icon={<Settings size={16} />}
							label="Preferences"
							delay={0.1}
						/>
						<ActionButton
							icon={<RefreshCcw size={16} />}
							label="Refresh Data"
							delay={0.2}
						/>
						<ActionButton
							icon={<LogOut size={16} />}
							label="Logout"
							variant="danger"
							delay={0.3}
						/>
					</div>
				</motion.div>
			</div>

			{/* Footer Divider */}
			<motion.div
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
				viewport={{ once: true }}
				className="mt-16 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent origin-center"
			/>

			{/* Edit Profile Modal */}
			<EditProfileModal
				isOpen={isEditModalOpen}
				user={user}
				onClose={handleCloseModal}
				onSave={handleSaveProfile}
				isLoading={isUpdateLoading}
			/>
		</motion.div>
	);
};

export default ProfileDetails;