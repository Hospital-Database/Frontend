'use client'
import { useCreatePatient } from "@/api/patients";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import AddPatientForm from "@/components/forms/patient-form/form";
import { useParams } from "next/navigation";
import { Group, Loader } from "@mantine/core";
import { usePatient } from "@/api/patients";
export default function EditPatient() {
    const {patientId} = useParams();
	const t = useTranslations("Forms");
	const router = useRouter();

    const query = usePatient(patientId);
	if (query.isLoading)
		return (
			<Group justify="center">
				<Loader />
			</Group>
		);
	const patient = query.data;
	if (query.isError || !patient) return <div>Error fetching the patient</div>
    
    const { mutate } = useCreatePatient({
		onSuccess(res) {
			router.push(`/dashboard/patient/${res.data.id}`);
		},
	});
	return (
		<main className="space-y-6 p-3 md:p-6 lg:p-8">
			<h1 className="font-bold text-3xl text text-teal-500">
				{/* {t("add-new-patient")} */}
                add new patient
			</h1>
			<AddPatientForm
				initialValue={{
					national_id: "",
					full_name: "",
					address: {},
					phone: {},
				}}
				onSubmit={(data) => {
					mutate(data);
				}}
			/>
		</main>
	);
}
