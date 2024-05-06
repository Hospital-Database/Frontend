"use client";

import { Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconMessageCircleUser, IconShieldPlus } from "@tabler/icons-react";
import AccordionTitle from "./accordion-title";
import AdditionalContent from "./additional-content";
import MainContent from "./main-content";
import { patientSchema } from "./shema";

export default function AddPatientForm() {
	const form = useForm({
		validate: zodResolver(patientSchema),
	});
	return (
		<form className="space-y-8">
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
			<section className="space-x-2">
				<Button
					type="button"
					onClick={() => {
						console.log("save", form.getValues());
					}}
				>
					Save
				</Button>
				<Button
					type="button"
					onClick={() => {
						console.log("save", form.getValues());
					}}
				>
					Save and start visit
				</Button>
			</section>
		</form>
	);
}
