"use client";
import { Card, Text } from "@mantine/core";
import { useGetStatistics } from "../../../../api/statistics";

export default function DashboardHeader() {
	const { data } = useGetStatistics();
	return (
		<section className="grid grid-cols-3 gap-x-3">
			<HeaderCard
				text="Total patients"
				statistics={data?.data?.total_patients}
			/>
			<HeaderCard text="Total Doctors" statistics={data?.data?.total_doctors} />
			<HeaderCard
				text="Total Employees"
				statistics={data?.data?.total_employees}
			/>
		</section>
	);
}
function HeaderCard({
	text,
	statistics,
}: { text: string; statistics: number }) {
	return (
		<Card>
			<Text size="xl" fw="bold" c="blue.6">
				{text}
			</Text>
			<Text className="text-3xl">{statistics}</Text>
		</Card>
	);
}
