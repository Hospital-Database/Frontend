"use client";

import useDoctorsTable from "@/hooks/datagrids/doctors";
import { Anchor, Box, Breadcrumbs } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";

export default function DoctorsDatagrid() {
	const doctorsTable = useDoctorsTable();
	return (
		<Box>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<Anchor href={"/dashboard/doctors"}>Doctors</Anchor>
			</Breadcrumbs>
			<MantineReactTable table={doctorsTable} />
		</Box>
	);
}
