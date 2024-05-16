"use client";

import { Box } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import usePatientsTable from "./use-patients-table";

export default function PatientsDatagrid() {
	const patientsTable = usePatientsTable();
	return (
		<Box>
			<MantineReactTable table={patientsTable} />
		</Box>
	);
}
