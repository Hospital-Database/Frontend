import { getVisits } from "@/api/visits";
import NA from "@/components/NA";
import useOurTable, { type UseTableOptions } from "@/hooks/use-our-table";
import type { Visit } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useVisitsTable({
	data,
	initialFilters,
}: UseTableOptions<Visit> = {}) {
	const t = useTranslations("Patient");
	const formatter = useFormatter();
	const columns = useMemo<MRT_ColumnDef<Visit>[]>(
		() => [
			{
				accessorKey: "visit_number",
				header: t("visit-number"),
			},
			{
				accessorKey: "ticket",
				header: t("ticket"),
			},
			{
				accessorKey: "start_at",
				header: t("start_at"),
				Cell: ({ cell }) => {
					const val = cell.getValue() as Visit["start_at"];
					if (!val) return <NA />;
					return formatter.dateTime(new Date(val), {
						dateStyle: "long",
						timeStyle: "short",
					});
				},
			},
			{
				accessorKey: "end_at",
				header: t("end_at"),
				Cell: ({ cell }) => {
					const val = cell.getValue() as Visit["end_at"];
					if (!val) return <NA />;
					return formatter.dateTime(new Date(val), {
						dateStyle: "long",
						timeStyle: "short",
					});
				},
			},
			{
				accessorKey: "notes",
				header: t("notes"),
			},
		],
		[t, formatter],
	);

	return useOurTable(
		{
			id: "visits",
			initialFilters,
			fetchData: data
				? () => Promise.resolve({ count: data.length, results: data })
				: getVisits,
		},
		{
			columns,
		},
	);
}
