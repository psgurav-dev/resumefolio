"use client";

import { account } from "@/config/appwrite";
import { OAuthProvider } from "appwrite";
import BrandGoogleIcon from "../ui/icons/brand-google-icon";
import { useRef } from "react";

export default function GoogleLogin() {
	const googleLoginButtonRef = useRef<any>(null);

	const loginWithGoogle = async () => {
		try {
			await account.deleteSessions();
		} catch (err) {
		}
		account.createOAuth2Session({
			provider: OAuthProvider.Google,
			success: `${process.env.NEXT_PUBLIC_HOST_URL}/auth/callback`,
			failure: `${process.env.NEXT_PUBLIC_HOST_URL}/auth/callback`,
		});
	};

	return (
		<button
			onMouseEnter={() => googleLoginButtonRef.current?.startAnimation?.()}
			onMouseLeave={() => googleLoginButtonRef.current?.stopAnimation?.()}
			onClick={loginWithGoogle}
			className="px-4 py-2 bg-white w-full  rounded text-black cursor-pointer transition-all font-bold hover:bg-gray-200 flex items-center justify-center gap-2"
		>	<BrandGoogleIcon size={28} className="inline-block mr-2 google-g" ref={googleLoginButtonRef} />
			Continue with Google
		</button>
	);
}
