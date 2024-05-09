"use server";
import type { Patient } from "@/app/[locale]/types/patient";
import { http } from "@/lib/axios";
import { isAxiosError } from "axios";
export async function addPatient(data: Patient) {
	try {
		const newData = {
			national_id: data.nationalId,
			full_name: data.fullName,
			address: {
				governorate: data.government,
				street: data.street,
				city: data.status,
			},
			phone: {
				mobile: data.phoneNumber,
			},
			gender: data.gender,
			marital_status: data.martialStatus,
			date_of_birth: data.dateOfBirth,
			notes: data.notes,
		};
		await http.post("/accounts/patient/", newData);
		return "Patient added successfully";
	} catch (e) {
		if (isAxiosError(e)) return { error: e?.response?.data };
		return { error: "Something went wrong" };
	}
}

export async function isExist(nationalId: { national_id: string }) {
	try {
		const { data } = await http.post(
			"/accounts/check-national-id/",
			nationalId,
		);

		return data as { exists: boolean };
	} catch (e) {
		if (isAxiosError(e)) return { error: e?.response?.data, exists: false };
		return { error: "Something went wrong", exists: false };
	}
}
