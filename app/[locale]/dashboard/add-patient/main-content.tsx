"use client";
import { Button, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { isExist } from "../../actions/patient";
import type { Patient } from "../../types/patient";

export default function MainContent({
	form,
}: {
	form: UseFormReturnType<Patient, (values: Patient) => Patient>;
}) {
	const [isOnChange, setIsOnChange] = useState(true);
	const checkNationalId = async () => {
		const { nationalId } = form.getValues();
		if (typeof nationalId !== "string" || nationalId.length !== 14) {
			form.setFieldError("nationalId", "National ID must be 14 digits");
			return;
		}
		const data = await isExist({ national_id: nationalId });
		form.setFieldError(
			"nationalId",
			data?.exists ? "User is already exist" : "",
		);
		setIsOnChange(false);
	};
	const handleOnChange = (value: string) => {
		setIsOnChange(true);
		form.getInputProps("nationalId").onChange(value);
	};

	return (
		<section className="space-y-3 grid grid-cols-3 gap-x-8">
			<div className="col-span-2 space-y-5">
				<div className="space-y-2">
					<TextInput
						name="nationalId"
						label="National ID"
						{...form.getInputProps("nationalId")}
						key={form.key("nationalId")}
						withAsterisk
						className={
							!form.errors.nationalId && !isOnChange
								? "[&>div]:border [&>div]:border-green-500"
								: ""
						}
						onChange={(e) => handleOnChange(e.target.value)}
					/>
					<p className="text-green-500 text-xs">
						{!form.errors.nationalId && !isOnChange ? "User is not exist" : ""}
					</p>

					<Button variant="light" onClick={checkNationalId} type="button">
						See details
					</Button>
				</div>

				<TextInput
					withAsterisk
					name="fullName"
					{...form.getInputProps("fullName")}
					label="Full Name"
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
						name="patientImage"
						type="file"
						onChange={() => console.log("upload image")}
					/>
				</label>
			</div>
		</section>
	);
}
