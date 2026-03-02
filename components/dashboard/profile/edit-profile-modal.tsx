'use client';

/**
 * EditProfileModal Component
 * 
 * A fully-featured modal for editing user profile information with:
 * - Real-time form validation
 * - Smooth animations (motion)
 * - Error and success states
 * - Loading states
 * - Change detection
 * - Accessibility features
 * 
 * @component
 * @example
 * ```tsx
 * <EditProfileModal
 *   isOpen={isOpen}
 *   user={currentUser}
 *   onClose={handleClose}
 *   onSave={handleSave}
 *   isLoading={isLoading}
 * />
 * ```
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useMemo } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { User } from "@/redux/slices/usersSlice";

interface EditProfileModalProps {
	isOpen: boolean;
	user: User | null;
	onClose: () => void;
	onSave: (updatedUser: Partial<User>) => Promise<void>;
	isLoading?: boolean;
}

interface FormErrors {
	[key: string]: string;
}

interface FormData {
	name: string;
	email: string;
	username?: string;
}

const EditProfileModal = ({
	isOpen,
	user,
	onClose,
	onSave,
	isLoading = false,
}: EditProfileModalProps) => {
	const [formData, setFormData] = useState<FormData>({
		name: user?.name || "",
		email: user?.email || "",
		username: user?.username || "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	// Validation rules
	const validateForm = useCallback((): boolean => {
		const newErrors: FormErrors = {};

		// Name validation
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (formData.name.trim().length < 2) {
			newErrors.name = "Name must be at least 2 characters";
		} else if (formData.name.length > 100) {
			newErrors.name = "Name cannot exceed 100 characters";
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Username validation
		if (formData.username) {
			if (formData.username.length < 3) {
				newErrors.username = "Username must be at least 3 characters";
			} else if (formData.username.length > 50) {
				newErrors.username = "Username cannot exceed 50 characters";
			} else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
				newErrors.username = "Username can only contain letters, numbers, hyphens, and underscores";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);

	// Handle input changes
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));
			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({ ...prev, [name]: "" }));
			}
			setSubmitError(null);
		},
		[errors]
	);

	// Check if form has changes
	const hasChanges = useMemo(() => {
		return (
			formData.name !== (user?.name || "") ||
			formData.email !== (user?.email || "") ||
			formData.username !== (user?.username || "")
		);
	}, [formData, user]);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);

		try {
			const updatedData: Partial<User> = {
				name: formData.name.trim(),
				email: formData.email.trim(),
				username: formData.username?.trim(),
			};

			await onSave(updatedData);
			setSubmitSuccess(true);

			// Close modal after success
			setTimeout(() => {
				handleClose();
			}, 1500);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to update profile";
			setSubmitError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle modal close
	const handleClose = useCallback(() => {
		setFormData({
			name: user?.name || "",
			email: user?.email || "",
			username: user?.username || "",
		});
		setErrors({});
		setSubmitError(null);
		setSubmitSuccess(false);
		onClose();
	}, [user, onClose]);

	// Reset form to initial state
	const handleReset = useCallback(() => {
		setFormData({
			name: user?.name || "",
			email: user?.email || "",
			username: user?.username || "",
		});
		setErrors({});
		setSubmitError(null);
		setSubmitSuccess(false);
	}, [user]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleClose}
						className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-200/50 bg-gradient-to-br from-white via-zinc-50 to-white shadow-2xl"
					>
						{/* Header */}
						<div className="relative border-b border-zinc-200/50 px-6 py-6 sm:px-8">
							<h2 className="text-xl font-bold text-zinc-900 font-bricolage">
								Edit Profile
							</h2>
							<p className="mt-1 text-sm text-zinc-500">
								Update your profile information
							</p>

							{/* Close Button */}
							<motion.button
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleClose}
								disabled={isSubmitting}
								className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-600 disabled:opacity-50 transition-colors"
							>
								<X size={20} />
							</motion.button>
						</div>

						{/* Form Content */}
						<form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8">
							{/* Error Alert */}
							<AnimatePresence>
								{submitError && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="mb-4 flex items-start gap-3 rounded-xl border border-red-200/50 bg-red-50 p-4"
									>
										<AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-600" />
										<div>
											<p className="text-sm font-semibold text-red-900">Error</p>
											<p className="mt-0.5 text-sm text-red-700">{submitError}</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Success Alert */}
							<AnimatePresence>
								{submitSuccess && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200/50 bg-emerald-50 p-4"
									>
										<CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-emerald-600" />
										<div>
											<p className="text-sm font-semibold text-emerald-900">Success</p>
											<p className="mt-0.5 text-sm text-emerald-700">Profile updated successfully</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Form Fields */}
							<div className="space-y-5">
								{/* Name Field */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}
								>
									<label htmlFor="name" className="block text-sm font-semibold text-zinc-900 mb-2">
										Full Name
										<span className="text-red-500 ml-1">*</span>
									</label>
									<input
										id="name"
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										disabled={isSubmitting || isLoading}
										placeholder="Enter your full name"
										className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 placeholder:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ${
											errors.name
												? "border-red-300 bg-red-50/30 focus:ring-red-200"
												: "border-zinc-200 bg-white focus:border-emerald-300 focus:ring-emerald-200"
										}`}
									/>
									<AnimatePresence>
										{errors.name && (
											<motion.p
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -5 }}
												className="mt-1 text-xs text-red-600 font-medium"
											>
												{errors.name}
											</motion.p>
										)}
									</AnimatePresence>
								</motion.div>

								{/* Email Field */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.15 }}
								>
									<label htmlFor="email" className="block text-sm font-semibold text-zinc-900 mb-2">
										Email Address
										<span className="text-red-500 ml-1">*</span>
									</label>
									<input
										id="email"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										disabled={isSubmitting || isLoading}
										placeholder="Enter your email"
										className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 placeholder:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ${
											errors.email
												? "border-red-300 bg-red-50/30 focus:ring-red-200"
												: "border-zinc-200 bg-white focus:border-emerald-300 focus:ring-emerald-200"
										}`}
									/>
									<AnimatePresence>
										{errors.email && (
											<motion.p
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -5 }}
												className="mt-1 text-xs text-red-600 font-medium"
											>
												{errors.email}
											</motion.p>
										)}
									</AnimatePresence>
								</motion.div>

								{/* Username Field */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<label htmlFor="username" className="block text-sm font-semibold text-zinc-900 mb-2">
										Username
									</label>
									<input
										id="username"
										type="text"
										name="username"
										value={formData.username}
										onChange={handleInputChange}
										disabled={isSubmitting || isLoading}
										placeholder="Enter your username (optional)"
										className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 placeholder:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ${
											errors.username
												? "border-red-300 bg-red-50/30 focus:ring-red-200"
												: "border-zinc-200 bg-white focus:border-emerald-300 focus:ring-emerald-200"
										}`}
									/>
									<AnimatePresence>
										{errors.username && (
											<motion.p
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -5 }}
												className="mt-1 text-xs text-red-600 font-medium"
											>
												{errors.username}
											</motion.p>
										)}
									</AnimatePresence>
									<p className="mt-1 text-xs text-zinc-500">
										Can contain letters, numbers, hyphens, and underscores
									</p>
								</motion.div>
							</div>

							{/* Action Buttons */}
							<div className="mt-8 flex gap-3">
								<motion.button
									type="button"
									onClick={handleReset}
									disabled={!hasChanges || isSubmitting || isLoading}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Reset
								</motion.button>

								<motion.button
									type="submit"
									disabled={!hasChanges || isSubmitting || isLoading || Object.keys(errors).length > 0}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isSubmitting || isLoading ? (
										<span className="flex items-center justify-center gap-2">
											<motion.div
												animate={{ rotate: 360 }}
												transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
												className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
											/>
											Saving...
										</span>
									) : (
										"Save Changes"
									)}
								</motion.button>
							</div>
						</form>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default EditProfileModal;
