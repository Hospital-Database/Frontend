"use server";
import type { Patient } from "@/app/[locale]/types/patient";
import { http } from "@/lib/axios";
import { getErrorMessage } from "@/lib/err-msg";
export async function addPatient(data: Patient) {
	try {
		console.log(data);
		const newData = {
			national_id: "12345689122",
			full_name: "MohamedYousef",
			governorate: "Alsharkia",
			street: "alKady",
			city: "fakous",
			phone: {
				mobile: "01091321356",
			},
			gender: "male",
		};
		await http.post("/patients", newData);
	} catch (e) {
		const error = await getErrorMessage(e);
		return { error: error };
	}
}
