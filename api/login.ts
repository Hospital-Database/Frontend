import { http } from "@/lib/axios";
import { accessTokenCookie, refreshTokenCookie } from "@/lib/cookies.client";
import type { BackendError, Patient, User } from "@/lib/types";
import { useRouter } from "@/navigation";
import { Routes } from "@/routes/routes";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { LoginData } from "../app/[locale]/(auth)/login/_components/form";
import { getPatientByNationalId } from "./patients";

interface SignInOutput {
	access: string;
	refresh: string;
	user: User;
}

interface SignInError extends BackendError {}

export async function signIn(data: LoginData) {
	return await http.post<SignInOutput>("/accounts/token/", data);
}

export function useSignIn() {
	const router = useRouter();
	return useMutation<
		AxiosResponse<SignInOutput>,
		AxiosError<SignInError>,
		LoginData
	>({
		mutationFn: signIn,
		onSuccess: ({ data }) => {
			router.push("/");
			refreshTokenCookie.set(data.refresh);
			accessTokenCookie.set(data.access);
			localStorage.setItem("user", JSON.stringify(data.user));
		},
	});
}

export function usePatientSignIn() {
	const router = useRouter();
	return useMutation<Patient, Error, { national_id: string }>({
		mutationFn: async ({ national_id }) => {
			const patient = await getPatientByNationalId(national_id);
			if (!patient) throw Error("Patient not found");
			return patient;
		},
		onSuccess: (patient) => {
			router.push(Routes.patient({ id: patient.id }));
		},
	});
}
