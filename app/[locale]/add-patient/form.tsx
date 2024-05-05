"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	FormProvider,
	type SubmitHandler,
	useForm,
} from "react-hook-form";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";
import { patientSchema } from "./shema";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function AddPatientForm() {
	const form = useForm({
		resolver: zodResolver(patientSchema),
	});
	const handleAddPatientSubmt: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};
	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(handleAddPatientSubmt)}
				className="space-y-8"
			>
				<h1 className="font-bold text-3xl">Add new patient</h1>
				<section className="space-y-6">
					<AccordionTitle
						Icon={<IconMessageCircleUser />}
						mainText="Main details"
						additionalText="Complete the main details of the patient"
					/>
					<MainContent />
				</section>
				<section className="space-y-6">
					<AccordionTitle
						Icon={<IconShieldPlus />}
						mainText="Other details"
						additionalText="Additional details, you can complete later"
					/>
					<AdditionalContent />
				</section>
				<section>
					<Button type="submit">Save</Button>
					<Button type="submit">Save and start visit</Button>
				</section>
			</form>
		</FormProvider>
	);
}
