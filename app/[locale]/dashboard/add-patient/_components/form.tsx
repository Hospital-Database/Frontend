"use client";

import type { Patient } from "@/lib/types";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import "@mantine/notifications/styles.css";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import { useAddPatient } from "../api/add-patient";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";
import { patientSchema } from "./shema";

export default function AddPatientForm() {
	const t = useTranslations("AddPatient");
	const form = useForm<Patient>({
		// @ts-ignore
		validate: zodResolver(patientSchema),
	});
	const { mutate } = useAddPatient();
	return (
		<form
			className="space-y-8"
			onSubmit={form.onSubmit((data) => {
				const newData = {
					...data,
					dateOfBirth: data?.dateOfBirth?.toISOString().slice(0, 10),
				};
				//@ts-ignore
				mutate(newData);
			})}
		>
			<section className="space-y-6">
				<AccordionTitle
					Icon={<IconMessageCircleUser />}
					mainText={t("main-details")}
					additionalText={t("complete-the-main-details-of-the-patient")}
				/>

				{/* @ts-ignore */}
				<MainContent form={form} />
			</section>
			<section className="space-y-6">
				<AccordionTitle
					Icon={<IconShieldPlus />}
					mainText={t("other-details")}
					additionalText={t("additional-details-you-can-complete-later")}
				/>
				{/* @ts-ignore */}
				<AdditionalContent form={form} />
			</section>
			<section>
				<Button type="submit" className="me-2">
					{t("save")}
				</Button>
				<Button type="button">{t("save-and-start-visit")}</Button>
			</section>
		</form>
	);
}
