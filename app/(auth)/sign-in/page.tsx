
import SignInForm from "@/components/auth/sign-in"
import ArrowBackUpIcon from "@/components/ui/icons/arrow-back-up-icon"
import Link from "next/link"

const SignInPage = () => {
	return (
		<div className="p-2 md:p-6 z-10 relative min-h-screen px-4 md:px-40 h-screen flex flex-col items-center justify-center"
			style={{
				background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
			}}
		>
			<div className="container mx-auto relative ">
				<Link className="border w-12 h-fit flex items-center justify-center p-2 rounded mb-14 hover:rounded-full transition-border hover:border-dashed cursor-pointer transition-transform ease-in-out hover:scale-110" href={"/"}>
					<ArrowBackUpIcon />
				</Link>
				<h1 className="text-2xl md:text-4xl font-bricolage font-bold my-2 ">Sign in to build <br /> something impressive</h1>
				<span className="font-manrope uppercase text-sm">Not just a resume. A digital identity.</span>
				<SignInForm />
			</div>
		</div>
	)
}


export default SignInPage