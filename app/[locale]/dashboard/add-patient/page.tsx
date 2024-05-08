import type { Metadata } from "next";
import AddPatientForm from "./form";

export const metadata: Metadata = {
	title: "Add patient",
	description: "Add patient to our database",
};

export default function AddPatient() {
	return (
		<main className="space-y-6 p-3 md:p-6 lg:p-8">
			<h1 className="font-bold text-3xl text text-blue-500">Add new patient</h1>
			<AddPatientForm />
		</main>
	);
}
