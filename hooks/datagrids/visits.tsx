import type { Visit } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import type { FetchOptions } from "./use-datagrid";
import useDatagrid from "./use-datagrid";

function useFetchVisits(_options: FetchOptions) {
	const searchKeys = new URLSearchParams();
	return useQuery({
		queryKey: ["visits", searchKeys.toString()],
		queryFn: () => ({ count: 0, results: [] as Visit[] }),
	});
}

export default function useVisitsTable() {
	const columns = useMemo<MRT_ColumnDef<Visit>[]>(
		() => [
			{
				accessorKey: "visit_number",
				header: "Visit number",
				size: 150,
			},
			{
				accessorKey: "ticket",
				header: "Ticket",
				size: 150,
			},
		],
		[],
	);

	return useDatagrid(useFetchVisits, {
		columns,
	});
}
