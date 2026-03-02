import { Resume } from "@/redux";
import { motion } from "motion/react";
import { cardVariants, iconContainerVariants, iconVariants, shimmerVariants } from "./__motion__";
import { BrandButton } from "@/components/ui/buttons";
import { EyeIcon } from "@/components/ui/icons/eye-off-icon";


const ResumeCard = ({ idx, itemId, item, hoveredId, setHoveredId }: { idx: number, itemId: string, item: Resume, hoveredId: string | null, setHoveredId: (id: string | null) => void }) => {
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
			<div className="flex flex-col items-start rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 py-8">

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
						className="font-poppins text-base font-medium text-gray-900 truncate mb-1"
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
				<motion.div className='py-2 w-full flex flex-col gap-2 items-center justify-center px-4'>
					<BrandButton text='View Document' className="w-full mx-4 flex items-center justify-center" Icon={EyeIcon} handleClick={() => { }} />
				</motion.div>
			</div>
		</motion.div>
	)
}

export default ResumeCard;