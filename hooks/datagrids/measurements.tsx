import type { Measurement } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useDatagrid, { type FetchOptions } from "./use-datagrid";

function useFetchMeasurements(_options: FetchOptions) {
	const searchKeys = new URLSearchParams();
	return useQuery({
		queryKey: ["measurements", searchKeys.toString()],
		queryFn: () => ({ count: 0, results: [] as Measurement[] }),
	});
}

export default function useMeasurementsTable() {
	const columns = useMemo<MRT_ColumnDef<Measurement>[]>(
		() => [
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

	return useDatagrid(useFetchMeasurements, {
		columns,
	});
}
