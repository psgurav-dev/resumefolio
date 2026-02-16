import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cardVariants, textSlideVariants } from "./__motion__/variants";
import ModernTheme from "@/templates/modern-1";
import { StatBadgeProps, TemplateProps } from "./__types__";
import { MOCK_PORTFOLIO } from "@/data/template";



export const TemplateCard = ({ template, index }: { template: TemplateProps; index: number }) => {
	const [hovered, setHovered] = useState(false);
	const [clicked, setClicked] = useState(false);

	const { tag, title, description, author, avatar, uses, accent } = template;

	const handleUse = () => {
		setClicked(true);
		setTimeout(() => setClicked(false), 1600);
	};

	return (
		<motion.article
			className="relative overflow-hidden rounded-[18px] p-[22px] cursor-default flex flex-col"
			style={{
				background: `color-mix(in srgb, ${accent} 6%, #0B0B0F)`,
				border: `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
			}}
			custom={index}
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
		>
			{/* Glow blob */}
			<motion.div
				className="pointer-events-none absolute inset-[-40px] z-0"
				style={{
					background: `radial-gradient(circle at 50% 0%,
            color-mix(in srgb, ${accent} 20%, transparent) 0%,
            transparent 65%)`,
				}}
				animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
				transition={{ duration: 0.4 }}
			/>

			<div className="relative z-10 flex flex-col flex-1">
				{/* Preview snapshot */}
				<TemplatePreview template={template} hovered={hovered} />

				{/* Tag + stat */}
				<div className="flex items-center justify-between mb-[14px]">
					<span
						className="font-mono text-[10px] uppercase tracking-[0.18em] rounded-md px-[10px] py-1"
						style={{
							color: accent,
							background: `color-mix(in srgb, ${accent} 14%, #0B0B0F)`,
						}}
					>
						{tag}
					</span>
					<StatBadge label="uses" value={uses} accent={accent} />
				</div>

				{/* Title */}
				<motion.h3
					className="text-[19px] font-bold leading-[1.2] tracking-tight mb-[8px]"
					animate={{ color: hovered ? accent : "#EDEDE9" }}
					transition={{ duration: 0.25 }}
				>
					{title}
				</motion.h3>

				{/* Description */}
				<p className="text-[13px] leading-[1.65] text-[#7A7A8A] mb-[18px] flex-1">
					{description}
				</p>

				{/* Animated divider */}
				<motion.div
					className="h-px rounded-full mb-[16px]"
					style={{ background: accent, transformOrigin: "left" }}
					animate={{ scaleX: hovered ? 1 : 0.35, opacity: hovered ? 0.6 : 0.2 }}
					transition={{ duration: 0.35 }}
				/>

				{/* Footer */}
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-[9px]">
						<div
							className="w-[28px] h-[28px] rounded-full flex items-center justify-center font-mono text-[10px] font-medium flex-shrink-0"
							style={{
								color: accent,
								background: `color-mix(in srgb, ${accent} 20%, #1A1A22)`,
								border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
							}}
						>
							{avatar}
						</div>
						<span className="text-[12px] text-[#5A5A6A]">{author}</span>
					</div>

					<motion.button
						type="button"
						className="font-mono text-[11px] tracking-wide px-[14px] py-[7px] rounded-[9px] min-w-[118px] text-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
						style={{
							color: clicked ? "#fff" : accent,
							border: `1px solid color-mix(in srgb, ${accent} 40%, transparent)`,
							outlineColor: accent,
						}}
						onClick={handleUse}
						whileTap={{ scale: 0.93 }}
						animate={{ backgroundColor: clicked ? accent : "transparent" }}
						transition={{ duration: 0.25 }}
					>
						<AnimatePresence mode="wait">
							{clicked ? (
								<motion.span
									key="check"
									variants={textSlideVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="block"
								>
									✓ Added
								</motion.span>
							) : (
								<motion.span
									key="use"
									variants={textSlideVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="block"
								>
									Use Template →
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>
		</motion.article>
	);
};


function StatBadge({ label, value, accent }: StatBadgeProps) {
	return (
		<div className="flex flex-col items-end gap-0.5">
			<span
				className="font-mono text-[13px] font-medium leading-none"
				style={{ color: accent }}
			>
				{value}
			</span>
			<span className="font-mono text-[10px] uppercase tracking-widest text-[#4A4A58]">
				{label}
			</span>
		</div>
	);
}


// ─────────────────────────────────────────────────────────────────────────────
// TemplatePreview — clipped, scaled snapshot window shown at top of card
// ─────────────────────────────────────────────────────────────────────────────

// The natural width we render ModernTheme at (px)
const SNAPSHOT_NATURAL_WIDTH = 1400;

function TemplatePreview({ template, hovered }: { template: TemplateProps; hovered: boolean }) {
	const { accent, tag, preview } = template;

	// We want the preview box to be ~16:10 aspect ratio.
	// The card column min is 300px. At 300px card width with 22px padding each side,
	// the inner width ≈ 256px. Scale factor = 256 / 1200 ≈ 0.2133
	const SCALE = 0.2133;
	const BOX_HEIGHT_RATIO = "62%"; // 16:10

	return (
		<div
			className="relative w-full rounded-xl overflow-hidden mb-5"
			style={{
				paddingBottom: BOX_HEIGHT_RATIO,
				border: `1px solid color-mix(in srgb, ${accent} 12%, white 3%)`,
			}}
		>
			{/* Bottom fade — blends snapshot into card background */}
			<div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background: `linear-gradient(to bottom,
            transparent 50%,
            color-mix(in srgb, ${accent} 4%, #0B0B0F) 100%)`,
				}}
			/>

			{/* Hover shine sweep */}
			<motion.div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%)",
					backgroundSize: "250% 100%",
				}}
				animate={{ backgroundPositionX: hovered ? "0%" : "200%" }}
				transition={{ duration: 0.7, ease: "easeInOut" }}
			/>

			{/* Scale wrapper — zooms subtly on hover */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				animate={{ scale: hovered ? 1.04 : 1 }}
				transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
				style={{ transformOrigin: "top center" }}
			>
				{preview === "modern" ? (
					<div
						style={{
							transformOrigin: "top left",
							transform: `scale(${SCALE})`,
							width: SNAPSHOT_NATURAL_WIDTH,
							// Prevent the oversized element from creating scrollbars
							position: "absolute",
							top: 0,
							left: 0,
						}}
					>
						<ModernTheme data={MOCK_PORTFOLIO} />
					</div>
				) : (
					<div className="absolute inset-0">
						<AbstractPreview accent={accent} tag={tag} />
					</div>
				)}
			</motion.div>
		</div>
	);
}


// ─────────────────────────────────────────────────────────────────────────────
// AbstractPreview — decorative placeholder for non-ModernTheme cards
// ─────────────────────────────────────────────────────────────────────────────
function AbstractPreview({ accent, tag }: { accent: string; tag: string }) {
	return (
		<div
			className="w-full h-full flex flex-col p-5 gap-3"
			style={{ background: `color-mix(in srgb, ${accent} 5%, #0e0e14)` }}
		>
			{/* Fake nav bar */}
			<div className="flex items-center justify-between mb-1">
				<div className="h-2 rounded-full w-20 opacity-60" style={{ background: accent }} />
				<div className="flex gap-1.5">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-2 h-2 rounded-full bg-white/10" />
					))}
				</div>
			</div>
			{/* Body skeleton */}
			<div className="flex gap-3 flex-1">
				<div className="flex flex-col gap-2 flex-1">
					{[90, 60, 75, 50].map((w, i) => (
						<div key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
					))}
					<div
						className="mt-auto h-14 rounded-lg opacity-20"
						style={{ background: accent }}
					/>
				</div>
				{/* Mini bar chart */}
				<div className="flex items-end gap-1 w-16">
					{[70, 45, 85, 55, 65, 40].map((h, i) => (
						<div
							key={i}
							className="flex-1 rounded-sm opacity-60"
							style={{ height: `${h}%`, background: accent }}
						/>
					))}
				</div>
			</div>
			{/* Category label */}
			<div
				className="self-start font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
				style={{
					color: accent,
					background: `color-mix(in srgb, ${accent} 15%, transparent)`,
				}}
			>
				{tag}
			</div>
		</div>
	);
}


