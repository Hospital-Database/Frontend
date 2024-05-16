import { getDoctors } from "@/api/doctors";
import type { Doctor } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import useOurTable, {
	type UseTableOptions,
} from "../../../hooks/use-our-table";

export default function useDoctorsTable({
	data,
	initialFilters,
	tableOptions,
}: UseTableOptions<Doctor> = {}) {
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
				accessorKey: "national_id",
				header: "National ID",
			},
			{
				accessorKey: "nationality",
				header: "Nationality",
			},
			{
				accessorKey: "phone.mobile",
				header: "Phone",
			},
		],
		[],
	);

	return useOurTable(
		{
			id: "doctors",
			fetchData: data
				? () => Promise.resolve({ count: data.length, results: data })
				: getDoctors,
			initialFilters,
			manual: !!data,
		},
		{
			columns,
			enableRowActions: true,
			...tableOptions,
		},
	);
}
