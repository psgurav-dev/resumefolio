"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, TEMPLATES } from "@/data/template";
import { headerVariants } from "./__motion__/variants";
import { TemplateCard } from "./template-card";

export default function TemplateLists() {
	const [filter, setFilter] = useState("All");

	const visibleTemplates =
		filter === "All"
			? TEMPLATES
			: TEMPLATES.filter((t) => t.tag === filter);

	return (
		<div className="bg-[#0B0B0F] text-[#EDEDE9] font-sans h-full">
			<div className="max-w-270 mx-auto px-6 py-16 pb-24">

				{/* Header */}
				<motion.div
					className="mb-12"
					variants={headerVariants}
					initial="hidden"
					animate="visible"
				>
					<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B7A] mb-3">
            		// component gallery
					</p>
					<h1 className="text-[clamp(28px,5vw,46px)] font-bold leading-[1.1] tracking-tight bg-linear-to-br from-[#EDEDE9] via-[#EDEDE9] to-[#6B6B7A] bg-clip-text text-transparent mb-3">
						Template Cards
					</h1>
					<p className="text-[15px] text-[#6B6B7A] max-w-110 leading-relaxed">
						Pick a starting point. Every template is a live component — fully
						editable, production-ready.
					</p>
				</motion.div>

				{/* Filters */}
				<motion.div
					className="flex flex-wrap gap-2 mb-10"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.4 }}
				>
					{CATEGORIES.map((c) => (
						<FilterPill
							key={c}
							label={c}
							active={filter === c}
							onClick={() => setFilter(c)}
						/>
					))}
				</motion.div>
				<motion.hr className="w-full h-4  shadow-2xl " />

				<div className="overflow-auto h-125 hide-scrollbar">
					{/* Grid */}
					<motion.div
						layout
						className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5"
					>
						<AnimatePresence mode="popLayout">
							{visibleTemplates.map((template, i) => (
								<TemplateCard
									key={template.id}
									template={template}
									index={i}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				</div>

			</div>
		</div>
	);
}


// ─────────────────────────────────────────────────────────────────────────────
// FilterPill
// ─────────────────────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				"font-mono text-[12px] tracking-[0.05em] px-4 py-1.5 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
				active
					? "bg-[#EDEDE9] text-[#0B0B0F] border-[#EDEDE9] font-semibold"
					: "bg-[#16161C] text-[#6B6B7A] border-transparent hover:text-[#EDEDE9] hover:border-[#2E2E38]",
			].join(" ")}
		>
			{label}
		</button>
	);
}