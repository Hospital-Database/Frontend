import type { Measurement } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useDatagrid, { type FetchOptions } from "./use-datagrid";
import getTableSearchParams from "@/lib/get-search-params";
import { http } from "@/lib/axios";

function useFetchMeasurements(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["measurements", params.toString()],
		queryFn: () =>
			http
				.get<{ count: number; results: Measurement[] }>(
					"/accounts/measurement/",
					{
						params,
					},
				)
				.then((res) => res.data),
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
