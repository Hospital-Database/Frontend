import type { Metadata } from "next";
import AddPatientForm from "./form";

export const metadata: Metadata = {
	title: "Add patient",
	description: "Add patient to our database",
};
export default function AddPatient() {
	return (
		<main className="space-y-6 p-3 md:p-6 lg:p-8">
			<AddPatientForm />
		</main>
	);
}
