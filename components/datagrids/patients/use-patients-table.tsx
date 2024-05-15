import { getPatients } from "@/api/patients";
import type { Patient } from "@/lib/types";
import { Routes } from "@/routes/routes";
import { Anchor } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useMemo } from "react";
import useOurTable from "../../../hooks/use-our-table";

export default function usePatientsTable() {
	const columns = useMemo<MRT_ColumnDef<Patient>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: "Full name",
				Cell: ({ cell }) => {
					return (
						<Anchor
							href={Routes.patient({ id: cell.row.original.id as number })}
						>
							{cell.getValue() as string}
						</Anchor>
					);
				},
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

	return useOurTable(
		{ id: "patients", fetchData: getPatients },
		{
			columns,
		},
	);
}
