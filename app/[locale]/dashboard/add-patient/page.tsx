'use client'
import { useCreatePatient } from "@/api/patients";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import AddPatientForm from "../../../../components/forms/patient-form/form";

export default function AddPatient() {
	const t = useTranslations("Forms");
	const router = useRouter();
	const { mutate } = useCreatePatient({
		onSuccess(res) {
			router.push(`/dashboard/patient/${res.data.id}`);
		},
	});
	return (
		<main className="space-y-6 p-3 md:p-6 lg:p-8">
			<h1 className="font-bold text-3xl text text-teal-500">
				{t("add-new-patient")}
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
