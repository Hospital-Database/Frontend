import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import type { Visit } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import type { FetchOptions } from "./use-datagrid";
import useDatagrid from "./use-datagrid";

function useFetchVisits(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["visits", params.toString()],
		queryFn: () =>
			http
				.get<{ count: number; results: Visit[] }>("/visit/visit/", {
					params,
				})
				.then((res) => res.data),
	});
}
export default function useVisitsTable() {
	const columns = useMemo<MRT_ColumnDef<Visit>[]>(
		() => [
			{
				accessorKey: "visit_number",
				header: "Visit number",
			},
			{
				accessorKey: "ticket",
				header: "Ticket",
			},
		],
		[],
	);

	return useDatagrid(useFetchVisits, {
		columns,
	});
}
