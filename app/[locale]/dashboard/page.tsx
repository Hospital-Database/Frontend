"use client";

import useVisitsTable from "@/components/datagrids/visits/use-visits-table";
import { Box, Title } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useTranslations } from "next-intl";
import DashboardHeader from "./_components/header";

export default function Dashboard() {
	const visitsTable = useVisitsTable();
	const t = useTranslations("Dashboard");
	return (
		<Box>
			<DashboardHeader />
			<Title component={"h2"} mt="xl" mb="md">
				{t("active-visits")}
			</Title>
			<MantineReactTable table={visitsTable} />
			<Title component={"h2"} mt="xl" mb="md">
				{t("upcomming-visits")}
			</Title>
			<MantineReactTable table={visitsTable} />
			<Title component={"h2"} mt="xl" mb="md">
				{t("missed-visits")}
			</Title>
			<MantineReactTable table={visitsTable} />
		</Box>
	);
}
