"use client";

import { patientSchema, useCreatePatient } from "@/api/patients";
import { useRouter } from "@/navigation";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import type { z } from "zod";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";

export default function AddPatientForm() {
	const t = useTranslations("Forms");
	const router = useRouter();
	const form = useForm<z.infer<typeof patientSchema>>({
		validate: zodResolver(patientSchema),
		initialValues: {
			national_id: "",
			full_name: "",
			address: {},
			phone: {},
		},
	});
	const createPatient = useCreatePatient({
		onSuccess(res) {
			router.push(`/dashboard/patient/${res.data.id}`);
		},
	});
	return (
		<form
			className="space-y-8"
			onSubmit={form.onSubmit((data) => {
				const newData = {
					...data,
					date_of_birth: data?.date_of_birth?.toISOString().slice(0, 10),
				};
				createPatient.mutate(newData);
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
				<Button
					loading={createPatient.isPending}
					type="submit"
					className="me-2"
				>
					{t("save")}
				</Button>
				{/* TODO: other actions, save and create visit, save and add new, ...etc, maybe dropdown and save the last choosen as the default action */}
				{/* <Button type="button">{t("save-and-start-visit")}</Button> */}
			</section>
		</form>
	);
}
