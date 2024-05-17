import { http } from "@/lib/axios";

export async function updateUserImage(
	id: string,
	data: { image: File; user: number },
) {
	await http.patchForm(`/accounts/user-image/${id}/`, data);
}

export async function createUserImage(data: { image: File; user: number }) {
	await http.postForm("/accounts/user-image/", data);
}
