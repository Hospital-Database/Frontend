"use client";
import { VisitsTable } from "@/components/datagrids/visits/visits";
import { Box, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import DashboardHeader from "./_components/header";

const ONE_DAY = 1000 * 60 * 60 * 24; // in milliseconds

export default function Dashboard() {
	const t = useTranslations("Dashboard");
	return (
		<Box>
			<DashboardHeader />
			<Title component={"h2"} mt="xl" mb="md">
				{t("active-visits")}
			</Title>
			<VisitsTable
				initialFilters={[
					{ id: "status", value: "pending" },
					{
						id: "start_at__gt",
						value: new Date(Date.now() - ONE_DAY).toISOString(),
					},
					{
						id: "start_at__lt",
						value: new Date(Date.now() + ONE_DAY).toISOString(),
					},
				]}
			/>
			<Title component={"h2"} mt="xl" mb="md">
				{t("upcomming-visits")}
			</Title>
			<VisitsTable
				initialFilters={[
					{ id: "status", value: "pending" },
					{
						id: "start_at__gte",
						value: new Date(Date.now() + ONE_DAY).toISOString(),
					},
				]}
			/>
			<Title component={"h2"} mt="xl" mb="md">
				{t("missed-visits")}
			</Title>
			<VisitsTable
				initialFilters={[
					{ id: "status", value: "pending" },
					{
						id: "start_at__lte",
						value: new Date(Date.now() - ONE_DAY).toISOString(),
					},
				]}
			/>
		</Box>
	);
}
