import type { FetchOptions } from "@/hooks/datagrids/use-datagrid";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import type { Doctor } from "@/lib/types";

export async function getDoctors(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return await http
		.get<{ count: number; results: Doctor[] }>("/accounts/doctor/", {
			params,
		})
		.then((res) => res.data);
}
