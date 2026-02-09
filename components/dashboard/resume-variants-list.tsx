import { motion } from 'motion/react';
import { useState } from 'react';
import { BrandButton } from '../ui/buttons';
import { EyeIcon } from '../ui/icons/eye-off-icon';
import { Resume } from '@/redux';


const ResumeDataVariantsList = ({ data }: { data: Resume[] }) => {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	// Container animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	} as const;

	// Card animation variants
	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 100,
				damping: 15,
			},
		},
		hover: {
			y: -8,
			scale: 1.02,
			transition: {
				type: 'spring' as const,
				stiffness: 400,
				damping: 25,
			},
		},
		tap: {
			scale: 0.98,
		},
	} as const;

	// Icon container variants
	const iconContainerVariants = {
		initial: {
			background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
		},
		hover: {
			background: 'linear-gradient(135deg, #B2CD9C 0%, #B2CD9C 100%)',
			transition: {
				duration: 0.3,
			},
		},
	} as const;

	// Icon animation variants
	const iconVariants = {
		initial: {
			scale: 1,
			rotate: 0,
		},
		hover: {
			scale: 1.1,
			rotate: [0, -5, 5, -5, 0],
			transition: {
				rotate: {
					repeat: Infinity,
					duration: 0.5,
				},
				scale: {
					duration: 0.2,
				},
			},
		},
		tap: {
			scale: 0.95,
		},
	};

	// Shimmer effect for loading state
	const shimmerVariants = {
		initial: { x: '-100%' },
		animate: {
			x: '100%',
			transition: {
				repeat: Infinity,
				duration: 1.5,
				ease: 'linear' as const,
			},
		},
	} as const;

	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{data.map((item, idx) => {
				const itemId = item._id?.toString() ?? `item-${idx}`;
				return (
				<motion.div
					key={itemId}
					className="group relative cursor-pointer"
					variants={cardVariants}
					whileHover="hover"
					whileTap="tap"
					onHoverStart={() => setHoveredId(itemId)}
					onHoverEnd={() => setHoveredId(null)}
				>
					{/* Card Container */}
					<div className="flex flex-col items-start rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 ">

						{/* Icon Container */}
						<motion.div
							className="w-full p-8 flex flex-col items-center justify-center relative overflow-hidden"
							variants={iconContainerVariants}
							initial="initial"
							animate={hoveredId === itemId ? "hover" : "initial"}
						>
							{/* Shimmer effect overlay */}
							<motion.div
								className="absolute inset-0 w-full h-full"
								style={{
									background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
								}}
								variants={shimmerVariants}
								initial="initial"
								animate={hoveredId === itemId ? "animate" : "initial"}
							/>

							{/* Icon */}
							<motion.img
								src="/note-icon.svg"
								className="w-20 h-20 relative z-10 drop-shadow-lg"
								alt={item.name}
								variants={iconVariants}
								initial="initial"
							animate={hoveredId === itemId ? "hover" : "initial"}
							whileTap="tap"
							/>
						</motion.div>

						{/* Content Container */}
						<div className="w-full px-4 py-4 bg-white">
							{/* Title */}
							<motion.h3
								className="font-poppins text-base font-semibold text-gray-900 truncate mb-1"
								initial={{ opacity: 0.8 }}
								animate={hoveredId === itemId ? {
									opacity: 1,
									x: [0, 2, 0],
									transition: { duration: 0.3 }
								} : { opacity: 0.8 }}
							>
								{item.name}
							</motion.h3>

							{/* Metadata */}
							<div className="flex items-center gap-2 text-xs text-gray-500">
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: idx * 0.1 + 0.3 }}
								>
									{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Recently'}
								</motion.span>

								{/* Animated dot separator */}
								<motion.span
									className="w-1 h-1 rounded-full bg-gray-400"
								animate={hoveredId === itemId ? {
									scale: [1, 1.5, 1],
									transition: { repeat: Infinity, duration: 1 }
								} : { scale: 1 }}
							/>

								<motion.span
									className="text-orange-500 font-poppins"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: idx * 0.1 + 0.4 }}
								>
									Resume
								</motion.span>
							</div>


						</div>

						{/* Corner badge */}
						<motion.div
							className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
							initial={{ scale: 0, rotate: -45 }}
							animate={hoveredId === itemId ? {
								scale: 1,
								rotate: 0,
								transition: { type: 'spring' as const, stiffness: 500, damping: 15 }
							} : {
								scale: 0,
								rotate: -45
							}}
						>
							#{idx + 1}
						</motion.div>

						{/* Buttons */}
						<motion.div className='py-2 w-full flex items-center justify-center'>
							<BrandButton text='View Document' Icon={EyeIcon} handleClick={() => { }} />
						</motion.div>
					</div>
				</motion.div>
				);
			})}
		</motion.div>
	);
};

export default ResumeDataVariantsList;