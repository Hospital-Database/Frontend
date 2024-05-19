"use client";
import { usePermissions } from "@/hooks/use-permissions";
import { Card, Skeleton, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useGetStatistics } from "../../../../api/statistics";

export default function DashboardHeader() {
	const { data } = useGetStatistics();
	const t = useTranslations("Dashboard");
	const perms = usePermissions();
	if (!perms.dashboard.canSeeStatistics()) return;
	return (
		<section className="md:flex gap-x-3">
			<HeaderCard
				text={t("total-patients")}
				statistics={data?.data?.total_patients}
			/>
			<HeaderCard
				text={t("total-doctors")}
				statistics={data?.data?.total_doctors}
			/>
			<HeaderCard
				text={t("total-visits")}
				statistics={data?.data?.total_visits}
			/>
			{/* <HeaderCard
				text={t("total-employees")}
				statistics={data?.data?.total_employees}
			/> */}
		</section>
	);
}
function HeaderCard({
	text,
	statistics,
}: { text: string; statistics?: number }) {
	return (
		<Card className="flex-1">
			<Text size="xl" fw="bold" c="blue.6">
				{text}
			</Text>
			{statistics ? (
				<Text className="text-3xl">{statistics}</Text>
			) : (
				<Skeleton w={50}>
					<Text className="text-3xl invisible">.</Text>
				</Skeleton>
			)}
		</Card>
	);
}
