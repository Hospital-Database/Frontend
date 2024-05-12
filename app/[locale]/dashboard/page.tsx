"use client";

import { Box, Title } from "@mantine/core";
import DashboardHeader from "./_components/header";
import { MantineReactTable } from "mantine-react-table";
import useVisitsTable from "@/hooks/datagrids/visits";

export default function Dashboard() {
	const visitsTable = useVisitsTable();
	return (
		<Box>
			<DashboardHeader />
			<Title component={"h2"} mt="xl" mb="md">
				Active visits
			</Title>
			<MantineReactTable table={visitsTable} />
			<Title component={"h2"} mt="xl" mb="md">
				Upcomming visits
			</Title>
			<MantineReactTable table={visitsTable} />
			<Title component={"h2"} mt="xl" mb="md">
				Missed visits
			</Title>
			<MantineReactTable table={visitsTable} />
		</Box>
	);
}
