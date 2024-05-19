import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import { getErrorMessageSync } from "@/lib/err-msg";
import getTableSearchParams from "@/lib/get-search-params";
import { notifyError, notifySuccess } from "@/lib/notifications";
import type { Attachment } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// -------- CREATE
interface AttachmentProps {
	userId: number;
	file: File;
	file_name: string;
	visit?: string;
}

export async function createAttachment({
	userId,
	file,
	visit,
	file_name,
}: AttachmentProps) {
	return await http.postForm("/visit/attachment/", {
		// TODO: add text field for kind (description of the file)
		kind: "blood",
		file: file,
		user: userId,
		visit,
		file_name,
	});
}

export function useCreateAttachment() {
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createAttachment,
		onSuccess: () => {
			notifySuccess({
				title: "Attachment was upload successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["attachments"],
			});
		},
		onError: (e) => {
			notifyError({
				title: "Couldn't upload the attachment",
				message: getErrorMessageSync(e, t),
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
export async function updateAttachment({
	data,
	id,
}: { data: { file_name: string; kind: string }; id: string }) {
	return await http
		.patch(`/visit/attachment/${id}/`, data)
		.then((res) => res.data);
}

export function useUpdateAttachment({ onSuccess }: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateAttachment,
		onSuccess: () => {
			notifySuccess({
				title: "Attachment was updated successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["attachments"],
			});
			onSuccess?.();
		},
		onError: () => {
			notifyError({
				title: "Couldn't update the attachment",
			});
		},
	});
}

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
	const t = useTranslations();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => deleteAttachment(id, method),
		onSuccess: () => {
			notifySuccess({
				title: "Attachment was deleted successfully",
			});
			queryClient.invalidateQueries({
				queryKey: ["attachments"],
			});
			onSuccess?.();
		},
		onError: (e) => {
			notifyError({
				title: "Couldn't delete the attachment",
				message: getErrorMessageSync(e, t),
			});
			onError?.();
		},
	});
}
