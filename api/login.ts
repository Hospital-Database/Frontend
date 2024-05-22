import type { UserType } from "@/hooks/use-permissions";
import { http } from "@/lib/axios";
import {
	accessTokenCookie,
	refreshTokenCookie,
	userTypeTokenCookie,
} from "@/lib/cookies.client";
import type {
	BackendError,
	Doctor,
	Employee,
	Patient,
	User,
} from "@/lib/types";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { LoginData } from "../app/[locale]/(auth)/login/_components/form";
import { getPatientByNationalId } from "./patients";

export async function signIn(data: LoginData) {
	const { data: res } = await http.post<{
		access: string;
		refresh: string;
		user: User;
		patient?: Patient;
		doctor?: Doctor;
		employee?: Employee;
	}>("/accounts/token/", data);
	const userType: UserType = res.employee
		? "employee"
		: res.doctor
			? "doctor"
			: res.patient
				? "patient"
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
	const t = useTranslations("Login");
	return useMutation<Patient, BackendError, { national_id: string }>({
		mutationFn: async ({ national_id }) => {
			await signIn({ username: national_id, password: national_id });
			const patient = await getPatientByNationalId(national_id);
			if (!patient)
				throw { detail: t("no-patient-with-this-national-id-exists") };
			return patient;
		},
		onSuccess: async (patient) => {
			router.push(Routes.patient({ patientId: patient.id }));
		},
	});
}
