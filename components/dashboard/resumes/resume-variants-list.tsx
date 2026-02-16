import { motion } from 'motion/react';
import { useState } from 'react';
import { Resume } from '@/redux';

import ResumeCard from './resume-card';
import { containerVariants } from './__motion__';



const ResumeDataVariantsList = ({ data }: { data: Resume[] }) => {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
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
					<ResumeCard key={idx} idx={idx} itemId={itemId} item={item} hoveredId={hoveredId} setHoveredId={setHoveredId} />
				);
			})}
		</motion.div>
	);
};

export default ResumeDataVariantsList;