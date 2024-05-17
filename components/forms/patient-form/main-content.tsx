"use client";

import type { patientSchema } from "@/api/patients";
import { TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import type { z } from "zod";
import useCheckNationalId from "./_hooks/use-check-national-id";
import UploadImage from "./image-upload";

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
				<UploadImage form={form} />
			</div>
		</section>
	);
}
