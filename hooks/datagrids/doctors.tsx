import type { Doctor } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import { useQuery } from "@tanstack/react-query";
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import type { FetchOptions } from "./use-datagrid";
import useDatagrid from "./use-datagrid";

function useFetchDoctors(_options: FetchOptions) {
	const searchKeys = new URLSearchParams();
	return useQuery({
		queryKey: ["doctors", searchKeys.toString()],
		queryFn: () => ({ count: 0, results: [] as Doctor[] }),
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
