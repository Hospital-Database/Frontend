import { getDeletedPatients, getPatients } from "@/api/patients";
import type { Patient } from "@/lib/types";
import { Routes } from "@/routes/routes";
import { Anchor } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import type { MRT_ColumnDef } from "mantine-react-table";
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useOurTable, {
	type UseTableOptions,
} from "../../../hooks/use-our-table";

export default function usePatientsTable({
	data,
	initialFilters,
	tableOptions,
	globalFilter,
	deleted,
}: UseTableOptions<Patient> = {}) {
	const t = useTranslations("Patient");
	const columns = useMemo<MRT_ColumnDef<Patient>[]>(
		() => [
			{
				accessorKey: "full_name",
				header: t("full-name"),
				Cell: ({ cell }) => {
					return (
						<Anchor
							href={Routes.patient({
								patientId: cell.row.original.id as string,
							})}
						>
							{cell.getValue() as string}
						</Anchor>
					);
				},
			},
			{
				accessorKey: "date_of_birth",
				header: t("date-of-birth"),
			},
			{
				accessorKey: "phone.mobile",
				header: t("phone"),
			},
			{
				accessorKey: "gender",
				header: t("gender"),
			},
			{
				accessorKey: "marital_status",
				header: t("martial-status"),
			},
		],
		[t],
	);

	return useOurTable(
		{
			id: "patients",
			deleted,
			initialFilters,
			globalFilter,
			fetchData: data
				? () => Promise.resolve({ count: data.length, results: data })
				: deleted
					? getDeletedPatients
					: getPatients,
		},
		{
			columns,
			...tableOptions,
		},
	);
}
