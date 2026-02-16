import { ReactNode, useEffect, useRef, useState } from "react";
import { ExternalLink, FileCodeCorner, } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const TARGET_TEXT = "Convert To Portfolio";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";




export const EncryptButton = ({ handleConvertToPortfolio, isLoading }: { handleConvertToPortfolio: () => void, isLoading?: boolean }) => {
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const [text, setText] = useState(TARGET_TEXT);

	const scramble = () => {
		let pos = 0;

		intervalRef.current = setInterval(() => {
			const scrambled = TARGET_TEXT.split("")
				.map((char, index) => {
					if (pos / CYCLES_PER_LETTER > index) {
						return char;
					}

					const randomCharIndex = Math.floor(Math.random() * CHARS.length);
					const randomChar = CHARS[randomCharIndex];

					return randomChar;
				})
				.join("");

			setText(scrambled);
			pos++;

			if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
				stopScramble();
			}
		}, SHUFFLE_TIME);
	};

	const stopScramble = () => {
		clearInterval(intervalRef.current || undefined);

		setText(TARGET_TEXT);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		handleConvertToPortfolio();

	}
	return (
		<motion.button
			whileHover={{
				scale: 1.025,
			}}
			whileTap={{
				scale: 0.975,
			}}
			onMouseEnter={scramble}
			onMouseLeave={stopScramble}
			onClick={handleClick}
			disabled={isLoading}
			className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-transparent px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-gray-200 cursor-pointer"
		>
			<div className="relative z-10 flex items-center gap-2">
				<FileCodeCorner />
				<span className="font-bricolage font-light">{text}</span>
			</div>
			<motion.span
				initial={{
					y: "100%",
				}}
				animate={{
					y: "-100%",
				}}
				transition={{
					repeat: Infinity,
					repeatType: "mirror",
					duration: 1,
					ease: "linear",
				}}
				className="duration-300 absolute inset-0 z-0 scale-125 bg-linear-to-t from-[#1C465D] from-40% via-primary to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
			/>
		</motion.button>
	);
};

export function HoverBorderGradient({
	children,
	containerClassName,
	className,
	as: Tag = "button",
	duration = 1,
	clockwise = true,
	...props
}: React.PropsWithChildren<
	{
		as?: React.ElementType;
		containerClassName?: string;
		className?: string;
		duration?: number;
		clockwise?: boolean;
	} & React.HTMLAttributes<HTMLElement>
>) {
	const [hovered, setHovered] = useState<boolean>(false);
	const [direction, setDirection] = useState<Direction>("TOP");

	const rotateDirection = (currentDirection: Direction): Direction => {
		const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
		const currentIndex = directions.indexOf(currentDirection);
		const nextIndex = clockwise
			? (currentIndex - 1 + directions.length) % directions.length
			: (currentIndex + 1) % directions.length;
		return directions[nextIndex];
	};

	const movingMap: Record<Direction, string> = {
		TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		BOTTOM:
			"radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
		RIGHT:
			"radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
	};

	const highlight =
		"radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

	useEffect(() => {
		if (!hovered) {
			const interval = setInterval(() => {
				setDirection((prevState) => rotateDirection(prevState));
			}, duration * 1000);
			return () => clearInterval(interval);
		}
	}, [hovered]);
	return (
		<Tag
			onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
				setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
			className={cn(
				"relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
				containerClassName
			)}
			{...props}
		>
			<div
				className={cn(
					"w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
					className
				)}
			>
				{children}
			</div>
			<motion.div
				className={cn(
					"flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
				)}
				style={{
					filter: "blur(2px)",
					position: "absolute",
					width: "100%",
					height: "100%",
				}}
				initial={{ background: movingMap[direction] }}
				animate={{
					background: hovered
						? [movingMap[direction], highlight]
						: movingMap[direction],
				}}
				transition={{ ease: "linear", duration: duration ?? 1 }}
			/>
			<div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
		</Tag>
	);
}


export function HoverBorderGradientDemo() {
	return (
		<div className="m-40 flex justify-center text-center">
			<HoverBorderGradient
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
			>
				<AceternityLogo />
				<span>Aceternity UI</span>
			</HoverBorderGradient>
		</div>
	);
}

const AceternityLogo = () => {
	return (
		<svg
			width="66"
			height="65"
			viewBox="0 0 66 65"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-3 w-3 text-black dark:text-white"
		>
			<path
				d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
				stroke="currentColor"
				strokeWidth="15"
				strokeMiterlimit="3.86874"
				strokeLinecap="round"
			/>
		</svg>
	);
};


export const HoverFillButton = (props: { text: string, handleClick: () => void }) => {
	const [hover, setHover] = useState(false)
	return (
		<motion.div
			onHoverStart={() => setHover(true)}
			onHoverEnd={() => setHover(false)}
			className="bg-black p-1.5 rounded-2xl relative w-48 h-12 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
		>
			{/* Animated background */}
			<motion.div
				layout
				initial={false}
				animate={{
					width: hover ? '100%' : '26%',
					height: hover ? '100%' : '100%',
					x: hover ? '0%' : '0%',
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30
				}}
				className="bg-white rounded-[14px] absolute inset-0"
				style={{
					boxShadow: hover
						? 'inset 0 1px 2px rgba(0,0,0,0.1)'
						: 'inset 0 1px 2px rgba(0,0,0,0.05)'
				}}
			/>

			{/* Icon */}
			<ExternalLink
				className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300"
				style={{ color: hover ? "#000" : "#ef4444" }}
				size={18}
			/>

			{/* Text with smooth color transition */}
			<motion.span
				animate={{
					color: hover ? "#000" : "#fff",
					x: hover ? 0 : 0
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut"
				}}
				className="text-sm font-poppins absolute left-16 top-1/2 -translate-y-1/2 z-10"
			>
				{props.text}
			</motion.span>
		</motion.div>
	)
}

// aniamted buttons
export const BrandButton = ({ Icon, text, handleClick, className }: {
	Icon: React.ComponentType<any>,
	text: string,
	handleClick: (e: any) => void
	className?: string
}) => {
	const iconRef = useRef<any>(null);
	const iconControls = useAnimation();
	return (
		<motion.button
			onClick={handleClick}
			onMouseEnter={() => {
				iconRef.current?.startAnimation();
				iconControls.start({ rotate: 180 });
			}}
			onMouseLeave={() => {
				iconRef.current?.stopAnimation();
				iconControls.start({ rotate: 0 });
			}}

			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={cn("relative bg-linear-to-br from-zinc-800 via-zinc-900 to-black h-11 font-manrope text-white px-6 py-2.5 text-sm rounded-xl font-bold transition-all duration-300 text-center cursor-pointer flex items-center gap-x-3 overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-zinc-900/50", className)}
		>
			{/* Animated gradient overlay */}
			<motion.div
				className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
				animate={{
					x: ['-100%', '100%'],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: "linear",
					repeatDelay: 1
				}}
			/>

			{/* Glow effect on hover */}
			<motion.div
				className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"
			/>

			{/* Icon with rotation animation */}
			<motion.div
				className="relative z-10 group-hover:rotate-180 transition-all ease-in-out duration-700"
			>
				<Icon ref={iconRef} />
			</motion.div>

			{/* Text */}
			<span className="relative z-10 bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
				{text}
			</span>

			{/* Border highlight */}
			<motion.div
				className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors duration-300"
			/>
		</motion.button>
	)
}


interface SidebarButtonProps {
	text: string;
	icon: React.ComponentType<any>;
	isSelected: boolean;
	onClick: () => void;
	badge?: number | string;
}

export const SidebarButton = ({
	text,
	icon: Icon,
	isSelected,
	onClick,
	badge
}: SidebarButtonProps) => {
	const iconRef = useRef<any>(null);
	const iconControls = useAnimation();

	const handleClick = () => {
		onClick();
	};

	return (
		<motion.button
			onClick={handleClick}
			onMouseEnter={() => {
				iconRef.current?.startAnimation?.();
				iconControls.start({ scale: 1.05 });
			}}
			onMouseLeave={() => {
				iconRef.current?.stopAnimation?.();
				iconControls.start({ scale: 1 });
			}}
			whileHover={{ x: 4 }}
			whileTap={{ scale: 0.97 }}
			className={`
				relative w-full h-11 px-3.5 py-2.5 
				rounded-[11px] font-manrope text-sm font-medium
				transition-all duration-300 text-left cursor-pointer 
				flex items-center gap-3 overflow-hidden group
				${isSelected
					? 'bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl'
					: 'bg-white/40 backdrop-blur-md hover:bg-white/60'
				}
			`}
			animate={{
				boxShadow: isSelected
					? '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
					: '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
			}}
			transition={{ duration: 0.3 }}
		>
			{/* Animated shimmer overlay - only on selected */}
			{isSelected && (
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
					animate={{
						x: ['-100%', '100%'],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
						repeatDelay: 2
					}}
				/>
			)}

			{/* Glow effect on hover */}
			<motion.div
				className={`
					absolute inset-0 rounded-[11px] opacity-0 
					group-hover:opacity-100 transition-opacity duration-500
					${isSelected
						? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent'
						: 'bg-gradient-to-br from-gray-100/80 via-gray-50/40 to-transparent'
					}
				`}
			/>

			{/* Active indicator bar */}
			<motion.div
				className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 shadow-lg shadow-gray-400/50"
				initial={{ height: 0, opacity: 0 }}
				animate={{
					height: isSelected ? '65%' : 0,
					opacity: isSelected ? 1 : 0,
				}}
				transition={{ duration: 0.3, ease: "easeOut" }}
			/>

			{/* Icon with animation */}
			<motion.div
				className="relative z-10 flex-shrink-0"
				animate={iconControls}
				transition={{ duration: 0.4, ease: "easeInOut" }}
			>
				<Icon
					ref={iconRef}
					className={`
						w-[18px] h-[18px] transition-all duration-300
						${isSelected
							? 'text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]'
							: 'text-gray-700 group-hover:text-gray-900'
						}
					`}
					strokeWidth={isSelected ? 2.5 : 2}
				/>
			</motion.div>

			{/* Text */}
			<span
				className={`
					relative z-10 flex-1 transition-all duration-300
					${isSelected
						? 'text-white  drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]'
						: 'text-gray-800 group-hover:text-gray-950 font-medium'
					}
				`}
			>
				{text}
			</span>

			{/* Badge */}
			{badge !== undefined && (
				<motion.div
					className={`
						relative z-10 min-w-[18px] h-[18px] px-1.5 
						rounded-[6px] flex items-center justify-center 
						text-[10px] font-bold transition-all duration-300
						${isSelected
							? 'bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-lg shadow-white/20'
							: 'bg-gray-900/10 text-gray-700 backdrop-blur-sm border border-gray-200/50 group-hover:bg-gray-900/20 group-hover:text-gray-900'
						}
					`}
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ type: 'spring', stiffness: 400, damping: 20 }}
				>
					{badge}
				</motion.div>
			)}

			{/* Border highlight with glassmorphic effect */}
			<div
				className={`
					absolute inset-0 rounded-[11px] 
					transition-all duration-300
					${isSelected
						? 'border border-white/20 group-hover:border-white/40'
						: 'border border-gray-200/50 group-hover:border-gray-300/80'
					}
				`}
			/>

			{/* Inner glow for glassmorphic depth */}
			{isSelected && (
				<div className="absolute inset-0 rounded-[11px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
			)}

			{/* Ripple effect on click */}
			<motion.div
				className="absolute inset-0 rounded-[11px]"
				initial={{ scale: 0, opacity: 0.6 }}
				whileTap={{
					scale: 2.5,
					opacity: 0,
					transition: { duration: 0.5, ease: "easeOut" }
				}}
				style={{
					background: isSelected
						? 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
						: 'radial-gradient(circle, rgba(107,114,128,0.3) 0%, transparent 70%)'
				}}
			/>
		</motion.button>
	);
};


