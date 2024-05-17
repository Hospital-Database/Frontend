import useOurTable, { type UseTableOptions } from "@/hooks/use-our-table";
import type { Measurement } from "@/lib/types";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useMeasurementsTable({
	data,
}: UseTableOptions<Measurement & { date: string }> = {}) {
	const t = useTranslations("Patient");
	const columns = useMemo<MRT_ColumnDef<Measurement & { date: string }>[]>(
		() => [
			{
				accessorKey: "date",
				header: t("date"),
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
		[t],
	);

	return useOurTable(
		{
			id: "measurements",
			fetchData: data
				? () => Promise.resolve({ count: data.length, results: data })
				: () =>
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
