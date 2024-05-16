import { getDoctors } from "@/api/doctors";
import type { Doctor } from "@/lib/types";
import { Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import useDatagrid from "../../../hooks/use-datagrid";

export default function useDoctorsTable({
	onEdit,
}: {
	onEdit?: (row: MRT_Row<Doctor>) => void;
} = {}) {
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

	return useDatagrid(getDoctors, {
		columns,
		enableRowActions: true,
		renderRowActionMenuItems: ({ row }) => (
			<>
				<Menu.Item onClick={() => onEdit?.(row)}>Edit</Menu.Item>
				<Menu.Item onClick={() => console.info("Deactivate")}>
					Deactivate
				</Menu.Item>
				<Menu.Item onClick={() => console.info("Delete")}>Delete</Menu.Item>
			</>
		),
	});
}
