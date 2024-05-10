"use client";

import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import { addPatient } from "../../actions/patient";
import type { Patient } from "../../types/patient";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";
import { patientSchema } from "./shema";
// ! TODO: Try to remove ts-ignore....
export default function AddPatientForm() {
	const t = useTranslations("AddPatient");
	const form = useForm<Patient>({
		// @ts-ignore
		validate: zodResolver(patientSchema),
	});
	return (
		<form
			className="space-y-8"
			onSubmit={form.onSubmit(async (data) => {
				// @ts-ignore
				const response = await addPatient(data);
				if (response === "Patient added successfully") {
					notifications.show({
						title: "Patient was added successfully",
						message: "",
						color: "white",
						style: { backgroundColor: "#22c55e" },
					});
				} else {
					notifications.show({
						title: response.error || "Something went wrong",
						message: "",
						color: "white",
						style: { backgroundColor: "#ef4444" },
					});
				}
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
