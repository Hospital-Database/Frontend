"use client";

import DetailsCard from "@/components/details-card";
import { formatElapsedTime } from "@/lib/datetime";
import { useFormatter, useNow, useTranslations } from "next-intl";

export default function VisitDetails({ patientId: _ }: { patientId: string }) {
	const formatter = useFormatter();
	const startedAt = useNow();
	const now = useNow({ updateInterval: 1000 });
	const t = useTranslations("Patient");
	return (
		<DetailsCard
			title={t("current-visit")}
			details={[
				{ title: t("ticket"), value: 128746817234 },
				{ title: t("duration"), value: formatElapsedTime(startedAt, now) },
				{
					title: t("started-at"),
					value: formatter.dateTime(startedAt, {
						timeStyle: "short",
						dateStyle: "long",
					}),
				},
			]}
		/>
	);
}
