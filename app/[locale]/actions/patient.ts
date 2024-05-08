"use server";
import type { Patient } from "@/app/[locale]/types/patient";
import { http } from "@/lib/axios";
import { getErrorMessage } from "@/lib/err-msg";
export async function addPatient({ data }: { data: Patient }) {
	try {
		await http.post("/patients", data);
	} catch (e) {
		const error = await getErrorMessage(e);
		return { error: error };
	}
}
