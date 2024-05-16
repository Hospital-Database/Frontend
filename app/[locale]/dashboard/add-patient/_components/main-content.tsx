"use client";

import type { patientSchema } from "@/api/patients";
import { TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import type { z } from "zod";
import useCheckNationalId from "../_hooks/use-check-national-id";

export default function MainContent({
	form,
}: {
	form: UseFormReturnType<z.infer<typeof patientSchema>>;
}) {
	const t = useTranslations("Forms");
	const nationalIdDoesnotExist =
		!form.errors.national_id && form.isDirty("national_id");

	useCheckNationalId(form);

	return (
		<section className="space-y-3 grid grid-cols-3 gap-x-8">
			<div className="col-span-2 space-y-5">
				<div className="space-y-2">
					<TextInput
						{...form.getInputProps("national_id")}
						label={t("national-id")}
						withAsterisk
						className={
							nationalIdDoesnotExist
								? "[&>div]:border [&>div]:border-green-500"
								: ""
						}
					/>
					{nationalIdDoesnotExist && (
						<p className="text-green-500 text-xs">{t("new-national-id")}</p>
					)}
				</div>

				<TextInput
					{...form.getInputProps("full_name")}
					withAsterisk
					label={t("full-name")}
					description={t(
						"AddPatiententer-the-full-name-of-4-parts-as-in-the-national-id",
					)}
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
						name="image"
						type="file"
						onChange={() => console.log("upload image")}
					/>
				</label>
			</div>
		</section>
	);
}
