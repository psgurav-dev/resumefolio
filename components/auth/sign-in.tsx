"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import GoogleLogin from "./google-auth"
import { EyeOffIcon, EyeIcon } from "../ui/icons/eye-off-icon";

const SignInForm = () => {
	const form = useRef<HTMLFormElement>(null);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handleShowPassword = useCallback(() => {
		setPasswordVisible((prev) => !prev);
	}, [passwordVisible]);


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitting...")
	}
	return (
		<form
			ref={form}
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center gap-8 md:w-125 px-6 py-12 border border-gray-300 rounded-lg drop-shadow-2xl bg-black/80 mt-6 font-bricolage">
			<div className="flex items-center w-full  px-0">
				<input type="text"
					className="px-4 text-white placeholder:text-gray-500 border border-gray-200  p-2 border-dashed  w-full"
					placeholder="Username"
					name="username"
					id="username"
				/>
			</div>
			<div className="flex items-center justify-center w-full relative px-0">
				<input
					type={passwordVisible ? "text" : "password"}
					className="px-4 text-white placeholder:text-gray-500 border border-gray-200  p-2 border-dashed w-full "
					placeholder="Password"
					name="password"
					id="password"
				/>
				<div className="absolute right-3 top-3 w-5 h-5 text-gray-500 cursor-pointer" onClick={handleShowPassword}>
					{!passwordVisible ? <EyeOffIcon color="white" /> : <EyeIcon color="white" />}
				</div>
			</div>
			<button
				type="submit"
				className="bg-white text-black  font-bold px-6 py-2 rounded-lg w-full mx-4 cursor-pointer transition-colors hover:bg-gray-200"
			>
				Sign In
			</button>

			<hr className="w-full border-dashed border-gray-400 h-2 " />

			<div className=" w-full flex flex-col gap-4 justify-center items-center">
				<Link href="/signup" className="text-white hover:text-gray-300 transition-colors ">Don't have an account? <span className="underline">Sign up</span></Link>
				<GoogleLogin />
			</div>
		</form>
	)
}

export default SignInForm;