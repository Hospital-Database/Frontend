import { getVisits } from "@/api/visits";
import NA from "@/components/NA";
import useOurTable, { type UseTableOptions } from "@/hooks/use-our-table";
import type { Visit } from "@/lib/types";
import { Routes } from "@/routes/routes";
import { Anchor } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useVisitsTable({
	data,
	initialFilters,
	hidePatientName,
}: UseTableOptions<Visit> & { hidePatientName?: boolean } = {}) {
	const t = useTranslations("Patient");
	const formatter = useFormatter();
	const columns = useMemo<MRT_ColumnDef<Visit>[]>(() => {
		const columns: MRT_ColumnDef<Visit>[] = [
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
		];
		if (!hidePatientName) {
			columns.unshift({
				accessorKey: "patient_name",
				header: t("patient"),
				Cell: ({ cell }) => {
					const val = cell.getValue() as Visit["patient_name"];
					return (
						<Anchor
							href={Routes.patient({
								patientId: cell.row.original.patient as string,
							})}
						>
							{val}
						</Anchor>
					);
				},
			});
		}
		return columns;
	}, [t, formatter, hidePatientName]);

	return useOurTable(
		{
			id: "visits",
			initialFilters,
			data,
			fetchData: getVisits,
		},
		{
			columns,
		},
	);
}
