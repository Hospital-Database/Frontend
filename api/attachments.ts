import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import type { Attachment } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

// -------- CREATE

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
