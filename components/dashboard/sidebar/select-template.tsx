import { motion, AnimatePresence, Variants } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface TemplateOption {
	id: string;
	name: string;
	description?: string;
	icon?: string;
}

const SelectTemplate = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<TemplateOption | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Sample template options
	const templateOptions: TemplateOption[] = [
		{
			id: '1',
			name: 'Modern Professional',
			description: 'Clean and contemporary design',
			icon: '📄'
		},
		{
			id: '2',
			name: 'Creative Portfolio',
			description: 'Stand out with creative flair',
			icon: '🎨'
		},
		{
			id: '3',
			name: 'Executive Classic',
			description: 'Traditional and refined',
			icon: '💼'
		},
		{
			id: '4',
			name: 'Minimalist',
			description: 'Simple and elegant',
			icon: '✨'
		},
		{
			id: '5',
			name: 'Tech Focused',
			description: 'Perfect for developers',
			icon: '💻'
		},
		{
			id: '6',
			name: 'Bold & Colorful',
			description: 'Make a statement',
			icon: '🌈'
		},
	];

	// Filter options based on search
	const filteredOptions = templateOptions.filter(option =>
		option.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		option.description?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Handle option selection
	const handleSelect = (option: TemplateOption) => {
		setSelectedOption(option);
		setIsOpen(false);
		setSearchQuery('');
	};

	// Animation variants
	const dropdownVariants: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
			y: -10,
			transition: {
				duration: 0.2,
			},
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
			},
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			y: -10,
			transition: {
				duration: 0.2,
			},
		},
	};

	const optionVariants: Variants = {
		hidden: { opacity: 0, x: -10 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.05,
				duration: 0.3,
			},
		}),
	};

	const iconVariants: Variants = {
		initial: { scale: 1, rotate: 0 },
		hover: {
			scale: 1.2,
			rotate: [0, -10, 10, -10, 0],
			transition: { duration: 0.5 }
		},
	};

	const chevronVariants: Variants = {
		closed: { rotate: 0 },
		open: { rotate: 180 },
	};

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<div className="mb-2">
				<label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
					Select Template
				</label>
			</div>

			<div className="relative" ref={dropdownRef}>
				{/* Main Select Button */}
				<motion.button
					className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200 group"
					onClick={() => setIsOpen(!isOpen)}
					whileHover={{ scale: 1.01 }}
					whileTap={{ scale: 0.99 }}
					animate={{
						borderColor: isOpen ? '#f59e0b' : '#e5e7eb',
					}}
					transition={{ duration: 0.2 }}
				>
					<div className="flex items-center gap-3 flex-1">
						{selectedOption ? (
							<>
								<motion.span
									className="text-2xl"
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ type: 'spring', stiffness: 500, damping: 25 }}
								>
									{selectedOption.icon}
								</motion.span>
								<div className="flex flex-col items-start">
									<span className="text-gray-900 font-medium font-poppins">
										{selectedOption.name}
									</span>
									<span className="text-xs text-gray-500">
										{selectedOption.description}
									</span>
								</div>
							</>
						) : (
							<span className="text-gray-400 font-poppins">
								Choose a template...
							</span>
						)}
					</div>

					{/* Chevron Icon */}
					<motion.svg
						className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors"
						variants={chevronVariants}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.3 }}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</motion.svg>

					{/* Active indicator */}
					<motion.div
						className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-400 to-orange-600"
						initial={{ width: 0 }}
						animate={{ width: isOpen ? '100%' : '0%' }}
						transition={{ duration: 0.3 }}
					/>
				</motion.button>

				{/* Dropdown Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							className="absolute z-50 w-full mt-2 bg-white border-2 border-orange-200 rounded-xl shadow-2xl overflow-hidden"
							variants={dropdownVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							{/* Search Input */}
							<div className="p-3 border-b border-gray-100 bg-linear-to-r from-orange-50 to-amber-50">
								<div className="relative">
									<motion.input
										type="text"
										placeholder="Search templates..."
										className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm font-poppins transition-all"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 }}
									/>
									<svg
										className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
							</div>

							{/* Options List */}
							<div className="max-h-64 overflow-y-auto custom-scrollbar">
								{filteredOptions.length > 0 ? (
									filteredOptions.map((option, index) => (
										<motion.div
											key={option.id}
											className="relative"
											variants={optionVariants}
											initial="hidden"
											animate="visible"
											custom={index}
										>
											<motion.button
												className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-linear-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200 group ${selectedOption?.id === option.id
														? 'bg-linear-to-r from-orange-100 to-amber-100'
														: ''
													}`}
												onClick={() => handleSelect(option)}
												whileHover={{ x: 4 }}
												whileTap={{ scale: 0.98 }}
											>
												{/* Icon */}
												<motion.span
													className="text-2xl"
													variants={iconVariants}
													initial="initial"
													whileHover="hover"
												>
													{option.icon}
												</motion.span>

												{/* Content */}
												<div className="flex-1 text-left">
													<div className="font-medium text-gray-900 font-poppins">
														{option.name}
													</div>
													<div className="text-xs text-gray-500 mt-0.5">
														{option.description}
													</div>
												</div>

												{/* Selected Indicator */}
												{selectedOption?.id === option.id && (
													<motion.div
														initial={{ scale: 0, rotate: -180 }}
														animate={{ scale: 1, rotate: 0 }}
														transition={{ type: 'spring', stiffness: 500, damping: 25 }}
													>
														<svg
															className="w-5 h-5 text-orange-500"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													</motion.div>
												)}

												{/* Hover glow effect */}
												<motion.div
													className="absolute inset-0 bg-linear-to-r from-orange-400/0 via-orange-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
													initial={{ x: '-100%' }}
													whileHover={{
														x: '100%',
														transition: { duration: 0.6, ease: 'easeInOut' },
													}}
												/>
											</motion.button>
										</motion.div>
									))
								) : (
									<motion.div
										className="px-4 py-8 text-center text-gray-400"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2 }}
									>
										<svg
											className="w-12 h-12 mx-auto mb-2 text-gray-300"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<p className="text-sm font-poppins">No templates found</p>
									</motion.div>
								)}
							</div>

							{/* Footer */}
							<motion.div
								className="p-3 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								<div className="flex items-center justify-between text-xs text-gray-500">
									<span className="font-poppins">
										{filteredOptions.length} template{filteredOptions.length !== 1 ? 's' : ''} available
									</span>
									<motion.button
										className="text-orange-600 hover:text-orange-700 font-medium"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										Browse all →
									</motion.button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Custom Scrollbar Styles */}
			<style jsx>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: #f3f4f6;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: linear-gradient(to bottom, #f59e0b, #f97316);
					border-radius: 3px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: linear-gradient(to bottom, #f97316, #ea580c);
				}
			`}</style>
		</div>
	);
};

export default SelectTemplate;