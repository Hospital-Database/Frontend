import { http } from "@/lib/axios";
import type { BackendError, User } from "@/lib/types";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { LoginData } from "../login/_components/form";
import { accessTokenCookie, refreshTokenCookie } from "@/lib/cookies.client";

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
