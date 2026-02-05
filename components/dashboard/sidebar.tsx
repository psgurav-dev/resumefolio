"use client";
import { ChevronDown, GalleryHorizontalEnd } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";

const Option = ({
	text,
	Icon,
	setOpen,
}: {
	text: string;
	Icon: any;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<motion.li
			variants={itemVariants}
			onClick={() => setOpen(false)}
			className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
		>
			<motion.span variants={actionIconVariants}>
				<Icon />
			</motion.span>
			<span>{text}</span>
		</motion.li>
	);
};

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
};

const iconVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 },
};

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
		},
	},
	closed: {
		opacity: 0,
		y: -15,
		transition: {
			when: "afterChildren",
		},
	},
};

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 },
};

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="bg-gray-100 w-3xs h-screen flex flex-col items-start">
			<div className="w-full p-4 flex items-center px-8 gap-x-2">
				<GalleryHorizontalEnd size={24} />
				<h5 className="font-light text-xl font-bricolage text-center">Resumefolio</h5>
			</div>

			<div className="w-full my-2">
				<motion.div className="flex flex-col items-start gap-y-4 mx-8">
					<motion.div animate={open ? "open" : "closed"} className="relative w-full">
						<span className="text-xs">Select template</span>
						<button
							onClick={() => setOpen((pv) => !pv)}
							className="flex justify-evenly gap-2 px-3 py-2 rounded-md text-indigo-50 bg-black hover:bg-blac/80 transition-colors w-full"
						>
							<span className="font-inter text-sm">Tempaltes</span>
							<motion.span variants={iconVariants}>
								<ChevronDown size={16} />
							</motion.span>
						</button>
						<motion.ul
							initial={wrapperVariants.closed}
							variants={wrapperVariants}
							style={{ originY: "top", translateX: "-50%" }}
							className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
						>
							<Option setOpen={setOpen} Icon={GalleryHorizontalEnd} text="Edit" />
							<Option setOpen={setOpen} Icon={GalleryHorizontalEnd} text="Duplicate" />
							<Option setOpen={setOpen} Icon={GalleryHorizontalEnd} text="Share" />
							<Option setOpen={setOpen} Icon={GalleryHorizontalEnd} text="Remove" />
						</motion.ul>
					</motion.div>
				</motion.div>
			</div>
		</div>
	)
}
export default Sidebar;