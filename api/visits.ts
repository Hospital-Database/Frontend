import type { FetchOptions } from "@/hooks/use-our-table";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import type { Visit } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

// -------- CREATE

// -------- READ

export async function getVisits(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Visit[] }>("/visit/visit/", {
			params,
		})
		.then((res) => res.data);
}

export function useVisits(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["visits", params.toString()],
		queryFn: () => getVisits(options),
	});
}

// -------- UPDATE

// -------- DELETE
