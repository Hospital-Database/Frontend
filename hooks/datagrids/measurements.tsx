import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";
import type { Measurement } from "@/lib/types";
import type { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useDatagrid, { type FetchOptions } from "../use-datagrid";

function getMeasurements(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return http
		.get<{ count: number; results: Measurement[] }>("/accounts/measurement/", {
			params,
		})
		.then((res) => res.data);
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

	return useDatagrid(getMeasurements, {
		columns,
	});
}
