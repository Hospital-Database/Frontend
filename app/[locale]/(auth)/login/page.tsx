import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page",
};

export default function Login() {
	return (
		<main className="page-container flex items-center justify-center h-screen">
			<section>
				<Image
					src="/logo.jfif"
					alt="logo"
					width={200}
					height={200}
					className="mx-auto"
				/>
			</section>
			<section></section>
		</main>
	);
}
