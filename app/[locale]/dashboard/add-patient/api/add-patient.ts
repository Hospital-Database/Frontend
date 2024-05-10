import { http } from "@/lib/axios";
import type { Patient } from "@/lib/types";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export async function addPatientApi(data: Patient) {
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
	return await http.post("/accounts/patient/", newData);
}
export function useAddPatient() {
	return useMutation({
		mutationFn: addPatientApi,
		onSuccess: () => {
			notifications.show({
				title: "Patient was added successfully",
				message: "",
				color: "white",
				style: { backgroundColor: "#22c55e" },
			});
		},
		onError: (e) => {
			let error = "something went wrong";
			if (isAxiosError(e)) error = e?.response?.data;
			notifications.show({
				title: typeof error === "string" ? error : "Something went wrong",
				message: "",
				color: "white",
				style: { backgroundColor: "#ef4444" },
			});
		},
	});
}

export async function isExist(nationalId: { national_id: string }) {
	return await http.post("/accounts/check-national-id/", nationalId);
}
export function useIsExist() {
	return useMutation({
		mutationFn: isExist,
		onSuccess: () => {
			return { error: null, exists: true };
		},
		onError: (e) => {
			if (isAxiosError(e)) return { error: e?.response?.data, exists: false };
			return { error: "Something went wrong", exists: false };
		},
	});
}
