import type { Patient } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import type { FetchOptions } from "./use-datagrid";
import useDatagrid from "./use-datagrid";
import { http } from "@/lib/axios";
import getTableSearchParams from "@/lib/get-search-params";

function useFetchPatients(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["patients", params.toString()],
		queryFn: () =>
			http
				.get<{ count: number; results: Patient[] }>("/accounts/patient/", {
					params,
				})
				.then((res) => res.data),
	});
}

export default function usePatientsTable() {
	const columns = useMemo<MRT_ColumnDef<Patient>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: "Full name",
			},
			{
				accessorKey: "date_of_birth",
				header: "Date of birth",
			},
			{
				accessorKey: "phone.mobile",
				header: "Phone",
			},
			{
				accessorKey: "gender",
				header: "Gender",
			},
			{
				accessorKey: "marital_status",
				header: "Martial status",
			},
		],
		[],
	);

	return useDatagrid(useFetchPatients, {
		columns,
	});
}
