import { http } from "@/lib/axios";
import {
	accessTokenCookie,
	refreshTokenCookie,
	userTypeTokenCookie,
} from "@/lib/cookies.client";
import type { UserType } from "@/lib/permissions";
import type { BackendError, Doctor, Patient, User } from "@/lib/types";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../app/[locale]/(auth)/login/_components/form";
import { getPatientByNationalId } from "./patients";

export async function signIn(data: LoginData) {
	const { data: res } = await http.post<{
		access: string;
		refresh: string;
		user: User;
		patient?: Patient;
		doctor?: Doctor;
	}>("/accounts/token/", data);
	const userType: UserType = res.patient
		? "patient"
		: res.doctor
			? "doctor"
			: "admin";
	refreshTokenCookie.set(res.refresh);
	accessTokenCookie.set(res.access);
	userTypeTokenCookie.set(userType);
	localStorage.setItem("user", JSON.stringify(res.user));
}

export function useSignIn() {
	const router = useRouter();
	return useMutation<void, BackendError, LoginData>({
		mutationFn: signIn,
		onSuccess: () => {
			router.push("/");
		},
	});
}

export function usePatientSignIn() {
	const router = useRouter();
	return useMutation<string, Error, { national_id: string }>({
		mutationFn: async ({ national_id }) => {
			await signIn({ username: national_id, password: national_id });
			return national_id;
		},
		onSuccess: async (national_id) => {
			const patient = await getPatientByNationalId(national_id);
			router.push(Routes.patient({ patientId: patient.id }));
		},
	});
}
