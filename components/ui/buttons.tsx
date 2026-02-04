import { useEffect, useRef, useState } from "react";
import { FileCodeCorner, } from "lucide-react";
import { motion } from "motion/react";
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
				className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-[#1C465D] from-40% via-primary to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
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
