"use client";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser, ShieldPlus } from "lucide-react";
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

export default function AddPatientForm() {
	const form = useForm({
		resolver: zodResolver(patientSchema),
	});
	const handleAddPatientSubmt: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};
	// console.log(form, "error")
	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(handleAddPatientSubmt)}
				className="space-y-8"
			>
				<h1 className="text-3xl font-bold">Add new patient</h1>
				<section className="space-y-6">
					<AccordionTitle
						Icon={<CircleUser />}
						mainText="Main details"
						additionalText="Complete the main details of the patient"
					/>
					<MainContent />
				</section>
				<section className="space-y-6">
					<AccordionTitle
						Icon={<ShieldPlus />}
						mainText="Other details"
						additionalText="Additional details, you can complete later"
					/>
					<AdditionalContent />
				</section>
				<section>
					<Button type="submit" rounded>
						Save
					</Button>
					<Button type="submit" rounded>
						Save and start visit
					</Button>
				</section>
			</form>
		</FormProvider>
	);
}
