import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../login/_components/navbar";
import PatientLoginForm from "./_components/form";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page",
};

export default function PatientLogin() {
	return (
		<>
			<Navbar />
			<main className="page-container page-height flex items-center justify-center flex-col gap-y-6 ">
				<section className="w-[min(90%,600px)] bg-neutral-300 dark:bg-neutral-900 px-4 py-8 lg:px-8 rounded-md">
					<section className="space-y-10">
						<Image
							src="/en/icon.png"
							alt="logo"
							width={50}
							height={50}
							className="mx-auto"
						/>
						<PatientLoginForm />
					</section>
				</section>
			</main>
		</>
	);
}
