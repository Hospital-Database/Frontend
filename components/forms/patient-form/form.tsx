"use client";

import { patientSchema } from "@/api/patients";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import type { z } from "zod";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";
import useCheckPatientNationalId from "./use-check-national-id";

const emptyValues = {
	national_id: "",
	full_name: "",
	address: {},
	phone: {},
};

export default function PatientForm({
	initialValue,
	onSubmit,
}: {
	initialValue?: Omit<z.infer<typeof patientSchema>, "image">;
	onSubmit: (
		data: Omit<z.infer<typeof patientSchema>, "date_of_birth"> & {
			date_of_birth?: string | undefined;
		},
	) => Promise<void>;
}) {
	const t = useTranslations("Forms");
	const form = useForm<z.infer<typeof patientSchema>>({
		validate: zodResolver(patientSchema),
		initialValues: initialValue || emptyValues,
	});

	const submission = useMutation({
		mutationFn: onSubmit,
	});

	useCheckPatientNationalId(form, initialValue?.national_id);

	useEffect(() => {
		if (submission.isError) {
			const errors = submission.error as unknown as Record<string, string[]>;
			for (const key in errors) {
				form.setFieldError(key, errors[key]);
			}
		}
	}, [submission.isError, submission.error, form.setFieldError]);

	return (
		<form
			className="space-y-8"
			onSubmit={form.onSubmit(async (data) => {
				if (initialValue?.national_id === data.national_id)
					// @ts-ignore
					data.national_id = undefined;
				const newData = {
					...data,
					date_of_birth: data?.date_of_birth?.toISOString().slice(0, 10),
				};
				try {
					await submission.mutateAsync(newData);
				} finally {
				}
			})}
		>
			<section className="space-y-6">
				<AccordionTitle
					Icon={<IconMessageCircleUser />}
					mainText={t("main-details")}
					additionalText={t("complete-the-main-details-of-the-patient")}
				/>
				<MainContent form={form} />
			</section>
			<section className="space-y-6">
				<AccordionTitle
					Icon={<IconShieldPlus />}
					mainText={t("other-details")}
					additionalText={t("additional-details-you-can-complete-later")}
				/>
				<AdditionalContent form={form} />
			</section>
			<section>
				<Button loading={submission.isPending} type="submit" className="me-2">
					{t("save")}
				</Button>
				{/* TODO: other actions, save and create visit, save and add new, ...etc, maybe dropdown and save the last choosen as the default action */}
				{/* <Button type="button">{t("save-and-start-visit")}</Button> */}
			</section>
		</form>
	);
}
