import { http } from "@/lib/axios";
import { accessTokenCookie, refreshTokenCookie } from "@/lib/cookies.client";
import type { BackendError, User } from "@/lib/types";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { LoginData } from "../app/[locale]/(auth)/login/_components/form";

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
