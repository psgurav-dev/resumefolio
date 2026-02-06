import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BrandButton, EncryptButton } from "./buttons";
import { Skeleton } from "./ai-loading-skelton";
import BrandAiStudioIcon from "./icons/brand-aistudio-icon";

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	onChange,
	files,
	setFiles,
	handleConvertToPortfolio,
	isLoading,
	isGrid = true
}: {
	onChange?: (files: File[]) => void;
	files: File[];
	setFiles: (files: File[]) => void;
	handleConvertToPortfolio: () => void;
	isLoading?: boolean;
		isGrid?: boolean;
}) => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		setFiles([...files, ...newFiles]);
		onChange && onChange(newFiles);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, isDragActive } = useDropzone({
		multiple: false,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (error) => {
			console.log(error);
		},
	});

	return (
		<div className="w-full " {...getRootProps()}>
			<motion.div
				onClick={handleClick}
				whileHover="animate"
				className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden min-h-80 py-20"
			>
				<input
					ref={fileInputRef}
					id="file-upload-handle"
					type="file"
					onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
					className="hidden"
				/>
				{isGrid &&
					<div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
						<GridPattern />
					</div>}
				{isLoading ? <Skeleton /> : (
					<div className="flex flex-col items-center justify-center gap-4">
						<p className="relative z-20 font-manrope font-bold text-neutral-700 dark:text-neutral-300 text-base">
							Upload file
						</p>
						<p className="relative z-20 font-manrope text-center font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
							Drag or drop your files here or click to upload
						</p>
						<div className="relative w-full  max-w-xl mx-auto">
							{files.length > 0 &&
								files.map((file, idx) => (
									<motion.div
										key={"file" + idx}
										layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
										className={cn(
											"relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
											"shadow-sm"
										)}
									>
										<div className="flex justify-between w-full items-center gap-4">
											<Image src={'/assets/shared/pdf-icon.webp'} width={68} height={24} alt="PDF Icon" />
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
											>
												{file.name}
											</motion.p>
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
											>
												{(file.size / (1024 * 1024)).toFixed(2)} MB
											</motion.p>
										</div>

										<div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
											>
												{file.type}
											</motion.p>

											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
											>
												modified{" "}
												{new Date(file.lastModified).toLocaleDateString()}
											</motion.p>
										</div>


									</motion.div>

								))}

							{files.length > 0 && (
								// <motion.div
								// 	className="max-w-56	 text-sm
								// 	rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
								// >Convert to Portfolio</motion.div>
								<div className="mt-4 mx-auto w-full flex items-center justify-center">
									{/* <EncryptButton handleConvertToPortfolio={handleConvertToPortfolio} isLoading={isLoading} /> */}
									<BrandButton text={"Convert To Portfolio"} handleClick={() => { }} Icon={BrandAiStudioIcon} />
								</div>
							)}


							{!files.length && (
								<motion.div
									layoutId="file-upload"
									variants={mainVariant}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 20,
									}}
									className={cn(
										"relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
										"shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
									)}
								>
									{isDragActive ? (
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="text-neutral-600 flex flex-col items-center"
										>
											Drop it
											<Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
										</motion.p>
									) : (
										<Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
									)}
								</motion.div>
							)}

							{!files.length && (
								<motion.div
									variants={secondaryVariant}
									className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
								></motion.div>
							)}
						</div>
					</div>
				)}

			</motion.div>
		</div>
	);
};

export function GridPattern() {
	const columns = 41;
	const rows = 11;
	return (
		<div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105 ">
			{Array.from({ length: rows }).map((_, row) =>
				Array.from({ length: columns }).map((_, col) => {
					const index = row * columns + col;
					return (
						<div
							key={`${col}-${row}`}
							className={`w-10 h-10 flex shrink-0 rounded-[2px] ${index % 2 === 0
								? "bg-gray-50 dark:bg-neutral-950"
								: "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
								}`}
						/>
					);
				})
			)}
		</div>
	);
}
