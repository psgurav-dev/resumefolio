import { motion } from "motion/react"

const ProfileCard = ({ user }: { user: any }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
			className="mb-8 overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/80 shadow-2xl shadow-zinc-300/40 backdrop-blur-xl"
		>
			{/* banner */}
			<div
				className="relative h-32 w-full"
				style={{
					background:
						"linear-gradient(135deg, #18181b 0%, #3f3f46 50%, #52525b 100%)",
				}}
			>
				{/* decorative rings */}
				<div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
				<div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/5" />
				<div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

				{/* provider badge */}
				<div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
					<div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
					<span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
						{user?.provider || "google"}
					</span>
				</div>
			</div>

			{/* avatar + name row */}
			<div className="relative flex flex-col items-start gap-4 px-7 pb-7 pt-0 sm:flex-row sm:items-end">
				{/* avatar */}
				<motion.div
					initial={{ scale: 0.6, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className="-mt-10 shrink-0"
				>
					<div className="relative">
						{/* glow ring */}
						<div className="absolute inset-0 rounded-2xl bg-zinc-900 blur-md opacity-20 scale-110" />
						<div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-xl text-2xl font-bold tracking-tight">
							PG
						</div>
						{/* online dot */}
						<span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-400 shadow-sm">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
						</span>
					</div>
				</motion.div>

				{/* name / username */}
				<div className="flex-1 pt-3 sm:pt-0">
					<motion.h1
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="text-[22px] font-bold leading-tight tracking-tight text-zinc-900"
					>
						{user.name}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.38, duration: 0.5 }}
						className="mt-0.5 font-mono text-[13px] text-zinc-400"
					>
						@{user.username}
					</motion.p>
				</div>

			</div>
		</motion.div>
	)
}

export default ProfileCard;