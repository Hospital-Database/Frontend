"use client";

import useDoctorsTable from "@/hooks/datagrids/doctors";
import { Anchor, Box, Breadcrumbs, Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";

export default function DoctorsDatagrid() {
	const doctorsTable = useDoctorsTable();
	return (
		<Box>
			<Breadcrumbs mb="xl">
				<Anchor href={"/dashboard"}>Dashboard</Anchor>
				<span>Doctors</span>
			</Breadcrumbs>
			<Flex justify="end" mb="md">
				<Button
					leftSection={<IconPlus />}
					onClick={() => doctorsTable.setCreatingRow(true)}
				>
					Add doctor
				</Button>
			</Flex>
			<MantineReactTable table={doctorsTable} />
		</Box>
	);
}
