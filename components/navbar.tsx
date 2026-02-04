"use client";

import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "@/components/ui/resizable-navbar";
import { useEffect, useState, useTransition } from "react";
import { account } from "@/config/appwrite";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import GearIcon from "./ui/icons/gear-icon";
import LogoutIcon from "./ui/icons/logout-icon";

const ProfileMenu = ({ user, handleLogout }: { user: any; handleLogout: any }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, setTransition] = useTransition();

	const handleOpenMenu = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className="relative" onClick={handleOpenMenu}>
			<motion.div
				className="relative text-left bg-gray-200 w-28 px-1 py-1 rounded-3xl  cursor-pointer overflow-hidden "
				layout={true}
				style={{
					width: isOpen ? "200px" : "50px",
					paddingLeft: "4px",
					// if is open background must be blackishe mirror low opacity otherwise full transparent
					backgroundColor: isOpen ? "#fff" : "rgba(0, 0, 0, 0) ",

				}}

			>
				<motion.div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/80" layout={true}>
					<motion.div
						layout={true}
						initial={{}}
						animate={{
							rotate: isOpen ? -360 : 0
						}}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						style={{
							position: "relative",

						}}
					>
						<User className="text-white w-6 h-6" />
					</motion.div>

				</motion.div>
				<motion.span
					layout={true}
					style={{
						opacity: isOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3, delay: isOpen ? 0.6 : 0 }}
					className=" px-4 py-2 text-base text-black font-bricolage absolute top-1/2 -translate-y-1/2 left-14">
					{user.name || user.email}
				</motion.span>

			</motion.div >
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="absolute right-0 mt-2 w-50  border-dashed border-gray-200 rounded  z-10  px-2 py-1"
					>
						<motion.button className="flex items-center  font-bricolage text-black w-full p-1 realtive hover:bg-gray-100 rounded pl-6">
							<GearIcon color="#6A7282" size={24} className="mr-4" />
							<span>Setting</span>
						</motion.button>
						<motion.button
							className="flex items-center  font-bricolage text-black w-full p-1 realtive hover:bg-gray-100 rounded pl-6"
							onClick={() => setTransition(() => handleLogout())}>
							<LogoutIcon color="red" size={24} className="mr-4" />
							<span>Log out</span>
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>

		</div>
	);
};

const CustomNavbar = ({ navItems }: { navItems: any[] }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const session = await account.get();
				setUser(session);
				setIsLoggedIn(true);
			} catch (error) {
				setIsLoggedIn(false);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);


	const handleLogout = async () => {
		await account.deleteSession('current');
		setIsLoggedIn(false);
		setUser(null);
	}

	return (
		<Navbar>
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4 ">
					{!loading && (
						isLoggedIn && user ? (
							<ProfileMenu user={user} handleLogout={handleLogout} />
						) : (
							<>
									<NavbarButton href="/sign-in" variant="dark">Sign In</NavbarButton>
								<NavbarButton variant="primary">Book a call</NavbarButton>
							</>
						)
					)}
				</div>
			</NavBody>
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					{navItems.map((item, idx) => (
						<a
							key={`mobile-link-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</a>
					))}
					<div className="flex w-full flex-col gap-4">
						{!loading && (
							isLoggedIn && user ? (
								<>
									<span className="text-neutral-600 dark:text-neutral-300 px-4 py-2">
										{user.name || user.email}
									</span>
									<NavbarButton
										onClick={async () => {
											await account.deleteSession('current');
											setIsLoggedIn(false);
											setUser(null);
											setIsMobileMenuOpen(false);
										}}
										variant="primary"
										className="w-full"
									>
										Logout
									</NavbarButton>
								</>
							) : (
								<>
									<NavbarButton
										onClick={() => setIsMobileMenuOpen(false)}
										variant="primary"
										className="w-full"
										href="/login"
									>
										Login
									</NavbarButton>
									<NavbarButton
										onClick={() => setIsMobileMenuOpen(false)}
										variant="primary"
										className="w-full"
									>
										Book a call
									</NavbarButton>
								</>
							)
						)}
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}


export default CustomNavbar;