import useOurTable, { type UseTableOptions } from "@/hooks/use-our-table";
import type { Measurement } from "@/lib/types";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function useMeasurementsTable({
	data,
}: UseTableOptions<Measurement & { date: string }> = {}) {
	const columns = useMemo<MRT_ColumnDef<Measurement & { date: string }>[]>(
		() => [
			{
				accessorKey: "date",
				header: "Date",
			},
			{
				accessorKey: "blood_pressure",
				header: "Blood pressure",
			},
			{
				accessorKey: "oxygen_level",
				header: "Oxygen level",
			},
			{
				accessorKey: "pulse",
				header: "Pulse",
			},
			{
				accessorKey: "temperature",
				header: "Temprature",
			},
			{
				accessorKey: "weight",
				header: "Weight",
			},
			{
				accessorKey: "height",
				header: "Height",
			},
		],
		[],
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
