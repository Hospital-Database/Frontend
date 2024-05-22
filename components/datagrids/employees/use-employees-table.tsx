import { getDeletedEmployees, getEmployees } from "@/api/employees";
import type { Employee } from "@/lib/types";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useOurTable, {
	type UseTableOptions,
} from "../../../hooks/use-our-table";

export default function useEmployeesTable({
	data,
	initialFilters,
	tableOptions,
	deleted,
}: UseTableOptions<Employee> = {}) {
	const t = useTranslations("Employees");
	const columns = useMemo<MRT_ColumnDef<Employee>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: t("full-name"),
			},
			{
				accessorKey: "speciality",
				header: t("speciality"),
			},
			{
				accessorKey: "national_id",
				header: t("national-id"),
			},
			{
				accessorKey: "nationality",
				header: t("nationality"),
			},
			{
				accessorKey: "phone.mobile",
				header: t("phone"),
			},
		],
		[t],
	);

	return useOurTable(
		{
			id: "employees",
			deleted,
			data,
			fetchData: deleted ? getDeletedEmployees : getEmployees,
			initialFilters,
		},
		{
			columns,
			enableRowActions: true,
			...tableOptions,
		},
	);
}
