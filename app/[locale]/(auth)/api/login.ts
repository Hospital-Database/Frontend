import { http } from "@/lib/axios";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import type { TLogin } from "../login/_components/form";

export async function SignIn(data: TLogin) {
	return await http.post("/accounts/token/", data);
}

export function useSignIn() {
	const router = useRouter();
	return useMutation({
		mutationFn: SignIn,
		onSuccess: (data) => {
			router.push("/");
			localStorage.setItem("user", JSON.stringify(data.data));
		},
	});
}
