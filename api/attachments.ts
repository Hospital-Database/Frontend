import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Attachment } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// -------- CREATE

export async function createAttachment({
	userId,
	file,
	visit,
}: {
	userId: number;
	file: File;
	visit?: string;
}) {
	return await http.postForm("/visit/attachment/", {
		file: file,
		user: userId,
		visit,
		kind: "blood",
	});
}

export function useCreateAttachment() {
	return useMutation({
		mutationFn: createAttachment,
		onSuccess: () => {
			notifySuccess({
				title: "Attachment was upload successfully",
			});
		},
		onError: (e) => {
			console.log(e);
			notifyError({
				title: "Couldn't upload the attachment",
			});
		},
	});
}

// -------- READ

export async function getAttachments(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Attachment[] }>("/visit/attachment/", {
			params,
		})
		.then((res) => res.data);
}

export function useAttachments(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["attachments", params.toString()],
		queryFn: () => getAttachments(options),
	});
}

// -------- UPDATE

// -------- DELETE

export async function deleteAttachment(
	id: string,
	method: "soft" | "hard" = "soft",
) {
	return await http.delete(`/visit/attachment/${id}/`, {
		params: {
			method,
		},
	});
}

export function useDeleteAttachment(
	id: string,
	method: "soft" | "hard" = "soft",
	{ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void } = {},
) {
	return useMutation({
		mutationFn: () => deleteAttachment(id, method),
		onSuccess: () => {
			notifySuccess({
				title: "Attachment was deleted successfully",
			});
			onSuccess?.();
		},
		onError: () => {
			notifyError({
				title: "Couldn't delete the attachment",
			});
			onError?.();
		},
	});
}
