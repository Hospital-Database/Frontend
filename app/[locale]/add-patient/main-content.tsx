import { FormInput } from "@/components/ui/input";
// import Image from "next/image"

export default function MainContent() {
	return (
		<section className="space-y-3 grid grid-cols-3 gap-x-8">
			<div className="col-span-2 space-y-5">
				<FormInput name="username" label="National ID *" />
				<FormInput
					name="password"
					label="Full Name *"
					description="Enter the full name of 4 parts as in the national ID"
				/>
			</div>
			<div className="border-neutral-300 border hover:border-neutral-600 rounded-lg">
				<label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-neutral-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-14 h-14"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<title>Upload image</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
						/>
					</svg>
					<strong className="text-sm font-medium">Select an image</strong>
					<input
						className="block w-0 h-0"
						name="file"
						type="file"
						onChange={() => console.log("upload image")}
					/>
				</label>
			</div>
		</section>
	);
}
