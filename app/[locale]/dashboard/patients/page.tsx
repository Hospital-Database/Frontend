"use client";

import usePatientsTable from "@/hooks/datagrids/patients";
import { Anchor, Box, Breadcrumbs } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";

export default function PatientsDatagrid() {
	const patientsTable = usePatientsTable();
	return (
		<Box>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<span>Patients</span>
			</Breadcrumbs>
			<MantineReactTable table={patientsTable} />
		</Box>
	);
}
