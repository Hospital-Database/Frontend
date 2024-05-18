"use client";
import { Card, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useGetStatistics } from "../../../../api/statistics";

export default function DashboardHeader() {
	const { data } = useGetStatistics();
	const t = useTranslations("Dashboard");
	return (
		<section className="grid grid-cols-3 gap-x-3">
			<HeaderCard
				text={t("total-patients")}
				statistics={data?.data?.total_patients}
			/>
			<HeaderCard
				text={t("total-doctors")}
				statistics={data?.data?.total_doctors}
			/>
			<HeaderCard
				text={t("total-employees")}
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
