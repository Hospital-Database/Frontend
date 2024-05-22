import useOurTable, { type UseTableOptions } from "@/hooks/use-our-table";
import type { Measurement } from "@/lib/types";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useMeasurementsTable({
	data,
}: UseTableOptions<Measurement & { date: string }> = {}) {
	const t = useTranslations("Patient");
	const formatter = useFormatter();
	const columns = useMemo<MRT_ColumnDef<Measurement & { date: string }>[]>(
		() => [
			{
				accessorKey: "date",
				header: t("date"),
				Cell: ({ cell }) => {
					const val = cell.getValue() as string;
					return formatter.dateTime(new Date(val));
				},
			},
			{
				accessorKey: "blood_pressure",
				header: t("blood-pressure"),
			},
			{
				accessorKey: "oxygen_level",
				header: t("oxygen-level"),
			},
			{
				accessorKey: "pulse",
				header: t("pulse"),
			},
			{
				accessorKey: "temperature",
				header: t("temprature"),
			},
			{
				accessorKey: "weight",
				header: t("weight"),
			},
			{
				accessorKey: "height",
				header: t("height"),
			},
		],
		[formatter, t],
	);

	return useOurTable(
		{
			id: "visits",
			data,
			fetchData: () =>
				Promise.resolve({
					count: 0,
					results: [],
				}),
		},
		{
			columns,
		},
	);
}
