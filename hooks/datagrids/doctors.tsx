import type { Doctor } from "@/lib/types";
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

function useFetchDoctors(options: FetchOptions) {
	const params = getTableSearchParams(options);
	return useQuery({
		queryKey: ["doctors", params.toString()],
		queryFn: () =>
			http
				.get<{ count: number; results: Doctor[] }>("/accounts/doctor/", {
					params,
				})
				.then((res) => res.data),
	});
}

export default function useDoctorsTable() {
	const columns = useMemo<MRT_ColumnDef<Doctor>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: "Full name",
			},
			{
				accessorKey: "speciality",
				header: "Speciality",
			},
			{
				accessorKey: "phone.mobile",
				header: "Phone",
			},
		],
		[],
	);

	return useDatagrid(useFetchDoctors, {
		columns,
	});
}
