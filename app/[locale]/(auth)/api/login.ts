import { http } from "@/lib/axios";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../login/_components/form";
import type { BackendError, User } from "@/lib/types";
import type { AxiosResponse } from "axios";

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
	return useMutation<AxiosResponse<SignInOutput>, SignInError, LoginData>({
		mutationFn: signIn,
		onSuccess: ({ data }) => {
			router.push("/");
			localStorage.setItem("user", JSON.stringify(data));
		},
	});
}
