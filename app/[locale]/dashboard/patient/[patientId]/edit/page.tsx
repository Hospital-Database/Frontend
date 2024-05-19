"use client";

import { usePatient, useUpdatePatient } from "@/api/patients";
import PatientForm from "@/components/forms/patient-form/form";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
import { Group, Loader } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function EditPatient({
	params,
}: { params: typeof Routes.editPatient.params }) {
	const { patientId } = params;
	const t = useTranslations("Forms");
	const router = useRouter();
	const query = usePatient(patientId);
	const queryClient = useQueryClient();
	const { mutateAsync: updatePatient } = useUpdatePatient({
		onSuccess(res) {
			queryClient.invalidateQueries({
				queryKey: ["patient"],
			});
			router.push(Routes.patient({ patientId: res.data.id }));
		},
	});

	if (query.isLoading)
		return (
			<Group justify="center">
				<Loader />
			</Group>
		);

	const patient = query.data;
	if (query.isError || !patient)
		return <div>{t("error-fetching-the-patient")}</div>;

	return (
		<main className="space-y-6 p-3 md:p-6 lg:p-8">
			<h1 className="font-bold text-3xl text text-teal-500">
				{t("edit-patient")}
			</h1>
			<PatientForm
				initialValue={{
					full_name: patient.full_name,
					national_id: patient.national_id,
					gender: patient.gender,
					phone: patient.phone ? patient.phone : {},
					address: patient.address ? patient.address : {},
					date_of_birth: new Date(patient.date_of_birth),
					notes: patient.notes,
				}}
				onSubmit={async (data) => {
					await updatePatient({ prevData: patient, newData: data });
				}}
			/>
		</main>
	);
}
