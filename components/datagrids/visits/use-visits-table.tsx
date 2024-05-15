import { getVisits } from "@/api/visits";
import useOurTable from "@/hooks/use-our-table";
import type { Visit } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";

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

	return useOurTable(
		{ id: "visits", fetchData: getVisits },
		{
			columns,
		},
	);
}
