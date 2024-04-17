import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./form";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page",
};

export default function Login() {
	return (
		<main className="page-container page-height flex items-center justify-center flex-col gap-y-6 ">
			<section className="w-[min(90%,600px)] bg-neutral-300 dark:bg-neutral-900 px-4 py-8 lg:px-8 rounded-md">
				<section className="space-y-10">
					<Image
						src="/logo.jfif"
						alt="logo"
						width={50}
						height={50}
						className="mx-auto"
					/>
					<LoginForm />
				</section>
			</section>
		</main>
	);
}
